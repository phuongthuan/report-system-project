import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'

export class Home extends PureComponent {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }

  goToReportPage = () => {
    const {history} = this.props;
    const {isLogin} = this.state;
    if (isLogin) history.push('/profile/edit');
    history.push('/login');
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <Button
            className="mt-3"
            onClick={this.goToReportPage}
          >
            REPORT
          </Button>
        </div>
      </div>
    )
  }
}

export default Home;
