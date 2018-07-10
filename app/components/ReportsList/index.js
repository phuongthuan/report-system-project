import React from 'react';
import Report from 'components/Report';

const ReportsList = (props) => {
  const { reportsList } = props;
  return (
    <div className="col-md-8">
      {reportsList.map(report =>
        (
          <Report
            key={report.id}
            report={report}
          />
        ) )}
    </div>
  );
}

export default ReportsList;
