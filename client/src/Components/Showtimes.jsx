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
        shows.showtimes ? shows.showtimes.map(showtime => <Showtime show={showtime}/>) : (
          <div>
            <Box m={2} display="flex" flexDirection="row">
              <Typography gutterBottom variant="h5" component="h2">
                Sorry. This film is not yet in theatres
              </Typography>
            </Box>
          </div>
        )      
    )
  }
}
export default Showtimes;