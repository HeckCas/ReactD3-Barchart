import React, { Component } from 'react';
import * as d3 from 'd3';
import './index.css';

let dataset, xScale, yScale;
let xDomain, yDomain, svg;
let margin = {top: 20, right: 20, bottom: 200, left: 60},
width = 1000 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

export class BarChart extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  tipoOrdenamiento() {
    switch (this.props.orden) {
      case 'Ascendente': // Ordenar IDH del menor al mayor
        dataset[1].sort(function(a, b){return a > b ? 1 : -1});
        break;

      case 'Descendente': // Ordenar IDH del mayor al menor
        dataset[1].sort(function(a, b){return b > a ? 1 : -1});
        break;

      case 'Alfabéticamente': // Ordenar alfabéticamente los nombres de estados
        dataset[1].sort();
        break;

      default: // Alfabéticamente por defecto
        dataset[1].sort();
        break;
    }
    console.log(this.props.orden);
    
  }

  drawChart() {
    dataset = this.props.data; //Info para el dataset, pasados desde el componente App.js
    //Drawing the chart
    svg =  d3.select('#d3-content')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.bottom + margin.top)

  //  Dominios X y Y

   xDomain = (dataset.map(function (d) { return d[0] }));
   yDomain = ([0, parseFloat(d3.max(dataset, function (d) {return d[1] }))]);

  //Ahora las escalas

   xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, width]);
   yScale = d3.scaleLinear().domain(yDomain).rangeRound([height,0]);
   //xAxis
   svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${ margin.left }, ${ margin.top + height })`)
      .call(d3.axisBottom( xScale ))
  .selectAll("text")
      .attr("y", 7)
      .attr("x", -5)
      .attr("dy", '.35em')
      .attr("transform", 'rotate(-45)')
      .style("text-anchor", 'end')
      .attr("class", "bar-text")
      //yAxis
   svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${ margin.left }, ${ margin.top })`)
      .call(d3.axisLeft(yScale))
      .attr("class", "bar-text")

    }

  reDrawChart() {
  d3.select('svg').remove();
  this.drawChart();
  const bars = svg.append("g").attr("class", "bars")
        .attr('transform', `translate(${ margin.left }, 20)`)
  const update = bars.selectAll('.bar')
        .data(dataset)

    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('height', 0 )
      .attr('width', xScale.bandwidth() )
      .attr('y', (d) => { return yScale(0) } )
      .attr('x', (d) => { return xScale(d[0]) })
      .style('fill', function(d) {return (d[2]) ? '#4AF2A1' : '#6BB1FF'})
      .transition()
      .delay((d, i) => i * 20 )
      .attr('y', d => { return yScale(d[1])} )
      .attr('height', function(d) { return  (height - yScale(d[1]))  })

  bars.selectAll("text")
      .data(dataset)
      .enter()
      .append( "text" )
      .text( (d) => d[1].toFixed(2))
      .attr('y', -250)
      .attr('x', (d) => { return xScale(d[0]) })
      .transition()
      .delay((d, i) => i * 20 )
      .attr( 'class', 'bar-text')
      .attr('y', d => { return yScale(d[1]) - 5 } )
      .attr('x', (d) => { return xScale(d[0]) + 5 })
  update.exit().remove();
  }
  render() {
    this.reDrawChart();
    return (<div></div>);
  }
}