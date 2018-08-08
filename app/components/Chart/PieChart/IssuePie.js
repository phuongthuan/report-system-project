import React, { Component } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Pie } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
import count from '../../../utils/count'

class IssuePie extends Component {

  static defaultProps = {
    displayName: 'Pie Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  state = {
    dataSource: this.props.dataSource,
    title: 'Issues of reports',
    data: {
      labels: [
        'Hard for Debugging',
        'Keeping up with Technology',
        'Communication with others',
        'Time Estimation',
        'Security Threats'
      ],
      datasets: [
        {
          data: [300, 100, 200, 50, 100],
          backgroundColor: [
            '#990099',
            '#3366cc',
            '#109618',
            '#DC3912',
            '#FF9900'
          ],
          hoverBackgroundColor: [
            '#990099',
            '#3366cc',
            '#109618',
            '#DC3912',
            '#FF9900'
          ],
          borderWidth: 2
        }
      ]
    }
  }

  componentDidMount() {
    const {dataSource} = this.props;
    const issues = [];

    dataSource.map(report => {
      report.issues.map(issue =>
        issues.push(issue)
      );
    });
    const results = count(issues);
    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: results}
          }
        ]
      }
    });
    this.setState(newState);
  }

  componentWillReceiveProps(nextProps) {
    const issues = [];
    const title = nextProps.action
      ? `Issues of reports on (${nextProps.action})`
      : 'Issues of reports';

    nextProps.dataSource.map(report => {
      report.issues.map(issue =>
        issues.push(issue)
      );
    });
    const results = count(issues);
    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: results}
          }
        ]
      }
    });
    this.setState(newState);
    this.setState({title});
  }

  render() {
    return (
      <Card
        className="border-0 shadow-sm"
        style={{borderRadius: '0'}}
      >
        <CardBody>
          <Pie
            data={this.state.data}
            options={{
              title: {
                display: this.props.displayTitle,
                text: this.state.title,
                fontSize: 25
              },
              cutoutPercentage: 10,
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              },
              responsive: true,
              plugins: {
                datalabels: {
                  color: 'white'
                }
              }
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

export default IssuePie;
