import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { TvmazeService } from 'src/app/service/tvmaze.service';
import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
	let component: SearchFieldComponent;
	let fixture: ComponentFixture<SearchFieldComponent>;
	let router: Router;
	let service: TvmazeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchFieldComponent],
			imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
		}).compileComponents();

		router = TestBed.inject(Router);
		service = TestBed.inject(TvmazeService);
		fixture = TestBed.createComponent(SearchFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});


	it('should cleanup', () => {
		jest.spyOn(component, 'cancelOpenSubscription');
		component.queryControl.setValue('');
		component.onInputChange();
		expect(component.cancelOpenSubscription).toHaveBeenCalled();
	});
	
	it('should do singlesearch', () => {
		jest.spyOn(service, 'singleSearch').mockReturnValue(of({} as any));
		component.queryControl.setValue('query');
		component.onInputChange();
		expect(service.singleSearch).toHaveBeenCalledWith('query');
	});

	it('should do singlesearch', () => {
		jest.spyOn(service, 'singleSearch').mockReturnValue(throwError('OOPS'));
		component.queryControl.setValue('query');
		component.onInputChange();
		expect(service.singleSearch).toHaveBeenCalledWith('query');
		expect(component.inlineResult).toBe(null);
	});

	it('should navigate to search', () => {
		jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
		component.queryControl.setValue('test');
		component.onSearch();
		expect(router.navigate).toHaveBeenCalledWith(['search', 'test']);
	});

	it('should cleanup', () => {
		// @ts-ignore
		component.singleSearch = { unsubscribe: jest.fn() };
		component.cancelOpenSubscription();
		// @ts-ignore
		expect(component.singleSearch?.unsubscribe).toHaveBeenCalled();
	});
});
