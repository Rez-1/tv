export interface TvmazeShow {
	_embedded: any
	_links: TvmazeLinks
	externals: TvmazeExternals
	genres: string[]
	id: number
	image: TvmazeImage
	language: string
	name: string
	network: TvmazeWebChannel | null
	officialSite: string
	premiered: string
	rating: TvmazeRating
	runtime: number
	schedule: TvmazeSchedule
	status: string
	summary: string
	type: string
	updated: number
	url: string
	webChannel: TvmazeWebChannel | null
	weight: number
}

export interface TvmazeSchedule {
	days: string[]
	time: string
}

export interface TvmazeRating {
	average: number
}

export interface TvmazeCountry {
	code: string
	name: string
	timezone: string
}

export interface TvmazeExternals {
	imdb: string
	thetvdb: number
	tvrage: number
}

export interface TvmazeImage {
	medium: string
	original: string
}

export interface TvmazeLinks {
	self?: Link
	previousepisode?: Link
	show?: Link
	character?: Link
}

export interface Link {
	href: string
}

export interface TvmazeWebChannel {
	country: TvmazeCountry
	id: number
	name: string
	officialSite: string
}