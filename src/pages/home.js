import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Scream from "../componets/Scream";
import Profile from "../componets/Profile";
import { connect } from "react-redux";

import { getUserData } from "../redux/actions/userAction";

class home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
    this.props.getUserData();
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream, index) => (
        <Scream key={index} scream={scream} />
      ))
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

const mapStateToProps = state => ({});

const mapActionsToProps = {
  getUserData
};

export default connect(mapStateToProps, mapActionsToProps)(home);
