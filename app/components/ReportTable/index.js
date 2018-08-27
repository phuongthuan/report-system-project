import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Emoji } from 'emoji-mart';
import isEmpty from 'lodash/isEmpty'
import {
  Paper,
  Table,
  TableBody,
  TableSortLabel,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { Button, Modal } from 'antd'
import Chip from '../Chip/index'
import SearchBox from "../SearchBox";
import DatePickerComponent from "../DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../DateTimePicker/RangePickerComponent";
import Download from "../Download";

const confirm = Modal.confirm;
const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    paddingRight: 0,
    paddingLeft: 10
  },
  head: {
    paddingRight: 0,
    paddingLeft: 10
  }
}))(TableCell);
const CustomTableRow = withStyles(theme => ({
  root: {},
}))(TableRow);
const CustomTableHead = withStyles(theme => ({
  root: {
    padding: 0
  },
}))(TableHead);
const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: 0
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (typeof a[orderBy] === 'number')
      ? b[orderBy] - a[orderBy]
      : (a[orderBy].toUpperCase() > b[orderBy].toUpperCase()) ? -1 : (a[orderBy].toUpperCase() < b[orderBy].toUpperCase()) ? 1 : 0
    : (a, b) => (typeof a[orderBy] === 'number')
      ? a[orderBy] - b[orderBy]
      : (a[orderBy].toUpperCase() < b[orderBy].toUpperCase()) ? -1 : (a[orderBy].toUpperCase() > b[orderBy].toUpperCase()) ? 1 : 0
}

class ReportTable extends Component {

  state = {
    data: this.props.data,
    searchTerm: '',
    page: 0,
    rowsPerPage: 15,
    order: 'asc',
    orderBy: 'title',
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  get emptyRows() {
    const {data, rowsPerPage, page} = this.state;
    return (rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage));
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({order, orderBy});
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  updateSearchTerm = (searchTerm) => {
    this.setState({searchTerm});
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

  navigate = (url) => {
    const {history} = this.props;
    history.push(url);
  }

  render() {

    const {
      classes,
      user,
      match,
      fetchAllReportsOfUserByDay,
      fetchAllReportsOfUserByRange,

      fetchAllReportsOfTeamByRange,
      fetchAllReportsOfTeamByDay,
      actionChange

    } = this.props;

    const {data, rowsPerPage, page, searchTerm, order, orderBy} = this.state;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>

          <div className="card border-0">
            <div className="col-md-12 card-body d-flex justify-content-between">

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

          <Table className={classes.table}>
            <CustomTableHead>
              <CustomTableRow>
                <CustomTableCell
                  sortDirection={orderBy === 'id' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={order}
                    onClick={this.createSortHandler('id')}
                  >
                    ID
                  </TableSortLabel>
                </CustomTableCell>

                <CustomTableCell>Emotion</CustomTableCell>
                <CustomTableCell
                  sortDirection={orderBy === 'title' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'title'}
                    direction={order}
                    onClick={this.createSortHandler('title')}
                  >
                    Title
                  </TableSortLabel>
                </CustomTableCell>

                {user && user.role === 'team_leader' && (
                  <CustomTableCell>Author</CustomTableCell>
                )}


                <CustomTableCell
                  sortDirection={orderBy === 'date' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={order}
                    onClick={this.createSortHandler('date')}
                  >
                    Date
                  </TableSortLabel>
                </CustomTableCell>

                {user && user.role === 'member' && (
                  <CustomTableCell>Actions</CustomTableCell>
                )}
              </CustomTableRow>
            </CustomTableHead>
            <TableBody>
              {data
                .filter(report =>
                  (report.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  || (report.date.toLowerCase().includes(searchTerm.toLowerCase()))
                  || (report.emotion.id.includes(searchTerm.toLowerCase()))
                )
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(report => (
                  <CustomTableRow key={report.id}>
                    <CustomTableCell>{report.id}</CustomTableCell>

                    <CustomTableCell>
                      <Emoji
                        tooltip
                        set="emojione"
                        emoji={report.emotion.colons}
                        size={24}
                      />
                    </CustomTableCell>

                    <CustomTableCell component="th" scope="row">
                      <Link to={`/report/${report.id}`}>
                        {report.title}
                      </Link>
                    </CustomTableCell>

                    {user && user.role === 'team_leader' && (
                      <CustomTableCell padding="none" scope="row">
                        <Chip
                          history={this.props.history}
                          userInfo={report.userId}
                        />
                      </CustomTableCell>
                    )}

                    <CustomTableCell component="th" scope="row">
                      {report.date}
                    </CustomTableCell>

                    {user && user.role === 'member' && (
                      <CustomTableCell component="th" scope="row">
                        <div className="d-flex">
                          <Button
                            onClick={() => this.navigate(`${match.url}/update/${report.id}`)}
                            icon="edit"
                            className="mr-1"
                          />
                          <Button
                            onClick={() => this.showConfirm(report.id)}
                            type="danger"
                            icon="delete"
                          />
                        </div>
                      </CustomTableCell>
                    )}
                  </CustomTableRow>
                ))}
              {this.emptyRows > 0 && (
                <TableRow style={{height: 48 * this.emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ReportTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportTable);
