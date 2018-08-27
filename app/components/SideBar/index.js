import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Layout, Menu, Card, Icon } from 'antd'
import Spinner from 'components/Spinner'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { FormattedMessage } from 'react-intl'
import { Badge } from 'reactstrap';
import imageProfile from '../../assests/images/Gabe_newell.png';
import { selectUser } from "../../containers/Auth/selectors";
import * as AuthPageActions from '../../containers/Auth/actions'
import * as ProfilePageActions from '../../containers/ProfilePage/actions'
import { selectProfileLoading, selectProfile } from "../../containers/ProfilePage/selectors";
import { selectMessages } from "../../containers/Message/selectors";
import { fetchAllMessages } from "../../containers/Message/actions";
import { fetchAllReportsOfUser } from "../../containers/ReportPage/actions";
import { setLocale } from "../../containers/App/actions";
import Language from "../Language";

const {Sider} = Layout;
const {Meta} = Card;

class SideBar extends Component {

  componentDidMount() {
    const {getProfile, user, fetchAllMessages} = this.props;
    if (user) {
      getProfile(user.id);
    }
    if (user.role === 'member' || user.role === 'team_leader') {
      fetchAllMessages(user.id);
    }
  }

  get fullName() {
    const { profile } = this.props;
    return `${profile.firstName} ${profile.lastName}`
  }

  navigate = (url) => {
    const {history} = this.props;
    history.push(url);
  }

  logout = (e) => {
    const {history, logout} = this.props;
    e.preventDefault();
    logout();
    history.push('/');
  }

  render() {
    const {profile, loading, user, messages, changeLocale} = this.props;
    const avatar = profile ? profile.avatar : imageProfile;
    return (
      <Fragment>
        {loading && isEmpty(profile) && isEmpty(user) ? (
          <Spinner style={{fontSize: 32, color: '#071820'}}/>
        ) : (
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0
            }}
          >
            {loading && isEmpty(avatar) ? (
              <Spinner style={{fontSize: 32, color: '#071820'}}/>
            ) : (
              <Card
                style={{width: 200, border: 0, borderRadius: 0, textAlign: 'center'}}
                cover={<img style={{padding: '10px', width: 200, height: 200}} alt="example" src={avatar}/>}
              >
                <Meta title={this.fullName} />
                <small
                  style={{cursor: 'pointer'}}
                  onClick={() => this.navigate('/profile/edit')}
                  role="button"
                >
                  <Icon type="setting"/>
                  &nbsp;
                  <FormattedMessage
                    id="report.button.profile.edit"
                    defaultMessage="Edit Profile"
                  />
                </small>
                <br/>
                <small>
                  <Language changeLocale={changeLocale}/>
                </small>
              </Card>
            )}

            {(profile.role) === 'member' && (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                  <Icon type="form"/>
                  <span
                    onClick={() => this.navigate('/report/create')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.write.daily.report"
                      defaultMessage="Write Daily Report"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="2">
                  <Icon type="book"/>
                  <span
                    onClick={() => this.navigate('/report')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.reports"
                      defaultMessage="Reports"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="3">
                  <Icon type="inbox"/>
                  <span
                    onClick={() => this.navigate('/message')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.messenger"
                      defaultMessage="Messenger"
                    />
                    {messages.length > 0 &&
                    (
                      <Badge color="warning">{messages.length}</Badge>
                    )
                    }
                  </span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="logout" className="mr-2"/>
                  <span
                    role="button"
                    className="nav-text"
                    onClick={this.logout}
                  >
                    <FormattedMessage
                      id="report.logout"
                      defaultMessage="Logout"
                    />
                  </span>
                </Menu.Item>
              </Menu>
            )}

            {(profile.role) === 'team_leader' && (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                  <Icon type="area-chart"/>
                  <span
                    onClick={() => this.navigate('/statistic')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.statistic"
                      defaultMessage="Statistic"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="2">
                  <Icon type="team" />
                  <span
                    onClick={() => this.navigate('/member')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.memberlist"
                      defaultMessage="Members List"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="3">
                  <Icon type="solution"/>
                  <span
                    onClick={() => this.navigate('/report')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.reportsofteam"
                      defaultMessage="Reports Of Team"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="4">
                  <Icon type="inbox"/>
                  <span
                    onClick={() => this.navigate('/message')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.messenger"
                      defaultMessage="Messenger"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="5">
                  <Icon type="logout"/>
                  <span
                    role="button"
                    className="nav-text"
                    onClick={this.logout}
                  >
                    <FormattedMessage
                      id="report.logout"
                      defaultMessage="Logout"
                    />
                  </span>
                </Menu.Item>
              </Menu>
            )}

            {(profile.role) === 'group_leader' && (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                  <Icon type="idcard"/>
                  <span
                    onClick={() => this.navigate('/team')}
                    role="button"
                    className="nav-text"
                  >

                    <FormattedMessage
                      id="report.menuitem.teamlist"
                      defaultMessage="Teams List"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="2">
                  <Icon type="team"/>
                  <span
                    onClick={() => this.navigate('/member')}
                    role="button"
                    className="nav-text"
                  >
                    <FormattedMessage
                      id="report.menuitem.memberlist"
                      defaultMessage="Members List"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item key="3">
                  <Icon type="logout"/>
                  <span
                    role="button"
                    className="nav-text"
                    onClick={this.logout}
                  >
                    <FormattedMessage
                      id="report.logout"
                      defaultMessage="Logout"
                    />
                  </span>
                </Menu.Item>
              </Menu>
            )}

          </Sider>
        )}
      </Fragment>
    )
  }
}

SideBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  profile: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  fetchAllMessages: PropTypes.func.isRequired,
  changeLocale: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectProfileLoading(state),
  messages: selectMessages(state)
});

const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(ProfilePageActions.getUserProfile(id)),
  logout: () => dispatch(AuthPageActions.logout()),
  fetchAllMessages: payload => dispatch(fetchAllMessages(payload)),
  fetchAllReportsOfUser: payload => dispatch(fetchAllReportsOfUser(payload)),
  changeLocale: lang => dispatch(setLocale(lang))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
