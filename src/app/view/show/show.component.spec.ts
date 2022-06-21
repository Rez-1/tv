import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowComponent } from './show.component';

describe('ShowComponent', () => {
	let component: ShowComponent;
	let fixture: ComponentFixture<ShowComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShowComponent],
			imports: [HttpClientTestingModule, RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ShowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
