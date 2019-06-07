/* eslint-disable react/sort-comp */
import React from 'react';
import axios from 'axios';
// import { SpotifyApiContext } from "react-spotify-api";
// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            'Authorization': 'Bearer BQBEJXJOSrNdtOnSUuzE4dts7-W7O_fZL7UT3eT2es1MU4xArKdcBKrEeQdh28kWbsNuxmTscHTp4ZvAy8sUtXV4Lu4D7ZnPwMxaLYkCWcuz_3gfj6nyhjPu9PUSyLDanisbAxyy2HBm_g3waA'
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
        console.log(album, "get");
        this.setState({ album: album });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // search input field and button
  render() {
    console.log(this.state.album, 'album')
    console.log(this.state.trailer, 'trailer');
    if (this.state.trailer) {
      return this.state.album ? (
        <div>
            <iframe
              src={`${this.state.album.albums.items[0].external_urls.spotify}`}
              width="250"
              height="80"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${
              this.state.trailer.id.videoId
            }`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ) : (
        <div>
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${this.state.trailer.id.videoId}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    } else {
      return <div>HEEEEEYYYYYY</div>;
    }
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