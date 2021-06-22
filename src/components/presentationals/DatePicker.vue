<template>
  <section class="date-picker">
    <article v-if="isPeriodPage" class="date-picker__period">
      <el-date-picker
        type="daterange"
        v-model="period"
        :editable="false"
        :clearable="false"
        range-separator="~"
        start-placeholder="Start date"
        end-placeholder="End date"
      ></el-date-picker>
    </article>
    <article v-else class="date-picker__date">
      <el-date-picker
        class="date-picker__date--first"
        type="date"
        v-model="firstDate"
        :editable="false"
        :clearable="false"
        placeholder="Pick a day"
      ></el-date-picker>
      <el-date-picker
        class="date-picker__date--second"
        type="date"
        v-model="secondDate"
        :editable="false"
        placeholder="Pick a day"
      ></el-date-picker>
    </article>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class DatePicker extends Vue {
  @Prop({ required: true }) type!: string;
  @Prop({ required: true }) dateValue!: [Date, Date | undefined];

  get isPeriodPage() {
    return this.type === 'period';
  }

  get period() {
    return this.dateValue;
  }
  set period(newPeriod) {
    this.$emit('changePeriod', { newPeriod, prevPeriod: this.dateValue });
  }

  get firstDate() {
    return this.dateValue[0];
  }
  set firstDate(newFirstDate) {
    this.$emit('changeFirstDate', { newFirstDate, prevFirstDate: this.dateValue[0] });
  }

  get secondDate() {
    return this.dateValue[1];
  }
  set secondDate(newSecondDate) {
    this.$emit('changeSecondDate', { newSecondDate, prevSecondDate: this.dateValue[1] });
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  display: flex;
  justify-content: flex-end;
  padding: 24px 0;
  &__date {
    &--first {
      ::v-deep input {
        border-color: color.$main-3;
      }
    }
    &--second {
      margin-left: 1.5rem;
      ::v-deep input {
        border-color: color.$sub-3;
      }
    }
  }
}
</style>
