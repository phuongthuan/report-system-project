import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'

export class Home extends PureComponent {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    })
  }

  goToReportPage = () => {
    const {history} = this.props;
    history.push('/profile/edit');
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

export default Home;
