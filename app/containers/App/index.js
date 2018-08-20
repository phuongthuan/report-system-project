import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from "prop-types";
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import Home from 'containers/Home'
import Auth from "containers/Auth";
import { Layout } from 'antd';
import ReportPage from 'containers/ReportPage';
import NoMatch from "../../utils/NoMatch";
import PrivateRoute from '../../utils/PrivateRoute'
import StatisticPage from "../StatisticPage";
import SideBar from '../../components/SideBar'
import ProfilePage from "../ProfilePage";
import MemberPage from "../MemberPage";
import MessagePage from "../Message";
import TeamPage from "../TeamPage";
import WeeklyReport from "../WeeklyReport/index";
import { selectLocale } from "./selectors";
import { setLocale } from './actions'
import messages from '../../translations/messages'

const {Header, Content, Footer} = Layout;

class App extends Component {

  static propTypes = {
    locale: PropTypes.string.isRequired,
  };

  render() {
    const { locale } = this.props;
    return (
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
      >
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Auth}/>

          <Layout style={{minHeight: '100vh'}}>
            <SideBar/>
            <Layout style={{marginLeft: 200}}>
              {/*<Header style={{background: '#fff', padding: 0}}/>*/}
              <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                <div>
                  <Switch>
                    <PrivateRoute path="/message" component={MessagePage}/>
                    <PrivateRoute path="/weekly-report" component={WeeklyReport}/>
                    <PrivateRoute path="/report" component={ReportPage}/>
                    <PrivateRoute path="/statistic" component={StatisticPage}/>
                    <PrivateRoute path="/profile" component={ProfilePage}/>
                    <PrivateRoute path="/member" component={MemberPage}/>
                    <PrivateRoute path="/team" component={TeamPage}/>
                    <Route component={NoMatch}/>
                  </Switch>
                </div>
              </Content>
              <Footer style={{textAlign: 'center'}}>
                Report System ©2018 Created by phuongthuan
              </Footer>
            </Layout>
          </Layout>

        </Switch>
      </IntlProvider>
    )
  }
}

const mapStateToProps = state => ({
  locale: selectLocale(state)
});

export default connect(mapStateToProps, { setLocale })(App);
