import React, { PureComponent } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Line } from 'react-chartjs-2';

class IssueLine extends PureComponent {

  static defaultProps = {
    displayName: 'Line Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  state = {
    dataSource: this.props.dataSource,
    data: {
      labels: ['June', 'July', 'August', 'September'],
      datasets: [
        {
          label: 'Hard for Debugging',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#990099',
          borderColor: '#990099',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#990099',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#990099',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81]
        },

        {
          label: 'Keeping up with Technology',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#3366cc',
          borderColor: '#3366cc',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#3366cc',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#3366cc',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [25, 49, 20, 51]
        },
        {
          label: 'Communication with others',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#109618',
          borderColor: '#109618',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#109618',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#109618',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [35, 79, 10, 51]
        },
        {
          label: 'Time Estimation',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#DC3912',
          borderColor: '#DC3912',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#DC3912',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#DC3912',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [55, 29, 60, 21]
        },
        {
          label: 'Security Threats',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FF9900',
          borderColor: '#FF9900',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#FF9900',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#FF9900',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [78, 39, 40, 20]
        }
      ]
    }
  }

  componentDidMount() {
    const {dataSource} = this.props;
    this.calculateData(dataSource);
  }

  calculateData = (data) => {

    const issue1 = [0, 0, 0, 0];
    const issue2 = [0, 0, 0, 0];
    const issue3 = [0, 0, 0, 0];
    const issue4 = [0, 0, 0, 0];
    const issue5 = [0, 0, 0, 0];

    data
      .map(report => {
        if (report.date >= '2018-06-01' && report.date <= '2018-06-31') {
          report.issues.map(issue => {
            if (issue === 'Hard for Debugging') {
              issue1[0]++;
            } else if (issue === 'Keeping up with Technology') {
              issue2[0]++;
            } else if (issue === 'Time Estimation') {
              issue3[0]++;
            } else if (issue === 'Communication with others') {
              issue4[0]++;
            } else if (issue === 'Security Threats') {
              issue5[0]++;
            }
          })
        } else if (report.date >= '2018-07-01' && report.date <= '2018-07-31') {
          report.issues.map(issue => {
            if (issue === 'Hard for Debugging') {
              issue1[1]++;
            } else if (issue === 'Keeping up with Technology') {
              issue2[1]++;
            } else if (issue === 'Time Estimation') {
              issue3[1]++;
            } else if (issue === 'Communication with others') {
              issue4[1]++;
            } else if (issue === 'Security Threats') {
              issue5[1]++;
            }
          })
        } else if (report.date >= '2018-08-01' && report.date <= '2018-08-31') {
          report.issues.map(issue => {
            if (issue === 'Hard for Debugging') {
              issue1[2]++;
            } else if (issue === 'Keeping up with Technology') {
              issue2[2]++;
            } else if (issue === 'Time Estimation') {
              issue3[2]++;
            } else if (issue === 'Communication with others') {
              issue4[2]++;
            } else if (issue === 'Security Threats') {
              issue5[2]++;
            }
          })
        } else {
          report.issues.map(issue => {
            if (issue === 'Hard for Debugging') {
              issue1[3]++;
            } else if (issue === 'Keeping up with Technology') {
              issue2[3]++;
            } else if (issue === 'Time Estimation') {
              issue3[3]++;
            } else if (issue === 'Communication with others') {
              issue4[3]++;
            } else if (issue === 'Security Threats') {
              issue5[3]++;
            }
          })
        }
      })

    let index = [0, 1, 2, 3, 4];
    let newState = update(this.state, {
      data: {
        datasets: {
          [index[0]]: {
            data: {$set: issue1}
          },
          [index[1]]: {
            data: {$set: issue2}
          },
          [index[2]]: {
            data: {$set: issue3}
          },
          [index[3]]: {
            data: {$set: issue4}
          },
          [index[4]]: {
            data: {$set: issue5}
          },
        }
      }
    });
    this.setState(newState);
  }

  render() {

    return (
      <Card
        className="border-0 shadow-sm"
        style={{borderRadius: '0'}}
      >
        <CardBody>
          <Line
            data={this.state.data}
            options={{
              title: {
                display: this.props.displayTitle,
                fontSize: 25,
                text: 'Issues of reports changing by time'
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

export default IssueLine;
