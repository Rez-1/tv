import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { TvmazeCast } from 'src/app/type/cast';
import { TvmazeShowSearch } from 'src/app/type/search';
import { TvmazeSeason } from 'src/app/type/season';
import { TvmazeShow } from 'src/app/type/show';
import genreData from 'src/assets/genre-index.json';

const NUMBER_OF_SHOWS_TO_DISPLAY = 10;

@Injectable({
	providedIn: 'root'
})
export class TvmazeService {
	private baseURL = 'https://api.tvmaze.com';
	constructor(private http: HttpClient) { }

	private get<T>(uri: string) {
		return this.http.get<T>(`${this.baseURL}/${uri}`);
	}

	getShow(id: string) {
		return this.get<TvmazeShow>(`shows/${encodeURIComponent(id)}`)
	}

	getSeasons(id: string) {
		return this.get<TvmazeSeason[]>(`shows/${encodeURIComponent(id)}/seasons`)
	}

	getCast(id: string) {
		return this.get<TvmazeCast[]>(`shows/${encodeURIComponent(id)}/cast`)
	}

	search(query: string) {
		return this.get<TvmazeShowSearch[]>(`search/shows?q=${encodeURIComponent(query)}`)
	}

	singleSearch(query: string): Observable<TvmazeShow> {
		return this.get<TvmazeShow>(`singlesearch/shows?q=${encodeURIComponent(query)}`)
	}


	getGenre(name: string) {
		// get most popular shows only
		const genre = genreData[name as keyof typeof genreData];
		const ids = genre.slice(0, NUMBER_OF_SHOWS_TO_DISPLAY);
		const collection = ids.map(id => this.getShow(id.toString()));
		return combineLatest(collection);
	}
}
