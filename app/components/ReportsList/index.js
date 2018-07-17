import React, { Fragment } from 'react';
import Report from "../Report";

const ReportsList = (props) => {
  const { reportsList, deleteAction, updateAction } = props;
  return (
    <div>
      {reportsList.map(report =>
        (
          <Report
            deleteReport={deleteAction}
            updateReport={updateAction}
            key={report.id}
            report={report}
          />
        ) )}
    </div>
  );
}

export default ReportsList;
