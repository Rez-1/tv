import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CardComponent } from 'src/app/component/card/card.component';
import { GenrePickerComponent } from 'src/app/component/genre-picker/genre-picker.component';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { SearchFieldComponent } from 'src/app/component/search-field/search-field.component';
import { SearchComponent } from 'src/app/view/search/search.component';
import { ShowComponent } from 'src/app/view/show/show.component';
import { ScrollListComponent } from './component/scroll-list/scroll-list.component';
import { GenreComponent } from './view/genre/genre.component';
import { HomeComponent } from './view/home/home.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		GenrePickerComponent,
		SearchFieldComponent,
		CardComponent,
		ShowComponent,
		SearchComponent,
		ScrollListComponent,
		GenreComponent,
  HomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
