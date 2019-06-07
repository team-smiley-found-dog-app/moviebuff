/* eslint-disable react/sort-comp */
import React from 'react';
import axios from 'axios';
// import { SpotifyApiContext } from "react-spotify-api";
// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';
import { spotify_api } from '../../../config.js'

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailer: null,
      album: null,
    };

    this.getTrailer = this.getTrailer.bind(this);
    this.getSoundtrack = this.getSoundtrack.bind(this);
  }

  getTrailer() {
    console.log(this.props.movie.title);
    return axios
      .get(`/trailer/${this.props.movie.title}`, {
        params: { title: this.props.movie.title }
      })
      .then((res) => {
        console.log(res);
        return res.data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  }


  // get url for soundtrack to plugin to player
  getSoundtrack() {
    return axios
      .get(`https://api.spotify.com/v1/search?q=${this.props.movie.title}&type=album&market=US&limit=1`,
        {
          headers: {
            Authorization: spotify_api,
          },
        })
      .then((res) => {
        console.log(res, "sound");
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount(e) {
    this.getTrailer()
      .then((trailer) => {
        console.log(trailer);
        this.setState({ trailer: trailer });
      })
      .catch((err) => {
        console.error(err);
      });
    this.getSoundtrack()
      .then((album) => {
        console.log(album.albums.items[0].external_urls.spotify, "get");
        this.setState({ album: album.albums.items[0].external_urls.spotify });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // search input field and button
  render() {
    const { album } = this.state;
    console.log(album, 'spotify album from state');
    // if (this.state.trailer) {
      return (
        <div>
          <a href={album} target="_blank" >Click for Playlist</a>
            {/* <iframe
              src={`${album}`}
              width="250"
              height="80"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            /> */}
          {/* <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${
              this.state.trailer.id.videoId
            }`}
            frameBorder="0"
            allowFullScreen
          /> */}
        </div>
       
      );
    // } else {
    //   return null;
    // }
  }
}
//
export default Video;

// // youtube video embed
// const Video = (props) => (
//   // <div></div>
//   <div>
//     {/* <iframe width="853" height="480" src={`https://www.youtube.com/embed/${props.trailer.id.videoId}`} frameborder="0" allowfullscreen></iframe> */}
//   </div>
//   // <div className="video-player">
//   //   <div className="embed-responsive embed-responsive-16by9">
//   //     <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${props.video.id.videoId}`} allowFullScreen></iframe>
//   //   </div>
//   //   <div className="video-player-details">
//   //     <h3>{props.video.snippet.title}</h3>
//   //     <div>{props.video.snippet.description}</div>
//   //   </div>
//   // </div>
// );

// export default Video;