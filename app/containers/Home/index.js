import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import img from '../../assests/images/neil-rosenstech-752022-unsplash.jpg'

const AppWrapper = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 50px 0;
`;

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
      <AppWrapper>
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
      </AppWrapper>
    )
  }
}

export default Home;
