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

<script>
export default {
  props: {
    type: String,
    dateValue: Array,
  },
  computed: {
    isPeriodPage() {
      return this.type === 'period';
    },
    period: {
      get() {
        return this.dateValue;
      },
      set(newPeriod) {
        this.$emit('changePeriod', newPeriod);
      },
    },
    firstDate: {
      get() {
        return this.dateValue[0];
      },
      set(newFirstDate) {
        this.$emit('changeDate', [newFirstDate, this.dateValue[1]]);
      },
    },
    secondDate: {
      get() {
        return this.dateValue[1];
      },
      set(newSecondDate) {
        this.$emit('changeDate', [this.dateValue[0], newSecondDate]);
      },
    },
  },
};
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
