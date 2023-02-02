import * as ArtistsChart from "./components/ArtistsChart-finished"
import * as SearchForm from "./components/SearchForm-finished"
import * as Artist from "./components/Artist-finished"

const artistRoot = document.querySelector("[data-component='artist']")

if (artistRoot === null) {
	throw new Error("Couldn't find artist root element")
}

const artist = Artist.init(artistRoot)

const searchFormRoot = document.querySelector("[data-component='search-form']")

if (searchFormRoot === null) {
	throw new Error("Couldn't find search form root element")
}

const searchForm = SearchForm.init(searchFormRoot, {
	onSelect: (selectedArtist) => {
		artist.show(selectedArtist.name)
	}
})

const artistsChartRoot = document.querySelector("[data-component='artists-chart']")

if (artistsChartRoot === null) {
	throw new Error("Couldn't find artists chart root element")
}

ArtistsChart.init(artistsChartRoot, {
	onSelect: (selectedArtist) => {
		artist.show(selectedArtist)
		searchForm.setQuery(selectedArtist)
	}
})
