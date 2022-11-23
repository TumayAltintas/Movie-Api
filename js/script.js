const API_KEY = 'api_key=0fd2eb610862a35172254f63379f6e14';
const TOP_TV_SERIES_URL = 'https://api.themoviedb.org/3/tv/top_rated?';
const API_FOR_TV = TOP_TV_SERIES_URL + API_KEY + '&language=en-US&page=1';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const TOP_MOVIE_URL = 'https://api.themoviedb.org/3/movie/top_rated?'
const API_FOR_MOVIES = TOP_MOVIE_URL + API_KEY + '&language=en-US&page=1';
const main = document.getElementById('main');
const second = document.getElementById('second');
const HeaderTv = document.getElementById('HeaderTv');
const HeaderMovie = document.getElementById('HeaderMovie');


let a = 0
let b = 5
//////////////////////////////////////////////////////////////////////////////////////////// Top Header Start
GetTopTvHeaderSeries(API_FOR_TV);
function GetTopTvHeaderSeries(url) {
	let RandomNumber = Math.floor(Math.random() * 10);
	console.log(RandomNumber)
	fetch(url).then(res => res.json()).then(data => {
		return ShowTopTvHeaderSeries(data.results.slice(1,2));
	})
}

function ShowTopTvHeaderSeries(data) {
	HeaderTv.innerHTML = '';
	data.forEach(movie => {
		const {poster_path,vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.classList.add('MovieImage');
		movieEl.innerHTML = `
				<div class="HeaderShowMovie">
				<h3 style="color:white">${vote_average}/10</h3>	
				</div>	
				<img class="TvImg" src="${IMG_URL + poster_path}">`
		HeaderTv.appendChild(movieEl);
	})
}
//////////////////////////////////////////////////////////////////////////////////////////// Top Header Movie
GetTopMovieHeader(API_FOR_MOVIES);

function GetTopMovieHeader(url) {
	fetch(url).then(res => res.json()).then(data => {
		return ShowTopMovieHeader(data.results.slice(14,15));
	})
}

function ShowTopMovieHeader(data) {
	HeaderMovie.innerHTML = '';
	data.forEach(movie => {
		const {poster_path,vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.classList.add('MovieImage');
		movieEl.innerHTML = `
				<div class="HeaderShowMovie">
				<h3 style="color:white">${vote_average}/10</h3>	
				</div>				
				<img class="TvImg" src="${IMG_URL + poster_path}">`
		HeaderMovie.appendChild(movieEl);
	})
}
//////////////////////////////////////////////////////////////////////////////////////////// Top Header End

//Top Movies Start
GetTopMovies(API_FOR_MOVIES);

function GetTopMovies(url) {

	fetch(url).then(res => res.json()).then(data => {
		return ShowTopMoves(data.results.slice(a, b));
	})
}

function ShowTopMoves(data) {
	main.innerHTML = '';
	data.forEach(movie => {
		const {title, poster_path, vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.innerHTML = `
						<div>
						<h3 class="Movie" style="color: #FFFFFF; padding: 10px; margin: 0;" >${vote_average}/10</h3>	
						</div>
				<img class="MoviesImg"src="${IMG_URL + poster_path}">	           
	                	<h4 style="color: darkblue">${title}</h4>`
		main.appendChild(movieEl);
	})
}

//Top tv series Start
GetTopTvSeries(API_FOR_TV);

function GetTopTvSeries(url) {
	fetch(url).then(res => res.json()).then(data => {
		return ShowTopTvSeries(data.results.slice(a, b));
	})
}

function ShowTopTvSeries(data) {
	second.innerHTML = '';
	data.forEach(movie => {
		const {name, poster_path, vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.innerHTML = `
								<div class="RatingBack">
							<h3 class="Movie" style="color: #FFFFFF; padding: 10px; margin: 0">${vote_average}/10</h3>		
								</div>
																		
				<img class="MoviesImg"src="${IMG_URL + poster_path}">	            	
	                	<h4 style="color: darkblue">${name}</h4>	             	                                          
						`
		second.appendChild(movieEl);
	})
}





