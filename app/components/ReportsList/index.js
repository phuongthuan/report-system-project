import React  from 'react';
import Report from "../Report";

const ReportsList = (props) => {
  const { reportsList, deleteReport, user, addFlashMessage } = props;
  return (
    <div>
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
    </div>
  );
}

export default ReportsList;
