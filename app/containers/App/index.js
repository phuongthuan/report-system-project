import React  from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
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
import messages from '../../translations/messages'

const {Content, Footer} = Layout;

const App = ({location, locale}) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <Switch>
      <Route location={location} exact path="/" component={Home}/>
      <Route location={location} path="/login" component={Auth}/>

      <Layout style={{minHeight: '100vh'}}>
        <SideBar/>
        <Layout style={{marginLeft: 200}}>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div>
              <Switch>
                <PrivateRoute location={location} path="/message" component={MessagePage}/>
                <PrivateRoute location={location} path="/weekly-report" component={WeeklyReport}/>
                <PrivateRoute location={location} path="/report" component={ReportPage}/>
                <PrivateRoute location={location} path="/statistic" component={StatisticPage}/>
                <PrivateRoute location={location} path="/profile" component={ProfilePage}/>
                <PrivateRoute location={location} path="/member" component={MemberPage}/>
                <PrivateRoute location={location} path="/team" component={TeamPage}/>
                <Route location={location} component={NoMatch}/>
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


App.propTypes = {
  locale: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  locale: selectLocale(state)
});

export default connect(mapStateToProps, null)(App);
