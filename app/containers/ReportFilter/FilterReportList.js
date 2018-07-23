import { SHOW_ALL_TIME, SHOW_BY_DAY, SHOW_BY_MONTH, SHOW_BY_WEEK } from "./constants";
import { filterReportByDay, filterReportByRange } from "./utilities";

const getFilterReports = (reports, filter) => {
  switch (filter) {
    case SHOW_ALL_TIME:
      return reports
    case SHOW_BY_DAY:
      return filterReportByDay(reports, filter)
    case SHOW_BY_WEEK:
      return filterReportByRange(reports, filter)
    case SHOW_BY_MONTH:
      return filterReportByRange(reports, filter)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}