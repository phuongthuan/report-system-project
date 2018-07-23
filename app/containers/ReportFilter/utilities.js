export const filterReportByRange = (reports, payload) => {
  if (reports instanceof Array) {
    return reports.filter(report =>
      payload.dateFrom <= report.date <= payload.dateTo
    );
  }
}

export const filterReportByDay = (reports, payload) => {
  if (reports instanceof Array) {
    return reports.filter(report => report.date === payload);
  }
}


