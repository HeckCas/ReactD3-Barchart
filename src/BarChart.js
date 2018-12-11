import React, { Component } from 'react';
import * as d3 from 'd3';
import './index.css';

class BarChart extends Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {

    const dataset = this.props.data;
    let svgWidth = 550;
    let svgHeight = 350;
    let barPadding = 5;
    let barWidth = (svgWidth / dataset.length);

    let svg =   d3.select('#d3-content')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'svg-layout');


      let barChart = svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar-layout')
        .attr( 'y', function(d) { return  svgHeight - d } )
        .attr( 'height', (d) => d )
        .attr( 'width', barWidth - barPadding )
        .attr( 'x', (d, i) => { return barWidth * i });

      let barValue = svg.selectAll("text")
        .data(dataset)
        .enter()
        .append( "text" )
        .text( (d) => `Value: ${ d }` )
        .attr( 'class', 'bar-text')
        .attr ('color', 'white')
        .attr( "y", function(d) { return ( svgHeight - d ) - 3 })
        .attr( 'x', (d, i) => { return barWidth * i });
  }

  render() {
    return <div></div>
  }
}

export default BarChart;
