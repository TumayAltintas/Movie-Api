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
const BASE_URL = 'https://api.themoviedb.org/3/';


//////////////////////////////////////////////////////////////////////////////////////////// Top Header Start
GetTopTvHeaderSeries(API_FOR_TV);

function GetTopTvHeaderSeries(url) {

	fetch(url).then(res => res.json()).then(data => {
		return ShowTopTvHeaderSeries(data.results.slice(1, 2));
	})
}

function ShowTopTvHeaderSeries(data) {
	HeaderTv.innerHTML = '';
	data.forEach(movie => {
		const {poster_path, vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.classList.add('MovieImage');
		movieEl.innerHTML = `
				<div class="HeaderShowMovie">
				<h3 style="color:black; margin: 0">${vote_average}/10</h3>	
				</div>	
				<img class="TvImg" src="${IMG_URL + poster_path}">`
		HeaderTv.appendChild(movieEl);
	})
}

//////////////////////////////////////////////////////////////////////////////////////////// Top Header Movie
GetTopMovieHeader(API_FOR_MOVIES);

function GetTopMovieHeader(url) {
	fetch(url).then(res => res.json()).then(data => {
		return ShowTopMovieHeader(data.results.slice(14, 15));
	})
}

function ShowTopMovieHeader(data) {
	HeaderMovie.innerHTML = '';
	data.forEach(movie => {
		const {poster_path, vote_average} = movie
		const movieEl = document.createElement('div');
		movieEl.classList.add('MovieImage');
		movieEl.innerHTML = `
				<div class="HeaderShowMovie">
				<h3 style="color:black; margin: 0">${vote_average}/10</h3>	
				</div>				
				<img class="TvImg" src="${IMG_URL + poster_path}">
`
		HeaderMovie.appendChild(movieEl);
	})
}

//////////////////////////////////////////////////////////////////////////////////////////// Top Header End
let a = 0;
let b = 5;
//////////////////////////////////////////////////////////////////////////////////////////// Top Movies Start

GetTopMovies(API_FOR_MOVIES);

function GetTopMovies(url) {
	fetch(url).then(res => res.json()).then(data => {
		ShowTopMoves(data.results.slice(a, b));
	})

}

function ShowTopMoves(data) {
	main.innerHTML = '';
	data.forEach(movie => {
		const {title, poster_path, vote_average, id} = movie
		const movieEl = document.createElement('div');
		if (movie.vote_average > 8) {
			movieEl.innerHTML = `						
						<div>
						<h3 class="Movie" style="color: #FFFFFF; padding: 10px; margin: 0; " >${vote_average}/10</h3>	
						</div>
				<div style="margin: 2.5rem 1rem 0 0; display: flex">
				<img id="${id}" onclick="openNav()" class="TvImg" src="${IMG_URL + poster_path}">
				<div class="NameTag">
				<h4 class="MovieTvName" >${title}</h4>	
						</div>  																			       
	                	`
			main.appendChild(movieEl);
			document.getElementById(id).addEventListener('click', () => {
				openNav(movie)
			})
		}

	})

}


function openNav(movie) {
	let id = movie.id
	let over = movie.vote_average
	let title = movie.title
	let ListOfCast = [];
	let ListOfGenres = [];
	let Product_Companies = [];


	fetch(BASE_URL + 'movie/' + id + '/credits?' + API_KEY).then(res => res.json()).then(data => {

		for (let i = 0; i < data.cast.length; i++) {

			let CastName = data.cast[i].name;
			ListOfCast.push(CastName)
		}
	});

	fetch(BASE_URL + '/movie/' + id + '?' + API_KEY).then(res => res.json()).then(data => {
		let MovieReleaseDate = data.release_date;
		let MovieOverview = data.overview;
		let MovieBackdrop = data.backdrop_path;
		for (let i = 0; i < data.genres.length; i++) {
			let genresList = data.genres[i].name;
			ListOfGenres.push(genresList)
		}
		for (let i = 0; i < data.production_companies.length; i++) {
			let ProductionCompanies = data.production_companies[i].name;
			Product_Companies.push(ProductionCompanies)
		}
		document.getElementById("myNav").style.width = "100%";
		document.getElementById('MovieName').innerHTML = title
		document.getElementById('MovieGenres').innerHTML = ListOfGenres
		document.getElementById('MovieCast').innerHTML = ListOfCast
		document.getElementById('MovieOverly').innerHTML = over + '/10'
		document.getElementById('MovieDate').innerHTML = MovieReleaseDate
		document.getElementById('MovieCompany').innerHTML = Product_Companies
		document.getElementById('MovieImage').src = IMG_URL + MovieBackdrop
		document.getElementById('MovieOverview').innerHTML = MovieOverview

	})
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}

/////////////////////////////////////////////////////////////////////////////////////////// Top tv series Start
GetTopTvSeries(API_FOR_TV);

function GetTopTvSeries(url) {
	fetch(url).then(res => res.json()).then(data => {

		return ShowTopTvSeries(data.results.slice(0, 5));
	})
}

function ShowTopTvSeries(data) {
	second.innerHTML = '';
	data.forEach(tv => {
		const {name, poster_path, vote_average, id} = tv
		const TvEl = document.createElement('div');
		if (tv.vote_average > 8) {
			TvEl.innerHTML = `<div>
							<h3 class="Movie" style="color: #FFFFFF; padding: 10px; margin: 0; align-items: center">${vote_average}/10</h3>		
								</div>																	
				<div style="margin: 2.5rem 1rem 3rem 0; display: flex">
				<img id="${id}" onclick="openNav1()" class="TvImg" src="${IMG_URL + poster_path}">		
				<div class="NameTag">
				<h4 class="MovieTvName" >${name}</h4>	
						</div>  
						</div>	             	                                          
						`
			second.appendChild(TvEl);
			document.getElementById(id).addEventListener('click', () => {
				openNav1(tv)
			})
		}


	})
}

/////////////////////////////////////////////////////////////////////////////////////////// Top tv series End
function openNav1(tv) {

	let id = tv.id
	let over = tv.vote_average
	let ListOfCast = [];
	let ListOfGenres = [];
	let Product_Companies = [];
	fetch(BASE_URL + '/tv/' + id + '/credits?' + API_KEY).then(res => res.json()).then(data => {

		for (let i = 0; i < data.cast.length; i++) {
			let CastName = data.cast[i].name;
			ListOfCast.push(CastName)
		}
	});

	fetch(BASE_URL + '/tv/' + id + '?' + API_KEY).then(res => res.json()).then(data => {

		let TvOverview = data.overview;
		let TvBackdrop = data.backdrop_path;
		for (let i = 0; i < data.genres.length; i++) {
			let genresList = data.genres[i].name;
			ListOfGenres.push(genresList)
		}
		for (let i = 0; i < data.production_companies.length; i++) {
			let ProductionCompanies = data.production_companies[i].name;
			Product_Companies.push(ProductionCompanies)
		}
		document.getElementById("myNav1").style.width = "100%";
		document.getElementById('TvName').innerHTML = data.name
		document.getElementById('TvGenres').innerHTML = ListOfGenres
		document.getElementById('TvCast').innerHTML = ListOfCast
		document.getElementById('TvOverly').innerHTML = over + '/10'
		document.getElementById('TvDate').innerHTML = data.first_air_date
		document.getElementById('TvCompany').innerHTML = Product_Companies
		document.getElementById('TvImage').src = IMG_URL + TvBackdrop
		document.getElementById('TvOverview').innerHTML = TvOverview

	})
}

function closeNav1() {
	document.getElementById("myNav1").style.width = "0%";
}


