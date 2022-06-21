import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvmazeService } from 'src/app/service/tvmaze.service';
import { TvmazeShowSearch } from 'src/app/type/search';
import { TvmazeShow } from 'src/app/type/show';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	query: string = '';
	noResult = false;
	results: TvmazeShow[] = [];

	constructor(
		private route: ActivatedRoute,
		private tvmazeService: TvmazeService
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.query = params.get('query') || '';
			this.get();
		});
	}

	get() {
		this.noResult = false;
		this.tvmazeService.search(this.query).subscribe({
			next: (result) => {
				this.results = result.map(result => result.show);
			},
			error: () => {
				this.results = [];
				this.noResult = true;
			}
		});
	}
}
