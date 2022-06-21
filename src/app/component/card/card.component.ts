import { Component, Input, OnInit } from '@angular/core';
import { TvmazeShow } from 'src/app/type/show';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
	@Input() show: TvmazeShow = {} as any;

	constructor() { }

	ngOnInit(): void {
	}

}
