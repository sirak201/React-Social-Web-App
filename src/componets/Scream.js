import React, { Component } from "react";
import { Link } from "react-router-dom";
//Material
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import MyButton from "../utls/MBbutton";
import DeleteScream from "./DeleteScream";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },

  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFir: "cover"
  }
};
class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else return false;
  };

  likeScream = () => {
    console.log("Im being called");
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Undo Like" onClick={this.unlikeScream}>
        <Favorite color="primary"></Favorite>
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary"></FavoriteBorder>
      </MyButton>
    );

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId}></DeleteScream>
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>

          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>

          <MyButton tip="Comment">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>

          <span>{commentCount} comment </span>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Scream));
