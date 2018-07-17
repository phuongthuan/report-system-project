import React  from 'react';
import Report from "../Report";

const ReportsList = (props) => {
  const { reportsList, deleteReport } = props;
  return (
    <div>
      {reportsList.map(report =>
        (
          <Report
            deleteReport={deleteReport}
            key={report.id}
            report={report}
          />
        ) )}
    </div>
  );
}

export default ReportsList;
