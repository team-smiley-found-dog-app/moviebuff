import React from 'react';

class Showtime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show } = this.props;
    return (
      <div>
        {show.theatre.name}
      </div>
    )
  }
}
export default Showtime;