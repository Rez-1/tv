import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollListComponent } from './scroll-list.component';

describe('ScrollListComponent', () => {
	let component: ScrollListComponent;
	let fixture: ComponentFixture<ScrollListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ScrollListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(ScrollListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should reset scroll', () => {
		component.list = { nativeElement: { offsetWidth: 5, scrollLeft: 10, scroll: jest.fn() } }
		component.shows = [{} as any];
		component.ngOnChanges({shows: new SimpleChange([], [{}as any], false)});
		expect(component.list?.nativeElement.scroll).toHaveBeenCalledWith({
			top: 0,
			left: 0,
		});
	});

	it('should decrease scrollposition', () => {
		component.list = { nativeElement: { offsetWidth: 5, scrollLeft: 10, scroll: jest.fn() } }
		component.back();
		expect(component.list?.nativeElement.scroll).toHaveBeenCalledWith({
			top: 0,
			left: 5,
			behavior: 'smooth'
		});
	});

	it('should not decrease below 0', () => {
		component.list = { nativeElement: { offsetWidth: 5, scrollLeft: 1, scrollWidth: 15, scroll: jest.fn() } }
		component.back();
		expect(component.list?.nativeElement.scroll).toHaveBeenCalledWith({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	});

	it('should increment scrollposition', () => {
		component.list = { nativeElement: { offsetWidth: 10, scrollLeft: 10, scroll: jest.fn() } }
		component.forward();
		expect(component.list?.nativeElement.scroll).toHaveBeenCalledWith({
			top: 0,
			left: 20,
			behavior: 'smooth'
		});
	});

	it('should not increment passed width', () => {
		component.list = { nativeElement: { offsetWidth: 10, scrollLeft: 10, scrollWidth: 15, scroll: jest.fn() } }
		component.forward();
		expect(component.list?.nativeElement.scroll).toHaveBeenCalledWith({
			top: 0,
			left: 15,
			behavior: 'smooth'
		});
	});
});
