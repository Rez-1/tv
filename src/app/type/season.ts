import { TvmazeImage, TvmazeLinks, TvmazeWebChannel } from "./show"

export interface TvmazeSeason {
	_links: TvmazeLinks
	endDate: string
	episodeOrder: number
	id: number
	image: TvmazeImage
	name: string
	network: TvmazeWebChannel | null
	number: number
	premiereDate: string
	summary: string
	url: string
	webChannel: TvmazeWebChannel | null
}
