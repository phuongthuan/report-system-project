import React, { Component } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Pie } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
import count from '../../../utils/count';

class EmotionPie extends Component {

  static defaultProps = {
    displayName: 'Pie Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  state = {
    dataSource: this.props.dataSource,
    issues: [],
    data: {
      labels: [
        'Positive',
        'Negative',
        'Other'
      ],
      datasets: [
        {
          data: [300, 100, 200],
          backgroundColor: [
            '#109618',
            '#DC3912',
            '#3366cc'
          ],
          hoverBackgroundColor: [
            '#109618',
            '#DC3912',
            '#3366cc'
          ],
          borderWidth: 2
        }
      ]
    }
  }

  componentDidMount() {
    const {dataSource} = this.props;

    const emotions = [];

    dataSource.map(report => {
      const emoji = report.emotion.id;
      if ((emoji === 'smiley')
        || (emoji === 'heart_eyes')
        || (emoji === 'stuck_out_tongue_winking_eye')
        || (emoji === 'laughing')) {
        const positive = 'Positive';
        emotions.push(positive);
      } else if ((emoji === 'white_frowning_face')
        || (emoji === 'disappointed')
        || (emoji === 'worried')) {
        const negative = 'Negative';
        emotions.push(negative);
      } else {
        const other = 'Other';
        emotions.push(other);
      }
    });

    console.log(count(emotions));

    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: count(emotions)}
          }
        ]
      }
    });

    this.setState(newState);
  }

  componentWillReceiveProps(nextProps, state) {
    const emotions = [];
    nextProps.dataSource.map(report => {
      const emoji = report.emotion.id;

      if ((emoji === 'smiley')
        || (emoji === 'heart_eyes')
        || (emoji === 'stuck_out_tongue_winking_eye')
        || (emoji === 'laughing')) {
        const positive = 'Positive';
        emotions.push(positive);
      } else if ((emoji === 'white_frowning_face')
        || (emoji === 'disappointed')
        || (emoji === 'worried')) {
        const negative = 'Negative';
        emotions.push(negative);
      } else {
        const other = 'Other';
        emotions.push(other);
      }
    });

    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: count(emotions)}
          }
        ]
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
          <Pie
            data={this.state.data}
            options={{
              title: {
                display: this.props.displayTitle,
                text: 'Emotion of reports',
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

EmotionPie.propTypes = {};

export default EmotionPie;
