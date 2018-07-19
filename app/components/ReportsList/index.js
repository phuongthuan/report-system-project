import React  from 'react';
import Report from "../Report";

const ReportsList = (props) => {
  const { reportsList, deleteReport, user } = props;
  return (
    <div>
      {reportsList.map(report =>
        (
          <Report
            user={user}
            deleteReport={deleteReport}
            key={report.id}
            report={report}
          />
        ) )}
    </div>
  );
}

export default ReportsList;
