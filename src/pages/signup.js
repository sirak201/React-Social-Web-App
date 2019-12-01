import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/monkey.png";
import { Link } from "react-router-dom";

//MUI Studd
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";
import { signUp } from "../redux/actions/userAction";

const styles = {
  form: {
    textAlign: "center"
  },
  imgeSize: {
    maxWidth: 50,
    maxHeight: 50,
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    margin: "20",
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: "10px"
  },

  progress: {
    position: "absolute"
  }
};

class signup extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      conformPassword: this.state.conformPassword,
      handle: this.state.handle
    };

    this.props.signUp(newUser, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      conformPassword: "",
      handle: "",
      errors: {}
    };
  }

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.imgeSize} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="conformPassword"
              name="conformPassword"
              type="password"
              label="Conform Password"
              className={classes.textField}
              helperText={errors.conformPassword}
              error={errors.conformPassword ? true : false}
              value={this.state.conformPassword}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />

            {errors.error && (
              <Typography variante="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? login
              <Link to="/login"> here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signUp })(withStyles(styles)(signup));
