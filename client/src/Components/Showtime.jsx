import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// import Button from '@material-ui/core/Button';

class Showtime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show } = this.props;
    return (
      <div>
        <Box m={2} display="flex" flexDirection="row">
          <Typography gutterBottom variant="h5" component="h2">
            {show.theatre.name}
          </Typography>
        </Box>
        <Box m={2} display="flex" flexDirection="row">
          <Typography gutterBottom variant="h5" component="h2">
            {show.dateTime}
          </Typography>
        </Box>
        <Box m={2} display="flex" flexDirection="row">
          <Typography gutterBottom variant="h5" component="h2">
            <a href={show.ticketURI} target="_blank">Tickets</a>
          </Typography>
        </Box>
      </div>
    );
  }
}
export default Showtime;