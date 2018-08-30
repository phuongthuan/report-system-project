import React, { PureComponent } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Pie } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

class EmotionPie extends PureComponent {

  static defaultProps = {
    displayName: 'Pie Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  state = {
    dataSource: [],
    title: 'Emotions of reports',
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
    var results = [];
    if (positiveEmotions.length === 0) {
      results = [negativeEmotions.length, otherEmotions.length];
    } else if (negativeEmotions.length === 0) {
      results = [positiveEmotions.length, otherEmotions.length];
    } else {
      results = [positiveEmotions.length, negativeEmotions.length];
    }

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

  static getDerivedStateFromProps(props, state) {

    const positiveEmotions = [];
    const negativeEmotions = [];
    const otherEmotions = [];

    const title = props.action
      ? `Emotions of reports on (${props.action})`
      : 'Emotions of reports';

    props.dataSource.map(report => {
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

    var results = [];
    if (positiveEmotions.length === 0) {
      results = [negativeEmotions.length, otherEmotions.length];
    } else if (negativeEmotions.length === 0) {
      results = [positiveEmotions.length, otherEmotions.length];
    } else {
      results = [positiveEmotions.length, negativeEmotions.length];
    }

    let newState = update(state, {
      data: {
        datasets: [
          {
            data: {$set: results}
          }
        ]
      }
    });

    return {
      dataSource: newState,
      title: title
    };
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

export default EmotionPie;
