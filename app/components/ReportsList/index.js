import React, { Fragment } from 'react';
import Report from "../Report";

const ReportsList = (props) => {
  const { reportsList, deleteAction, updateAction } = props;
  return (
    <div>
      {reportsList.map(report =>
        (
          <Report
            deleteAction={deleteAction}
            updateAction={updateAction}
            key={report.id}
            report={report}
          />
        ) )}
    </div>
  );
}

export default ReportsList;
