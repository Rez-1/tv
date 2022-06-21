import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { TvmazeService } from 'src/app/service/tvmaze.service';
import { TvmazeShow } from 'src/app/type/show';
import genreData from 'src/assets/genre-index.json';

const NUMBER_OF_SHOWS_TO_DISPLAY = 10;

@Component({
	selector: 'app-genre',
	templateUrl: './genre.component.html',
	styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
	genre: string = '';
	notFound: boolean = false;
	private keys: string[];
	shows: TvmazeShow[] = [];

	constructor(
		private route: ActivatedRoute,
		private tvmazeService: TvmazeService
	) {
		this.keys = Object.keys(genreData)
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.genre = params.get('genre') || '';
			if (this.genre && this.keys.includes(this.genre)) {
				this.tvmazeService.getGenre(this.genre).subscribe({
					next: (result) => {
						this.shows = result;
					},
					error: () => {
						this.notFound = true;
					}
				});
			}
			else {
				this.notFound = true;
			}
		});
	}
}
