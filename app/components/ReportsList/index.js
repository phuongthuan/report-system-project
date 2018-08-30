import React, { Fragment } from 'react';
import Report from "../Report";

const ReportsList = (props) => {
  const { reportsList, deleteReport, user, addFlashMessage } = props;
  return (
    <Fragment>
      {reportsList.map(report =>
        (
          <Report
            {...props}
            user={user}
            addFlashMessage={addFlashMessage}
            deleteReport={deleteReport}
            key={report.id}
            report={report}
          />
        ) )}
    </Fragment>
  );
}

export default ReportsList;
