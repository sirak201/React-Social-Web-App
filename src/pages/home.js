import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../componets/Scream";
import Profile from "../componets/Profile";
import { connect } from "react-redux";

import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams } = this.props.data;
    let recentScreamsMarkup = screams ? (
      screams.map((scream, index) => <Scream key={index} scream={scream} />)
    ) : (
      <p> Loading ....</p>
    );
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile></Profile>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);
