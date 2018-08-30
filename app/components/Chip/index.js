import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core';

const styles = () => ({
  root: {
    display: 'infline',
    justifyContent: 'start',
    flexWrap: 'wrap',
  }
});

class Chips extends PureComponent {

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
          onClick={() => this.navigate(`/member/${userId}`)}
        />
      </div>
    )
  }
}

Chips.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Chips);