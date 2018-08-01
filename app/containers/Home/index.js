import React, { PureComponent } from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { selectUser } from "../Auth/selectors";

export class Home extends PureComponent {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    })
  }

  goToReportPage = () => {
    const { user } = this.props;
    const {history} = this.props;
    if (isEmpty(user)) {
      history.push('/login');
    } else {
      return <Redirect to="/profile/edit" />
    }
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <Button
            className="mt-3"
            onClick={this.goToReportPage}
          >
            REPORT SYSTEMS
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(mapStateToProps, null)(Home);
