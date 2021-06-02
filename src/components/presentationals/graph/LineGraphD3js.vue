<template>
  <svg class="chart"></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      times: Array.from({ length: 24 }, (_, i) => i),
      data: Array.from({ length: 24 }, (_, i) => ({
        x: i,
        y: Math.random() * 100,
      })),
      width: 0,
      height: 0,
      margin: {
        left: 20,
        top: 4,
        bottom: 20,
      },
      tooltip: null,
    };
  },
  methods: {
    xScale(domain, width) {
      return d3.scalePoint().domain(domain).rangeRound([this.margin.left, width]);
    },
    yScale(max, height) {
      return d3
        .scaleLinear()
        .domain([0, max])
        .nice()
        .range([height - this.margin.bottom, this.margin.top]);
    },
  },
  mounted() {
    const svg = d3.select('svg');

    this.width = parseInt(svg.style('width')) - this.margin.left;
    this.height = parseInt(svg.style('height'));

    const svgG = svg.append('g');
    svgG
      .append('g')
      .attr('class', 'grid')
      .style('color', '#444')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale(this.times, this.width)).tickSize(4));

    svgG
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .style('color', '#bbb')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .call(
        d3
          .axisLeft(this.yScale(Math.max(...this.data.map(d => d.y)), this.height))
          .ticks(4)
          .tickSize(-this.width + this.margin.left)
      );

    this.tooltip = svg
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('top', '100px')
      .style('left', '100px')
      .style('visibility', 'visible')
      .style('background', 'red')
      .text('tooltip');
    console.log(this.tooltip);

    const chartG = svg.append('g').attr('class', 'line-chart');
    chartG
      .append('g')
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x(d => this.xScale(this.times, this.width)(d.x))
          .y(d => this.yScale(Math.max(...this.data.map(d => d.y)), this.height)(d.y))
      );

    chartG
      .append('g')
      .selectAll('.dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', d => this.xScale(this.times, this.width)(d.x))
      .attr('cy', d => this.yScale(Math.max(...this.data.map(d => d.y)), this.height)(d.y))
      .attr('fill', 'steelblue')
      .on('mouseover', () => this.tooltip.style('visibility', 'visible'))
      .on('mousemove', () => this.tooltip.style('top', 300 + 'px').style('left', 300 + 'px'))
      .on('mouseout', () => this.tooltip.style('visibility', 'hidden'));
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
