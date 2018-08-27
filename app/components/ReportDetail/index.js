import React, { Component, Fragment } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  GooglePlusShareButton,
  GooglePlusIcon,
  GooglePlusShareCount
} from 'react-share'
import isEmpty from 'lodash/isEmpty'
import moment from "moment/moment";
import { Emoji } from 'emoji-mart';
import { Button } from 'antd'
import {
  Card, CardSubtitle, CardBody, CardHeader, CardTitle, CardFooter
} from 'reactstrap';
import Spinner from "../Spinner";
import Chip from '../Chip/index'

class ReportDetail extends Component {

  get emoji() {
    const {report} = this.props;
    return report.emotion.colons;
  }

  navigate = (url) => {
    const {history} = this.props;
    history.push(url);
  }

  render() {
    const {report} = this.props;
    const {emotion, userId, issues} = report;
    const shareUrl = 'http://github.com';
    const title = 'Report System';
    return (
      <Fragment>
        {isEmpty(report) && isEmpty(emotion) && isEmpty(userId) ? (
          <Spinner/>
        ) : (
          <Card
            className="mb-4 border-0 shadow-sm"
            style={{borderRadius: '0'}}
          >
            <CardHeader>
              <CardTitle>
                Report Detail
              </CardTitle>
            </CardHeader>

            <CardBody>
              <div className="row">
                <div className="col-md-4">
                  <CardSubtitle className="mb-3">Reported by</CardSubtitle>
                  <Chip
                    {...this.props}
                    userInfo={userId}
                  />
                  <br/>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <CardSubtitle className="mb-3">Title</CardSubtitle>
                      <p>
                        {report.title}
                      </p>
                    </div>
                  </div>
                  <hr/>

                  <div className="row">
                    <div className="col-md-12">
                      <CardSubtitle className="mb-3">Emotion</CardSubtitle>
                      <Emoji tooltip set={'emojione'} emoji={this.emoji} size={24}/>
                    </div>
                  </div>
                  <hr/>

                  <div className="row">
                    <div className="col-md-12">
                      <CardSubtitle className="mb-3">Achievement</CardSubtitle>
                      <p>
                        {report.achievement}
                      </p>
                    </div>
                  </div>
                  <hr/>

                  <div className="row">
                    <div className="col-md-12">
                      <CardSubtitle className="mb-3">Issues</CardSubtitle>
                      {issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </div>
                  </div>

                  <hr/>

                  <div className="row">
                    <div className="col-md-12">
                      <CardSubtitle className="mb-3">Comment</CardSubtitle>
                      <p>
                        {report.comment}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <CardSubtitle className="mb-3">Date Created</CardSubtitle>
                      <small className="text-muted">
                        {moment(report.date).format("dddd, MMMM Do YYYY")}
                      </small>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <small>
                        <FacebookShareButton
                          url={shareUrl}
                          quote={title}
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon
                            size={24}
                            round
                          />
                        </FacebookShareButton>

                        <FacebookShareCount
                          url={shareUrl}
                          className="Demo__some-network__share-count"
                        >
                          {count => count}
                        </FacebookShareCount>

                        <GooglePlusShareButton
                          url={shareUrl}
                          className="Demo__some-network__share-button"
                        >
                          <GooglePlusIcon
                            size={24}
                            round
                          />
                        </GooglePlusShareButton>

                        <GooglePlusShareCount
                          url={shareUrl}
                          className="Demo__some-network__share-count"
                        >
                          {count => count}
                        </GooglePlusShareCount>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                icon="rollback"
                type="primary"
                onClick={() => this.navigate('/report')}
              >
                Back
              </Button>
            </CardFooter>
          </Card>
        )}
      </Fragment>
    );
  }
}

export default ReportDetail;
