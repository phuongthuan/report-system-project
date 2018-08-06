import React, { Component } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Line } from 'react-chartjs-2'

class EmotionLine extends Component {

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
          label: 'Positive',
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
          label: 'Negative',
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
          label: 'Other',
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
        }
      ]
    }
  }

  componentDidMount() {
    const {dataSource} = this.props;
    const positiveEmotions = [0, 0, 0, 0];
    const negativeEmotions = [0, 0, 0, 0];
    const otherEmotions = [0, 0, 0, 0];

    dataSource
      .map(report => {
        if (report.date >= '2018-06-01' && report.date <= '2018-06-31') {
          const emoji = report.emotion.id;
          if ((emoji === 'smiley')
            || (emoji === 'stuck_out_tongue_winking_eye')
            || (emoji === 'laughing')) {
            positiveEmotions[0]++;
          } else if ((emoji === 'white_frowning_face')
            || (emoji === 'disappointed')
            || (emoji === 'worried')) {
            negativeEmotions[0]++;
          } else {
            otherEmotions[0]++;
          }
        } else if (report.date >= '2018-07-01' && report.date <= '2018-07-31') {
          const emoji = report.emotion.id;
          if ((emoji === 'smiley')
            || (emoji === 'stuck_out_tongue_winking_eye')
            || (emoji === 'laughing')) {
            positiveEmotions[1]++;
          } else if ((emoji === 'white_frowning_face')
            || (emoji === 'disappointed')
            || (emoji === 'worried')) {
            negativeEmotions[1]++;
          } else {
            otherEmotions[1]++;
          }
        } else if (report.date >= '2018-08-01' && report.date <= '2018-08-31') {
          const emoji = report.emotion.id;
          if ((emoji === 'smiley')
            || (emoji === 'stuck_out_tongue_winking_eye')
            || (emoji === 'laughing')) {
            positiveEmotions[2]++;
          } else if ((emoji === 'white_frowning_face')
            || (emoji === 'disappointed')
            || (emoji === 'worried')) {
            negativeEmotions[2]++;
          } else {
            otherEmotions[2]++;
          }
        } else {
          const emoji = report.emotion.id;
          if ((emoji === 'smiley')
            || (emoji === 'stuck_out_tongue_winking_eye')
            || (emoji === 'laughing')) {
            positiveEmotions[3]++;
          } else if ((emoji === 'white_frowning_face')
            || (emoji === 'disappointed')
            || (emoji === 'worried')) {
            negativeEmotions[3]++;
          } else {
            otherEmotions[3]++;
          }
        }
      })

    // emotion of June:
    let index = [0, 1, 2];
    let newState = update(this.state, {
      data: {
        datasets: {
          [index[0]]: {
            data: {$set: positiveEmotions}
          },
          [index[1]]: {
            data: {$set: negativeEmotions}
          },
          [index[2]]: {
            data: {$set: otherEmotions}
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
                text: 'Emotions of reports changing by time'
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

EmotionLine.propTypes = {};

export default EmotionLine;
