import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Emoji } from 'emoji-mart';
import {
  ListItem,
  TablePagination,
  ListItemText,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    paddingRight: 0,
  },
  head: {
    paddingRight: 0,
  }
}))(TableCell);

const CustomTableRow = withStyles(theme => ({
  root: {},
}))(TableRow);

const CustomTableHead = withStyles(theme => ({
  root: {
    padding: '0'
  },
}))(TableHead);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
    data: this.props.reportsList,
    page: 0,
    rowsPerPage: 10,
  }

  componentWillReceiveProps(nextProps, state) {
    this.setState({ data: nextProps.reportsList });
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  render() {
    const {classes, user} = this.props;
    const {data, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <EnhancedTableToolbar user={user} />
          <Table className={classes.table}>
            <CustomTableHead>
              <CustomTableRow>
                <CustomTableCell>ID</CustomTableCell>
                <CustomTableCell>Emotion</CustomTableCell>
                <CustomTableCell>Title</CustomTableCell>
                <CustomTableCell>Author</CustomTableCell>
                <CustomTableCell>Date created</CustomTableCell>
              </CustomTableRow>
            </CustomTableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(report => {
                return (
                  <CustomTableRow key={report.id}>
                    <CustomTableCell>{report.id}</CustomTableCell>
                    <CustomTableCell>
                      <Emoji set={'emojione'} emoji={report.emotion.colons} size={24}/>
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {report.title}
                    </CustomTableCell>
                    <CustomTableCell padding="none" component="th" scope="row">
                      <ListItem>
                        <Avatar alt="Avatar image" src={report.userId.avatar}/>
                        <ListItemText>{report.userId.firstName}</ListItemText>
                      </ListItem>
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {report.date}
                    </CustomTableCell>
                  </CustomTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
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
