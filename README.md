# Tv shows

## Architecture
The application is built in Angular, mainly because of development speed and ease (it's the framework I've been working most with the past year).

The application is simply divided in two parts: shared components (found in `src/app/component`) and views (found in `src/app/view`). All the external calls are located in the `tvmaze` service (singleton).

### Challenge
The assessment ask for an overview of shows per genre, yet the basic API doesn't provide such data. The API does however provide an index of all shows including genre which can be used to build a cache. 

This endpoint is used to store the cache locally and from that a map is created with all the available genres and the shows sorted by popularity. This script can be found in `src/script`, when executed via `npm run update-index` it will fetch new shows if necessary and add them to the index, it will also update the genres and the shows. The stored data can be found in `src/assets` as JSON files. 

The solution is a bit primitive but it should suffice for this use case required in this assesment.

### Features
- Search for a tv show by name 
	- search field in header
- Show a quick result when user inputs search query 
	- search field in header
- View show details and seasons/cast 
	- click show card anywhere in the app to see details
	- _Note: for cast or season details user is redirected to TVMaze website_
- Scroll through most popular shows per genre 
	- choose genre from dropdown in header
	- click on genre in show detail page
	- _Note: horizontal scroller uses browser scrolling, this will automatically support mobile devices without the need for custom implementation_
- Home page shows most popular shows from 3 genres at random

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via Jest.