import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from 'src/app/view/genre/genre.component';
import { HomeComponent } from 'src/app/view/home/home.component';
import { SearchComponent } from 'src/app/view/search/search.component';
import { ShowComponent } from 'src/app/view/show/show.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'show/:id', component: ShowComponent },
	{ path: 'search/:query', component: SearchComponent },
	{ path: 'browse/:genre', component: GenreComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
