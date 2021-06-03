<template>
  <div class="chart-wrapper">
    <svg class="chart">
      <g class="chart__grid chart__grid-x"></g>
      <g class="chart__grid chart__grid-y"></g>
      <g class="chart__line">
        <path class="chart__path chart__path--fisrt" :d="firstLine"></path>
        <g>
          <circle
            class="chart__dot chart__dot--first"
            v-for="(position, i) in firstLinePostition"
            :key="`dot-firstdate-${i}-${position.x}-${position.y}`"
            :r="circle.r"
            :cx="position.x"
            :cy="position.y"
            fill="#2E447F"
            @mouseover="setTooltip(position, firstDate[i])"
            @mouseout="removeTooltip"
          ></circle>
        </g>
      </g>
      <g class="chart__line">
        <path class="chart__path chart__path--second" :d="secondLine"></path>
        <circle
          class="chart__dot chart__dot--second"
          v-for="(position, i) in secondLinePosition"
          :key="`dot-firstdate-${i}-${position.x}-${position.y}`"
          :r="circle.r"
          :cx="position.x"
          :cy="position.y"
          fill="#CF4F2E"
          @mouseover="setTooltip(position, secondDate[i])"
          @mouseout="removeTooltip"
        ></circle>
      </g>
    </svg>
    <div class="tooltip" :style="tooltipStyle">
      <div class="tooltip__title">[ {{ tooltip.time }}:00 ~ {{ tooltip.time }}:59 ]</div>
      <div class="tooltip__content">
        접속자 수 : <strong>{{ tooltip.count }}명</strong>
      </div>
    </div>
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
      tooltip: { time: 0, count: 0, posX: 0, posY: 0, display: 'none' },
      circle: {
        r: 3,
      },
    };
  },

  computed: {
    tooltipStyle() {
      return {
        left: this.tooltip.posX,
        top: this.tooltip.posY,
        display: this.tooltip.display,
      };
    },
    firstLine() {
      return d3
        .line()
        .x(d => this.xScale(this.times, this.width)(d.x))
        .y(d => this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height)(d.y))(
        this.firstDate
      );
    },
    secondLine() {
      return d3
        .line()
        .x(d => this.xScale(this.times, this.width)(d.x))
        .y(d => this.yScale(Math.max(...this.secondDate.map(d => d.y)), this.height)(d.y))(
        this.secondDate
      );
    },
    firstLinePostition() {
      return this.firstDate.map(first => ({
        x: this.xScale(this.times, this.width)(first.x),
        y: this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height)(first.y),
      }));
    },
    secondLinePosition() {
      return this.secondDate.map(second => ({
        x: this.xScale(this.times, this.width)(second.x),
        y: this.yScale(Math.max(...this.secondDate.map(d => d.y)), this.height)(second.y),
      }));
    },
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
    setTooltip(position, data) {
      this.tooltip.time = data.x;
      this.tooltip.count = data.y;
      this.tooltip.posX = position.x + 'px';
      this.tooltip.posY = `calc(${position.y}px - 50%)`;
      this.tooltip.display = 'block';
    },
    removeTooltip() {
      this.tooltip.display = 'none';
    },
  },

  mounted() {
    const svg = d3.select('svg');

    this.width = parseInt(svg.style('width')) - this.margin.left;
    this.height = parseInt(svg.style('height'));

    svg
      .select('.chart__grid-x')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale(this.times, this.width)).tickSize(4));

    svg
      .select('.chart__grid-y')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(
        d3
          .axisLeft(this.yScale(Math.max(...this.firstDate.map(d => d.y)), this.height))
          .ticks(4)
          .tickSize(-this.width + this.margin.left)
      );
  },
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .tooltip {
    position: absolute;
    display: none;
    padding: 12px;
    background: color.$black-4;
    opacity: 0.9;
    border-radius: 8px;
    text-align: center;
  }
}
.chart {
  width: 100%;
  height: 100%;
  &__grid {
    font-size: 12px;
    font-weight: font.$bold;
    color: #bbb;
  }

  &__path {
    fill: none;
    stroke-width: 1.5;
  }
  &__path--fisrt {
    stroke: color.$main-1;
  }
  &__path--second {
    stroke: color.$sub-1;
  }
}

.tooltip {
  &__title {
    font-weight: font.$bold;
    margin-bottom: 8px;
  }
}
</style>
