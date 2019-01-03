import React, { Component } from 'react';

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
     const value = e.target.value;
     this.props.onChange(value);
  }
  render() {
    let opcion = this.props.data;
    return (
      <select onChange={ this.handleChange } onChange={ this.isBoolan }>
        {opcion.map(n => <option value={ n }>{ n }</option>)}
      </select>
    );
  }
}
