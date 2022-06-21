import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import genreData from 'src/assets/genre-index.json';

@Component({
	selector: 'app-genre-picker',
	templateUrl: './genre-picker.component.html',
	styleUrls: ['./genre-picker.component.scss']
})
export class GenrePickerComponent {
	genres: string[];
	selectControl = new FormControl('');
	
	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {
		this.genres = Object.keys(genreData).sort();
		this.selectControl.valueChanges.subscribe({
			next: (value) => {
				this.router.navigate(['browse', value]);
			}
		});
	}
}
