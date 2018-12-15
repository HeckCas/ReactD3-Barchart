import React, { Component } from 'react';
import * as d3 from 'd3';
import './index.css';

class BarChart extends Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
        const dataset = this.props.data;

    let margin = {top: 20, right: 20, bottom: 150, left: 60},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    let x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.5);
    let y = d3.scaleLinear()
        .range([height, 0]);
    let barPadding = 10;
    let barWidth = ((width / dataset.length));

    //Drawing the chart

    let yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, height - margin.top ])

    let svg =  d3.select('#d3-content')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.bottom + margin.top)
        .attr('class', 'svg-layout')
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        //Charts Creation and fill

      svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('fill', '#016FFF')
        .attr( 'y', function(d) { return  height - yScale(d.idh) } )
        .attr( 'height', (d) => { return yScale(d.idh) } )
        .attr( 'width', barWidth - barPadding )
        .attr( 'x', (d, i) => { return barWidth * i })
        // .on('mouseover',function(d){
        //   if(d.name == "Chihuahua") {
        //     d3.select(this)
        //       .attr('fill','#4AF2A1')}
        //   })
        // .on('mouseout',function(d){
        //   d3.select(this)
        //     .attr('fill','#016FFF')});

        //BarChart values append section

      svg.selectAll("text")
          .data(dataset)
          .enter()
          .append( "text" )
          .text( (d) => d.idh.toFixed(2) )
          .attr( 'class', 'bar-text')
          .attr( 'y', function(d) { return  height - yScale(d.idh) - 3 })
          .attr( 'x', (d, i) => { return barWidth * i + 1 });

      //Draw Axis Section

      let xAxis = d3.axisBottom().scale(x)
      let yAxis = d3.axisLeft().scale(y).ticks(100);

      x.domain(dataset.map(function (d) { return d.name }));
      y.domain([0, d3.max(100, function (d) {return d.idh })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height +")")
        .call(xAxis)
        .selectAll('text')
        .style("text-anchor", "end")
        .style("color", "white")
        .attr("dx", "-0.3em")
        .attr("dy", (d, i) => { return i + barPadding } )
        .attr("y", -21)
        .attr("x", -7)
        .attr("transform", "rotate(-85)");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y",0)
        .attr("x", 30)
        .attr("dy", "0.8em")
        .attr("text-anchor", "center")
        .text("IDH ");

    // Menu to stablish Entity

      let menu = d3.select("#menu select")
          .attr("class", "menu")
          .on("change", changeColor());

      menu.selectAll("option")
          .data(dataset)
          .enter()
          .append("option")
          .attr("value", function (d) { return d.name })
          .text(function (d) { return d.name })


      function changeColor() {
        d3.select("select")
          console.log(menu.node().value);
          debugger
          // .on("change", function (d) {
          //   let selected = d3.select("#menu select").node().value;
          //   console.log( selected );
          // })

      }


    }




  render() {
    return <div></div>
  }
}

export default BarChart;
