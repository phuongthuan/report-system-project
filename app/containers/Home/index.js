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
    }),
    username: PropTypes.string,
    onChangeUsername: PropTypes.func,
  }


  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }

  goToLearningPage = () => {
    const { history } = this.props;
    const { isLogin } = this.state;
    if (isLogin) history.push('/learning');
    history.push('/login');
  }

  goToReportPage = () => {
    const { history } = this.props;
    const { isLogin } = this.state;
    if (isLogin) history.push('/report');
    history.push('/login');
  }


  render() {
    const { username, onChangeUsername } = this.props
    return (

      <HomeWrapper>
        <div className="container">
          <div className="d-flex flex-column align-items-center">
            {/*<Input*/}
              {/*value={username}*/}
              {/*onChange={onChangeUsername}*/}
            <Button
              className="mt-3"
              onClick={this.goToLearningPage}
            >
              LEARNING
            </Button>

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

export const mapStateToProps = state => ({
  username: selectUsername(state),
});

export const mapDispatchToProps = dispatch => ({
  onChangeUsername: value => dispatch(setUsername(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
