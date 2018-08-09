import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { Badge } from 'reactstrap'
import { Button, Modal } from 'antd'
import Chip from '../Chip/index'
import RemindModal from '../RemindModal/index'

const confirm = Modal.confirm;
const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    paddingRight: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
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

class MemberTable extends Component {

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
    const {classes, user, match, addFlashMessage, createMessage} = this.props;
    const {data, rowsPerPage, page} = this.state;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CustomTableHead>
              <CustomTableRow>
                <CustomTableCell>ID</CustomTableCell>
                <CustomTableCell>Information</CustomTableCell>
                <CustomTableCell>Address</CustomTableCell>
                <CustomTableCell>Phone</CustomTableCell>
                <CustomTableCell>Actions</CustomTableCell>

              </CustomTableRow>
            </CustomTableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(member => {
                return (
                  <CustomTableRow key={member.id}>
                    <CustomTableCell>{member.id}</CustomTableCell>

                    <CustomTableCell padding="none" scope="row">
                      <Chip
                        history={this.props.history}
                        userInfo={member}
                      />
                      <Badge
                        color="light"
                      >
                        {
                          (() => {
                            switch (member.role) {
                              case "member":
                                return "Member";
                              case "team_leader":
                                return "Team leader";
                              case "group_leader":
                                return "Group leader";
                              default:
                                return "Member";
                            }
                          })()
                        }
                      </Badge>
                      <Badge
                        color="success"
                      >
                        {member.division}
                      </Badge>
                    </CustomTableCell>

                    <CustomTableCell component="th" scope="row">
                      {member.address}
                    </CustomTableCell>

                    <CustomTableCell component="th" scope="row">
                      {member.phone}
                    </CustomTableCell>

                    <CustomTableCell component="th" scope="row">
                      <RemindModal
                        addFlashMessage={addFlashMessage}
                        createMessage={createMessage}
                        member={member}
                        user={user}
                      />
                    </CustomTableCell>
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

MemberTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberTable);
