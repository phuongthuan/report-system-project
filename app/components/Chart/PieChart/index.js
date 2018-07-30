import React, { Component } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Pie } from 'react-chartjs-2'

class PieChart extends Component {

  static defaultProps = {
    displayName: 'Pie Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
  }

  state = {
    dataSource: this.props.dataSource,
    issues: [],
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

    // Update state using immutability-helper:
    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: this.count(issues)}
          }
        ]
      }
    });

    this.setState(newState);
  }

  componentWillReceiveProps(nextProps, state) {
    const issues = [];
    nextProps.dataSource.map(report => {
      report.issues.map(issue =>
        issues.push(issue)
      );
    });

    // Update state using immutability-helper:
    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: this.count(issues)}
          }
        ]
      }
    });
    this.setState(newState);
  }

  count = (arrays) => {
    arrays.sort();
    var results = [];
    var current = null;
    var cnt = 0;
    for (var i = 0; i < arrays.length; i++) {
      if (arrays[i] !== current) {
        if (cnt > 0) {
          results.push(cnt);
        }
        current = arrays[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      results.push(cnt);
    }
    return results;
  }

  render() {
    console.log('render', this.props.dataSource);
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
                text: 'Issues of reports',
                fontSize: 25
              },
              cutoutPercentage: 10,
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

export default PieChart;
