import React from 'react';
import axios from 'axios';
const _ = require('lodash');
import { sizing } from '@material-ui/system';
import Box from '@material-ui/core/Box';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from '@material-ui/core/colors/purple';
// import getMuiTheme from "material-ui/styles/getMuiTheme";
// import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

import Navbar from '../Components/Navbar.jsx'
import Search from '../Components/Search.jsx';
import MovieList from '../Components/MovieList.jsx';
import MovieDescript from './MovieDescript.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: "",
      movie: null,
      // theme: { palette: { type: "light" } },
    };

    this.getNowPlayingMovies = this.getNowPlayingMovies.bind(this);
    this.getSearchedMovies = this.getSearchedMovies.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.viewWatchlist = this.viewWatchlist.bind(this);
    this.goHome = this.goHome.bind(this); //
    this.gettvShows = this.gettvShows.bind(this);
    this.tvShow = this.tvShow.bind(this);
    this.getSearchedShows = this.getSearchedShows.bind(this);
    // this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
  }

// toggleDarkTheme() {
//   let newPaletteType = this.state.theme.palette.type === "light" ? "dark" : "light";
//   // console.log(newpaletteType);
//   this.setState({ theme: { palette: { type: newPaletteType } } });
// } 

  // handle request for movies playing in theatres now
getNowPlayingMovies() {
    return axios
      .get("/now-playing")
      .then(movies => {
        return _.shuffle(movies.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // handle request for searching for a movie
  getSearchedMovies(movie) {
    return axios
      .get(`/movie/${movie}`)
      .then(movies => {
        return movies.data.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSearchedShows(show) {
    return axios
      .get(`/tv/${show}`)
      .then(shows => {
        return shows.data.data;
      })
      .catch(error => console.log(error));
  }

  gettvShows() {
    return axios
      .get(`/tvshows`)
      .then(shows => {
        return _.shuffle(shows.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // when user visits page, show now playing movies and set them to state
  componentDidMount(e) {
    this.getNowPlayingMovies()
      .then(response => {
        this.setState({
          movies: response,
          movie: null
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // when user searches for a movie, get movies matching search and set them to state
  handleSearch(input) {
    this.setState({ search: input });
    this.getSearchedMovies(input)
      .then(movies => {
        this.setState({ movie: null });
        this.setState({ movies: movies });
      })
      .catch(error => {
        console.error(error);
      });
    this.getSearchedShows(input)
      .then(shows => {
        this.setState({ movie: null });
        this.setState({ movies: shows });
      })
      .catch(error => console.log(error));
    event.preventDefault();
  }

  goHome() {
    this.getNowPlayingMovies().then(response => {
      this.setState({
        movies: response,
        movie: null
      });
    });
  }

  tvShow() {
    this.gettvShows().then(response => {
      this.setState({
        movies: response,
        movie: null
      });
    });
  }

  viewWatchlist() {
    axios
      .post("/usersMovies", { email: this.props.user.email })
      .then(res => {
        this.setState({
          movies: res.data,
          movie: null
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // when a movie is clicked, set the state for movie to the object of the clicked movie
  handleClick(movie) {
    axios
      .put("/votes", {
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.posterPath,
        vote_count: movie.voteCount,
        vote_average: movie.voteAvg,
        numFlag: 0
      })
      .then(res => {
        this.setState({
          movie: movie,
          userVotes: res.data[0].userVotes
        });
      });
  }

  render() {
console.log(this.state.theme)
// const muiTheme = createMuiTheme(this.state.theme);
const { onToggleDark } = this.props
    return this.state.movie ? ( // show a movie's details when it is clicked
      // <MuiThemeProvider theme={muiTheme}>
        <div>
          <Navbar
            onToggleDark={onToggleDark}
            logoutClick={this.props.logoutClick}
            goHome={this.goHome}
            viewWatchlist={this.viewWatchlist}
            user={this.props.user}
            tvShow={this.tvShow}
          />
          <div>
            <Search handleSearch={this.handleSearch} />
            <Box display="flex" maxWidth={800}>
              <MovieDescript
                userVotes={this.state.userVotes}
                movie={this.state.movie}
                user={this.props.user}
              />
            </Box>
          </div>
        </div>
      // </MuiThemeProvider>
    ) : (
      // <MuiThemeProvider theme={muiTheme}>
        <div>
          <Navbar
            onToggleDark={onToggleDark}
            logoutClick={this.props.logoutClick}
            goHome={this.goHome}
            viewWatchlist={this.viewWatchlist}
            user={this.props.user}
            tvShow={this.tvShow}
          />
          <div>
            <Search handleSearch={this.handleSearch} />
            <Box maxWidth={800}>
              <MovieList
                movies={this.state.movies}
                handleClick={this.handleClick}
              />
            </Box>
          </div>
        </div>
      // </MuiThemeProvider>
    );
  }
}

export default Main;