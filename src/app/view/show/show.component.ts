import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, concatAll, mergeAll } from 'rxjs';
import { TvmazeService } from 'src/app/service/tvmaze.service';
import { TvmazeCast } from 'src/app/type/cast';
import { TvmazeSeason } from 'src/app/type/season';
import { TvmazeShow } from 'src/app/type/show';

@Component({
	selector: 'app-show',
	templateUrl: './show.component.html',
	styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
	id: string = '';
	notFound = false;
	show: { general?: TvmazeShow; seasons?: TvmazeSeason[]; cast?: TvmazeCast[]; } = {};

	constructor(
		private route: ActivatedRoute,
		private tvmazeService: TvmazeService
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id') || '';
			this.get();
		});
	}

	get() {
		this.notFound = false;
		combineLatest({
			general: this.tvmazeService.getShow(this.id),
			seasons: this.tvmazeService.getSeasons(this.id),
			cast: this.tvmazeService.getCast(this.id)
		}).subscribe({
			next: (result) => {
				this.show = result;
			},
			error: () => {
				this.show = {};
				this.notFound = true;
			}
		});
	}
}
