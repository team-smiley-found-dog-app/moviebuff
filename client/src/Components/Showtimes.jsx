import React from 'react';
import Showtime from './Showtime.jsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class Showtimes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shows } = this.props;
    console.log(shows, 'props');
    return (
        <div>
          {shows.showtimes && shows.showtimes.map(showtime => <Showtime show={showtime}/>)}
        </div>
    )
  }
}
export default Showtimes;