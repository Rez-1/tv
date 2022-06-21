import { TvmazeCountry, TvmazeImage, TvmazeLinks } from "./show"

export interface TvmazeCast {
	person: TvmazePerson
	character: TvmazeCharacter
	self: boolean
	voice: boolean
}
export interface TvmazePerson {
	_links: TvmazeLinks
	birtday: string
	country: TvmazeCountry
	deathday: string | null
	gender: string
	id: number
	image: TvmazeImage
	name: string
	updated: number
	url: string
}

export interface TvmazeCharacter {
	_links: TvmazeLinks
	id: number
	image: TvmazeImage
	name: string
	url: string
  }