import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal } from 'antd'
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

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

class DataTables extends Component {

  state = {
    data: this.props.data,
    page: 0,
    rowsPerPage: 10,
  }

  componentWillReceiveProps(nextProps, state) {
    this.setState({data: nextProps.data});
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  showConfirm = (id) => {
    const {addFlashMessage, removeWeeklyReport} = this.props;
    confirm({
      title: 'Do you want to delete this weekly report?',
      content: 'When clicked the OK button, this weekly report will be delete immediately',
      onOk() {
        removeWeeklyReport(id);
        addFlashMessage({
          type: 'success',
          text: 'Weekly Report Report has been deleted.'
        });
      },
      onCancel() {
      },
    });
  }

  render() {
    const {classes} = this.props;
    const {data, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CustomTableHead>
              <CustomTableRow>
                <CustomTableCell>ID</CustomTableCell>
                <CustomTableCell>Issue</CustomTableCell>
                <CustomTableCell>Solution</CustomTableCell>
                <CustomTableCell>Summary</CustomTableCell>
                <CustomTableCell>Date created</CustomTableCell>
                <CustomTableCell>Actions</CustomTableCell>
              </CustomTableRow>
            </CustomTableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(wr => {
                return (
                  <CustomTableRow key={wr.id}>
                    <CustomTableCell>{wr.id}</CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {wr.issue}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {wr.summary}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {wr.solution}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {wr.date}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      <Button
                        onClick={() => this.showConfirm(wr.id)}
                        type="danger"
                        icon="delete"
                      />
                    </CustomTableCell>
                  </CustomTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{height: 48 * emptyRows}}>
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

DataTables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTables);
