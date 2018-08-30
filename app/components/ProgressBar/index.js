import React, { PureComponent } from 'react';
import { Progress } from 'reactstrap'
import { Emoji } from 'emoji-mart';

class ProgressBar extends PureComponent {

  state = {
    positive: 50,
    negative: 50
  }

  componentDidMount() {
    const {data} = this.props;

    var positive = 0;
    var negative = 0;

    data
      .map(report => {
        const emoji = report.emotion.id;

        if ((emoji === 'smiley')
          || (emoji === 'stuck_out_tongue_winking_eye')
          || (emoji === 'laughing')) {
          positive++;
        }

        if ((emoji === 'white_frowning_face')
          || (emoji === 'disappointed')
          || (emoji === 'worried')) {
          negative++;
        }
      });

    const positivePercent = Math.round((positive * 100 / (positive + negative)) * 100) / 100;
    const negativePercent = Math.round((negative * 100 / (positive + negative)) * 100) / 100;

    this.setState({
      positive: positivePercent,
      negative: negativePercent
    });
  }

  componentWillReceiveProps(nextProps) {

    var positive = 0;
    var negative = 0;

    nextProps.data
      .map(report => {
        const emoji = report.emotion.id;

        if ((emoji === 'smiley')
          || (emoji === 'stuck_out_tongue_winking_eye')
          || (emoji === 'laughing')) {
          positive++;
        }

        if ((emoji === 'white_frowning_face')
          || (emoji === 'disappointed')
          || (emoji === 'worried')) {
          negative++;
        }
      });

    const positivePercent = Math.round((positive * 100 / (positive + negative)) * 100) / 100;
    const negativePercent = Math.round((negative * 100 / (positive + negative)) * 100) / 100;

    this.setState({
      positive: positivePercent,
      negative: negativePercent
    });
  }

  render() {
    const {positive, negative} = this.state;
    return (
      <div className="text-center">
        <Progress multi>
          <Progress bar color="success" value={positive}>{positive} %</Progress>
          <Progress bar color="danger" value={negative}>{negative} %</Progress>
        </Progress>
        <small className="text-muted">
          Emotion: Positive <Emoji set={'emojione'} emoji=':smiley:' size={16}/> / Negative <Emoji set={'emojione'}
                                                                                                   emoji=':worried:'
                                                                                                   size={16}/>
        </small>
      </div>
    );
  }
}

ProgressBar.propTypes = {};

export default ProgressBar;
