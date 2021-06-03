<template>
  <section class="date-overview">
    <div class="date-overview__left">
      <ContentBox>
        <template #title>최다 동시 접속자 수</template>
        <template #default>
          <div class="content">
            <div>
              <p class="content__desc">{{ firstDate.desc }}</p>
              <strong class="content__value content__value--first">{{
                showNumber(firstDate.max)
              }}</strong>
            </div>
            <div v-if="isValidSecondDate">
              <p class="content__desc">{{ secondDate.desc }}</p>
              <strong class="content__value content__value--second">{{
                showNumber(secondDate.max)
              }}</strong>
            </div>
          </div>
        </template>
      </ContentBox>
      <ContentBox>
        <template #title>접속자 수 총합</template>
        <template #default>
          <div class="content">
            <div>
              <p class="content__desc">{{ firstDate.desc }}</p>
              <strong class="content__value content__value--first">{{
                showNumber(firstDate.total)
              }}</strong>
            </div>
            <div v-if="isValidSecondDate">
              <p class="content__desc">{{ secondDate.desc }}</p>
              <strong class="content__value content__value--second">{{
                showNumber(secondDate.total)
              }}</strong>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <div class="date-overview__right">
      <ContentBox>
        <template #title>서버 별 접속자 수 총합</template>
        <template #default>
          <BarGraphChartjs class="bargraph__full" :chartData="barGraph" />
        </template>
      </ContentBox>
    </div>
  </section>
</template>

<script>
import ContentBox from '../ContentBox.vue';
import BarGraphChartjs from '../graph/BarGraphChartjs.vue';
import { getNumberWithComma } from '@/utils/number.js';

export default {
  components: { ContentBox, BarGraphChartjs },
  props: {
    firstDate: {
      type: Object,
      required: true,
    },
    secondDate: {
      type: Object,
      default: null,
      validator: function (value) {
        return (
          typeof value.desc === 'string' &&
          typeof value.max === 'number' &&
          typeof value.total === 'number' &&
          typeof value.servers === 'object'
        );
      },
    },
    barGraph: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isValidSecondDate() {
      return (
        typeof this.secondDate.desc === 'string' &&
        typeof this.secondDate.max === 'number' &&
        typeof this.secondDate.total === 'number' &&
        typeof this.secondDate.servers === 'object'
      );
    },
  },
  methods: {
    showNumber(number) {
      return getNumberWithComma(number);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-overview {
  display: flex;
  justify-content: space-between;
  &__left {
    flex: 1;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > * {
      flex: 1;
      margin-bottom: 24px;
    }
    & > :last-child {
      margin-bottom: 0;
    }
  }
  &__right {
    flex: 1;
    margin-left: 12px;
  }
}

.content {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  &__desc {
    margin-top: 16px;
    color: color.$black-2;
    font-size: font.$small;
    font-weight: font.$medium;
    text-align: center;
  }
  &__value {
    font-size: font.$xx-big;
    font-weight: font.$bold;
    text-align: center;
    &--first {
      color: color.$main-1;
    }
    &--second {
      color: color.$sub-1;
    }
  }
}
.bargraph__full {
  width: 100%;
}
</style>
