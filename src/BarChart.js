import React, { Component } from 'react';
import * as d3 from 'd3';
import './index.css';

let dataset, xScale, yScale;
let xDomain, yDomain, svg;
let margin = {top: 20, right: 20, bottom: 200, left: 60},
width = 1000 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
let barWidth = ((width / 32));
let yDataScale = d3.scaleLinear()
.domain([0, 1])
.range([0, height - margin.top])

class BarChart extends Component {
  dataset = this.props.data;

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.reDrawChart();

  }
  drawChart() {
    dataset = this.props.data; //Info para el dataset, pasados desde el componente App.js
    //Drawing the chart
    svg =  d3.select('#d3-content')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.bottom + margin.top)

  //  Dominios X y Y

   xDomain = (dataset.map(function (d) { return d.name }));
   yDomain = ([0, parseFloat(d3.max(dataset, function (d) {return d.idh }))]);

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

      svg.selectAll("text")
          .data(dataset)
          .enter()
          .append( "text" )
          .text( (d) => d.idh.toFixed(2) )
          .attr( 'class', 'bar-text')
          .attr( 'y', function(d) { return  height - yDataScale(d.idh) - 3 })
          .attr( 'x', (d, i) => { return barWidth * i + 1 });

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
        .attr('x', (d) => { return xScale(d.name) })
        .attr('fill', '#016FFF')
        .transition()
        .delay((d, i) => i * 20 )
        .attr('y', d => { return yScale(d.idh)} )
        .attr('height', function(d) { return  (height - yScale(d.idh))  })

    update.exit().remove();
    }
  render() {
    return (<div></div>);
  }
}


export default BarChart;
