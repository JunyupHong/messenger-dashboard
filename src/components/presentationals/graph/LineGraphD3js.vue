<template>
  <div class="chart-wrapper">
    <svg class="chart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      times: Array.from({ length: 24 }, (_, i) => i),
      firstDate: Array.from({ length: 24 }, (_, i) => ({
        x: i,
        y: (Math.random() * 100).toFixed(0),
      })),
      secondDate: Array.from({ length: 24 }, (_, i) => ({
        x: i,
        y: (Math.random() * 100).toFixed(0),
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
    getTooltip(data) {
      return `
          <div> [ ${data.x}:00 ~ ${data.x}:59 ]</div>
          <div> 접속자 수 : <strong>${data.y}명</strong> </div>
      `;
    },
  },
  mounted() {
    const svg = d3.select('svg');

    this.width = parseInt(svg.style('width')) - this.margin.left;
    this.height = parseInt(svg.style('height'));

    const svgG = svg.append('g');
    svgG
      .append('g')
      .attr('class', 'grid grid__x')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale(this.times, this.width)).tickSize(4));

    svgG
      .append('g')
      .attr('class', 'grid grid__y')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(
        d3
          .axisLeft(this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height))
          .ticks(4)
          .tickSize(-this.width + this.margin.left)
      );

    const chartG = svg.append('g').attr('class', 'line-chart');
    chartG
      .append('g')
      .append('path')
      .datum(this.firstDate)
      .attr('fill', 'none')
      .attr('stroke', '#CF4F2E')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x(d => this.xScale(this.times, this.width)(d.x))
          .y(d => this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height)(d.y))
      );
    chartG
      .append('g')
      .selectAll('.dot')
      .data(this.firstDate)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', d => this.xScale(this.times, this.width)(d.x))
      .attr('cy', d => this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height)(d.y))
      .attr('fill', '#CF4F2E')
      .on('mouseover', (evt, d) => {
        this.tooltip
          .style('display', 'block')
          .style(
            'top',
            `calc(${
              this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height)(d.y) + 'px'
            } - 40%)`
          )
          .style('left', this.xScale(this.times, this.width)(d.x) + 'px')
          .html(this.getTooltip(d));
      })
      .on('mouseout', () => this.tooltip.style('display', 'none'));

    chartG
      .append('g')
      .append('path')
      .datum(this.secondDate)
      .attr('fill', 'none')
      .attr('stroke', '#2E447F')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x(d => this.xScale(this.times, this.width)(d.x))
          .y(d => this.yScale(Math.max(...this.secondDate.map(d => d.y)), this.height)(d.y))
      );

    chartG
      .append('g')
      .selectAll('.dot')
      .data(this.secondDate)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', d => this.xScale(this.times, this.width)(d.x))
      .attr('cy', d => this.yScale(Math.max(...this.secondDate.map(d => d.y)), this.height)(d.y))
      .attr('fill', '#2E447F')
      .on('mouseover', (evt, d) => {
        this.tooltip
          .style('display', 'block')
          .style(
            'top',
            `calc(${
              this.yScale(Math.max(...this.secondDate.map(d => d.y)), this.height)(d.y) + 'px'
            } - 40%)`
          )
          .style('left', this.xScale(this.times, this.width)(d.x) + 'px')
          .html(this.getTooltip(d));
      })
      .on('mouseout', () => this.tooltip.style('display', 'none'));

    this.tooltip = d3
      .select('.chart-wrapper')
      .append('div')
      .attr('class', 'tooltip')
      .html(`<h1>tooltip</h1>`);
  },
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.chart {
  width: 100%;
  height: 100%;
  ::v-deep .grid {
    font-size: 12px;
    font-weight: 600;
    color: #bbb;
  }
}

.chart-wrapper {
  ::v-deep .tooltip {
    position: absolute;
    display: none;
    padding: 12px;
    background: color.$black-4;
    opacity: 0.9;
    border-radius: 8px;
    text-align: center;
  }
}
</style>
