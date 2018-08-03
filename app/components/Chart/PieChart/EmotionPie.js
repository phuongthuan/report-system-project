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
          data: [100, 100, 50],
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

    const positiveEmotions = [];
    const negativeEmotions = [];
    const otherEmotions = [];

    dataSource.map(report => {
      const emoji = report.emotion.id;
      if ((emoji === 'smiley')
        || (emoji === 'stuck_out_tongue_winking_eye')
        || (emoji === 'laughing')) {
        const positive = 'Positive';
        positiveEmotions.push(positive);
      } else if ((emoji === 'white_frowning_face')
        || (emoji === 'disappointed')
        || (emoji === 'worried')) {
        const negative = 'Negative';
        negativeEmotions.push(negative);
      } else {
        const other = 'Other';
        otherEmotions.push(other);
      }
    });
    const results = [positiveEmotions.length, negativeEmotions.length, otherEmotions.length];
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

  componentWillReceiveProps(nextProps, state) {
    const positiveEmotions = [];
    const negativeEmotions = [];
    const otherEmotions = [];

    nextProps.dataSource.map(report => {
      const emoji = report.emotion.id;
      if ((emoji === 'smiley')
        || (emoji === 'stuck_out_tongue_winking_eye')
        || (emoji === 'laughing')) {
        const positive = 'Positive';
        positiveEmotions.push(positive);
      } else if ((emoji === 'white_frowning_face')
        || (emoji === 'disappointed')
        || (emoji === 'worried')) {
        const negative = 'Negative';
        negativeEmotions.push(negative);
      } else {
        const other = 'Other';
        otherEmotions.push(other);
      }
    });
    const results = [positiveEmotions.length, negativeEmotions.length, otherEmotions.length];
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
