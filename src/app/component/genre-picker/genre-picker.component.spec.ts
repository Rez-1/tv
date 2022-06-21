import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GenrePickerComponent } from './genre-picker.component';
jest.mock('src/assets/genre-index.json', () => ({ Drama: [1, 2, 3] }), { virtual: true });

describe('GenrePickerComponent', () => {
	let component: GenrePickerComponent;
	let fixture: ComponentFixture<GenrePickerComponent>;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GenrePickerComponent],
			imports: [RouterTestingModule, ReactiveFormsModule]
		}).compileComponents();

		fixture = TestBed.createComponent(GenrePickerComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		fixture.detectChanges();
	});

	it('should create navigate', () => {
		jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
		component.selectControl.setValue('test');
		expect(router.navigate).toHaveBeenCalledWith(['browse', 'test']);
	});
});
