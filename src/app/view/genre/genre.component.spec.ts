import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TvmazeService } from 'src/app/service/tvmaze.service';

import { GenreComponent } from './genre.component';

describe('GenreComponent', () => {
	let component: GenreComponent;
	let fixture: ComponentFixture<GenreComponent>;
	let service: TvmazeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GenreComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

		service = TestBed.inject(TvmazeService);
		fixture = TestBed.createComponent(GenreComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
