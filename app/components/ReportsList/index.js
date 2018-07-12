import React from 'react';
import Report from 'components/Report';

const ReportsList = (props) => {
  const { reportsList, deleteAction, updateAction } = props;
  return (
    <div className="col-md-8">
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
