import React from 'react';
import Showtime from './Showtime.jsx';

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