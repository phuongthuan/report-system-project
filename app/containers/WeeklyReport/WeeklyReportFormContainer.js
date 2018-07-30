import { connect } from 'react-redux'
import WeeklyReportForm from "../../components/WeeklyReportForm";
import { selectUser } from "../Auth/selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import { createWeeklyReport } from './actions'

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  {addFlashMessage, createWeeklyReport}
)(WeeklyReportForm);
