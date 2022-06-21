import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TvmazeService } from './tvmaze.service';
jest.mock('src/assets/genre-index.json', () => ({ Drama: [1,2,3] }), { virtual: true });

describe('TvmazeService', () => {
	let service: TvmazeService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		httpMock = TestBed.inject(HttpTestingController);
		service = TestBed.inject(TvmazeService);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should call endpoint', (done) => {
		service.singleSearch('testquery').subscribe({
			next: () => done()
		});
		const req = httpMock.expectOne('https://api.tvmaze.com/singlesearch/shows?q=testquery');
		req.flush({});
	});
});
