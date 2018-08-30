import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import img from '../../assests/images/ruslan-bardash-349163-unsplash.jpg'
import { selectIsAuthenticated } from "../Auth/selectors";

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
    }),
    isAuthenticated: PropTypes.bool.isRequired
  }

  goToReportPage = () => {
    const {history, isAuthenticated} = this.props;
    if (isAuthenticated) {
      history.push('/profile/edit');
    } else {
      history.push('/login');
    }
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
              <FormattedMessage
                id="app.title"
                defaultMessage="Report System"
              />
            </Button>
          </div>
        </div>
      </AppWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(
  mapStateToProps,
  null
)(Home);
