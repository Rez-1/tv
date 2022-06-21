import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TvmazeShow } from 'src/app/type/show';

@Component({
	selector: 'app-scroll-list',
	templateUrl: './scroll-list.component.html',
	styleUrls: ['./scroll-list.component.scss']
})
export class ScrollListComponent implements OnChanges {
	@Input() title = '';
	@Input() shows: TvmazeShow[] = [];
	@ViewChild('list') list: ElementRef | undefined;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['shows']) {
			this.list?.nativeElement.scroll({ top: 0, left: 0 });
		}
	}

	back() {
		const el = this.list?.nativeElement;
		const width = el.offsetWidth;
		const newPos = el.scrollLeft - width;
		el.scroll({
			top: 0,
			left: newPos < 0 ? 0 : newPos,
			behavior: 'smooth'
		});
	}

	forward() {
		const el = this.list?.nativeElement;
		const width = el.offsetWidth;
		const newPos = el.scrollLeft + width;
		el.scroll({
			top: 0,
			left: newPos > el.scrollWidth ? el.scrollWidth : newPos,
			behavior: 'smooth'
		});
	}
}
