import React, { Component } from 'react';
import './index.css';

export class Card extends Component {
  render() {
    return(
      <div className='card'>
        <h1>Año Elegido: { this.props.year }</h1>
        <h3>IDH Promedio del Año: { this.props.prom }</h3>
        <h3>IDH Máximo: { this.props.max }</h3>
        <h3>IDH Mínimo: { this.props.min }</h3>
      </div>
    );
  }
}
