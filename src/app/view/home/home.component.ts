import { Component, OnInit } from '@angular/core';
import { TvmazeService } from 'src/app/service/tvmaze.service';
import genreData from 'src/assets/genre-index.json';

const NUMBER_OF_GENRES = 3;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	keys: string[];
	resultSet: any[] = [];
	randomGenres: string[] = [];

	constructor(private tvmazeService: TvmazeService) {
		this.keys = Object.keys(genreData);
	}

	ngOnInit(): void {
		this.randomGenres = this.getRandomGenres(NUMBER_OF_GENRES);
		this.randomGenres.forEach((genre, index) => {
			this.tvmazeService.getGenre(genre).subscribe({
				next: (result) => {
					this.resultSet[index] = result;
				}
			});
		});
	}

	getRandomGenres(count: number) {
		const shuffled = [...this.keys].sort(() => .5 - Math.random());
		return shuffled.slice(0, count);
	}
}
