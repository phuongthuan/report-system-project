import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class Chips extends Component {

  navigate = (url) => {
    const {history} = this.props;
    history.push(url);
  }

  render() {
    const {classes, userInfo} = this.props;
    const avatar = userInfo && userInfo.avatar;
    const userId = userInfo && userInfo.id;
    const fullName = userInfo && (`${userInfo.firstName} ${userInfo.lastName}`);


    return (
      <div className={classes.root}>
        <Chip
          avatar={<Avatar src={avatar}/>}
          label={fullName}
          className={classes.chip}
          onClick={() => this.navigate(`/member/${userId}`)}
        />
      </div>
    )
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);