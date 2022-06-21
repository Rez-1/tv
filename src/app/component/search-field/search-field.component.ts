import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, Subscription } from 'rxjs';
import { TvmazeService } from 'src/app/service/tvmaze.service';
import { TvmazeShow } from 'src/app/type/show';

const ARBITRARY_DEBOUNCE_MS = 500; // debounce user input

@Component({
	selector: 'app-search-field',
	templateUrl: './search-field.component.html',
	styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements AfterViewInit {
	queryControl = new FormControl('', [Validators.required]);
	inlineResult: TvmazeShow | null = null;
	private singleSearch: Subscription | undefined;
	form: FormGroup<any>;

	constructor(
		private tvmazeService: TvmazeService,
		private router: Router
	) {
		this.form = new FormGroup({ query: this.queryControl });
	}

	ngAfterViewInit(): void {
		this.queryControl.valueChanges.pipe(debounceTime(ARBITRARY_DEBOUNCE_MS)).subscribe({
			next: this.onInputChange.bind(this)
		});
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
			next: (event) => {
				this.cancelOpenSubscription();
				this.inlineResult = null;
			}
		});
	}

	onInputChange() {
		const value = this.queryControl.value || '';
		if (value) {
			this.cancelOpenSubscription()
			this.singleSearch = this.tvmazeService.singleSearch(value).subscribe({
				next: (result) => {
					this.inlineResult = result;
				},
				error: () => { this.inlineResult = null }
			})
		} else {
			this.inlineResult = null;
			this.cancelOpenSubscription();
		}
	}

	onSearch() {
		if (this.form.valid) {
			const value = this.queryControl.value || '';
			this.cancelOpenSubscription();
			this.queryControl.setValue('');
			this.router.navigate(['search', value]);
		}
	}

	cancelOpenSubscription() {
		if (this.singleSearch) {
			this.singleSearch.unsubscribe();
		}
	}
}
