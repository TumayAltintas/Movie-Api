const API_KEY = 'api_key=0fd2eb610862a35172254f63379f6e14';
const TOP_TV_SERIES_URL = 'https://api.themoviedb.org/3/tv/top_rated?';
const API_URL_TV = TOP_TV_SERIES_URL + API_KEY + '&language=en-US&page=1';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const TOP_MOVIE_URL = 'https://api.themoviedb.org/3/movie/top_rated?'
const API_FOR_MOVIES = TOP_MOVIE_URL + API_KEY + '&language=en-US&page=1';
const main = document.getElementById('main');
const second = document.getElementById('second');



let a = 0
let b = 5



GetTopMovies(API_FOR_MOVIES);

function GetTopMovies(url) {

	fetch(url).then(res => res.json()).then(data => {
		console.log(data.results)
		return ShowTopMoves(data.results.slice(a,b));

	})

}



function ShowTopMoves(data) {
	main.innerHTML = '';
	data.forEach(movie => {
		const {title, poster_path, vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.classList.add('MovieImage');
		movieEl.innerHTML = `
						<div class="Vote">
						<h3 style="color:darkblue;">${vote_average}/10</h3>	
						</div>
				<img class="MoviesImg"src="${IMG_URL + poster_path}">
	            	<div class="movie-info">
	                	<h4 style="color: darkblue">${title}</h4>	             	                                       
						</div>`

		main.appendChild(movieEl);
	})
}

//
GetTopTvSeries(API_URL_TV);
function GetTopTvSeries(url) {
	fetch(url).then(res => res.json()).then(data => {
		console.log(data.results)
		return ShowTopTvSeries(data.results.slice(0,4));
	})
}
function ShowTopTvSeries(data) {
	second.innerHTML = '';
	data.forEach(movie => {
		const {name, poster_path, vote_average, overview} = movie
		const movieEl = document.createElement('div');
		movieEl.classList.add('MovieImage');
		movieEl.innerHTML = `
					<h3 style="color:darkblue">${vote_average}</h3>	
				<img class="TvImg"src="${IMG_URL + poster_path}">
	            	<div class="Tv-info">
	                	<h3>${name}</h3>	             	                                          
						</div>`

		second.appendChild(movieEl);
	})
}




