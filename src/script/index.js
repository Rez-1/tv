const https = require('https');
const fs = require('fs');
const path = require('path');
const { run } = require('jest');

/**
 * Script to retrieve and store show index.
 * 
 * Purpose: tvmaze API doesn't provide search or filter by genre, it does however provide index of shows including genre. 
 * This script updates the index and stores it in cache to allow filtering by genre locally.
 * See https://www.tvmaze.com/api#show-index for details
 */
const SCRIPT_DIRNAME = path.dirname(__filename);
const cacheFileShow = path.resolve(SCRIPT_DIRNAME, '../assets/show-index.json');
const cacheFileGenre = path.resolve(SCRIPT_DIRNAME, '../assets/genre-index.json');
const remoteUrl = 'https://api.tvmaze.com/shows?page=';

const readCache = (filePath) => {
	if (!fs.existsSync(filePath)) {
		console.error(`❌  Config file does not exists ${filePath}`);
		process.exit(1);
	}

	try {
		const content = fs.readFileSync(filePath);
		console.info(`💾  Read config from ${filePath}`);
		return JSON.parse(content);
	} catch (ex) {
		console.log(ex)
		console.error(`❌  Invalid json in ${filePath}`);
		process.exit(1);
	}
};

const cachePage = (page) => {
	return new Promise((resolve, reject) => {
		https.get(`${remoteUrl}${page}`, (resp) => {
			let data = '';

			// A chunk of data has been received.
			resp.on('data', (chunk) => {
				data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				console.info(`✔️  Page number ${page} retrieved`);
				const json = JSON.parse(data);
				if (json.length) {
					resolve(json);
				} else {
					reject('done');
				}
			});

		}).on('error', (err) => {
			reject(err);
		});
	})
}

// Get latest page based on latest id in cache, store to index file
// This method is recursive as long as end is not reached
const updateIndex = () => {
	let page = 0;
	const itemsPerPage = 250;
	const index = readCache(cacheFileShow);
	if (index.length) {
		const lastIndex = index[index.length - 1].id;
		page = Math.floor(lastIndex/itemsPerPage) + 1;
		indexGenres(index);
	}

	cachePage(page)
		.then((data) => {
			fs.writeFileSync(cacheFileShow, JSON.stringify([...index, ...data]));
			console.info(`💾  Concatenated new data to cache`);
			updateIndex();
		})
		.catch((result) => {
			if (result === 'done') {
				console.log('✔️  Reached the end, done for now!');
				process.exit(0);
			} else {
				console.error(`❌  ${result.message}`);
				process.exit(1);
			}
		});
}

// Sort shows by weight (popularity) and index all the shows by genre
// Genres are stored with array of shows
const indexGenres = (data) => {
	const map = {};

	data.sort((a, b) => {
		return a.weight > b.weight ? -1 : 1;
	});

	data.forEach(show => {
		show.genres.forEach((genre) => {
			if (map[genre]) {
				map[genre].push(show.id);
			} else {
				map[genre] = [show.id];
			}
		});
	});

	fs.writeFileSync(cacheFileGenre, JSON.stringify(map));
	console.info(`💾  Re-sorted and indexed genres stored`);
}

updateIndex();