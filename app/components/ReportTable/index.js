import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import { Table, Tag, Button, Modal } from 'antd';
import { Emoji } from 'emoji-mart';
import issuesType from '../../constants/issuesType'
import SearchBox from "../SearchBox";
import DatePickerComponent from "../DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../DateTimePicker/RangePickerComponent";
import Download from "../Download";
import Chip from '../Chip/index'

const confirm = Modal.confirm;
const {Column} = Table;

class ReportTable extends PureComponent {

  state = {
    searchTerm: '',
    data: [],
  }

  static getDerivedStateFromProps(props) {
    return {
      data: props.data.map(report => ({
        key: uuidv1(),
        id: report.id,
        emotion: report.emotion,
        title: report.title,
        issues: report.issues.map(issue => issue),
        userId: report.userId,
        date: report.date
      }))
    };
  }

  navigate = (url) => {
    const {history} = this.props;
    history.push(url);
  }

  showConfirm = (id) => {
    const {addFlashMessage, deleteReport} = this.props;
    confirm({
      title: 'Do you want to delete this report?',
      content: 'When clicked the OK button, this report will be delete immediately',
      onOk() {
        deleteReport(id);
        addFlashMessage({
          type: 'success',
          text: 'Report Report has been deleted.'
        });
      },
      onCancel() {
      },
    });
  }

  updateSearchTerm = (searchTerm) => {
    this.setState({searchTerm});
  }

  render() {

    const {
      data,
      user,
      history,
      match,
      fetchAllReportsOfUserByDay,
      fetchAllReportsOfUserByRange,

      fetchAllReportsOfTeamByRange,
      fetchAllReportsOfTeamByDay,
      actionChange
    } = this.props;

    const {searchTerm} = this.state;

    const reportsFilter = data.filter(report =>
      (report.title.toLowerCase().includes(searchTerm.toLowerCase()))
      || (report.date.toLowerCase().includes(searchTerm.toLowerCase()))
      || (report.emotion.id.includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="w-100">
        <div style={{borderRadius: 0}} className="card border-0">
          <div className="card-body d-flex justify-content-between">
            <SearchBox
              searchTerm={searchTerm}
              onChange={this.updateSearchTerm}
            />

            <DatePickerComponent
              {...this.props}
              actionChange={actionChange}
              user={user}
              fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
              fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
            />

            <RangePickerComponent
              {...this.props}
              actionChange={actionChange}
              user={user}
              fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
              fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
            />

            <Download
              user={user}
              data={data}
            />
          </div>
        </div>

        <Table
          rowKey="id"
          style={{width: '100%', backgroundColor: '#FFFFFF'}}
          dataSource={reportsFilter}
          pagination={{pageSize: 13}}
          size="middle"
        >
          <Column
            title="ID"
            dataIndex="id"
            key="id"
            sorter={(a, b) => a.id - b.id}
          />

          <Column
            title="Emotion"
            dataIndex="emotion"
            key="emotion"
            render={(emoji) => (
              <Emoji
                tooltip
                set="emojione"
                emoji={emoji.colons}
                size={24}
              />
            )}
          />

          <Column
            title="Title"
            dataIndex="title"
            key="title"
            render={(text, record) => (
              <Link to={`/report/${record.id}`}>
                {text}
              </Link>)
            }
            sorter={(a, b) => {
              const textA = a.title.toUpperCase();
              const textB = b.title.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }}
          />

          <Column
            title="Issues"
            dataIndex="issues"
            key="issues"
            render={tags => (
              <span>
                {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
              </span>
            )}
            filters={issuesType.map(issue => ({
              text: issue,
              value: issue
            }))}
            onFilter={(value, record) => record.issues.includes(value)}
          />

          {user && user.role === 'team_leader' && (
            <Column
              title="Author"
              dataIndex="userId"
              key="userId"
              render={(userInfo) => (
                <Chip
                  userInfo={userInfo}
                  history={history}
                />
              )}
            />)
          }

          <Column
            title="Date"
            dataIndex="date"
            key="date"
            sorter={(a, b) => {
              const textA = a.date.toUpperCase();
              const textB = b.date.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }}
          />

          {user && user.role === 'member' && (
            <Column
              title="Action"
              dataIndex="action"
              key="action"
              render={(text, record) => (
                <span>
                  <Button
                    onClick={() => this.navigate(`${match.url}/update/${record.id}`)}
                    icon="edit"
                    className="mr-1"
                  />
                  <Button
                    onClick={() => this.showConfirm(record.id)}
                    type="danger"
                    icon="delete"
                  />
                </span>
              )}
            />)
          }
        </Table>
      </div>
    );
  }
}

ReportTable.propTypes = {};

export default ReportTable;
