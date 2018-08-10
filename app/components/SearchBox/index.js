import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

class SearchBox extends Component {

  handleChange = e => {
    const {onChange} = this.props;
    const query = e.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      onChange(query);
    }, 300);
  }

  render() {
    return (
      <Search
        placeholder="Search..."
        onChange={this.handleChange}
        style={{width: 200}}
      />
    );
  }
}

SearchBox.propTypes = {};

export default SearchBox;
