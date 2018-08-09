import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Emoji } from 'emoji-mart';
import {
  ListItem,
  TablePagination,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { Button, Modal } from 'antd'
import Chip from '../Chip/index'

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
    borderRadius: '0'
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ReportTable extends Component {

  state = {
    data: this.props.data,
    page: 0,
    rowsPerPage: 10,
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
    const {classes, user, match} = this.props;
    const {data, rowsPerPage, page} = this.state;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CustomTableHead>
              <CustomTableRow>
                <CustomTableCell>ID</CustomTableCell>
                <CustomTableCell>Emotion</CustomTableCell>
                <CustomTableCell>Title</CustomTableCell>
                {user && user.role === 'team_leader' && (
                  <CustomTableCell>Author</CustomTableCell>
                )}
                <CustomTableCell>Date created</CustomTableCell>
                {user && user.role === 'member' && (
                  <CustomTableCell>Actions</CustomTableCell>
                )}

              </CustomTableRow>
            </CustomTableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(report => {
                return (
                  <CustomTableRow key={report.id}>
                    <CustomTableCell>{report.id}</CustomTableCell>
                    <CustomTableCell>
                      <Emoji
                        tooltip
                        set={'emojione'}
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
                );
              })}
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
