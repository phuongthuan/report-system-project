import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Input from 'components/Input'
import Button from 'components/Button'
import { setUsername } from 'containers/App/actions'
import { selectUsername } from 'containers/App/selectors'
import styled from 'styled-components'
import img from '../../assests/images/loginbackground.jpg';

const HomeWrapper = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
    const { history } = this.props;
    const { isLogin } = this.state;
    if (isLogin) history.push('/profile/edit');
    history.push('/login');
  }

  render() {
    return (
      <HomeWrapper>
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
      </HomeWrapper>
    )
  }
}

export default Home;
