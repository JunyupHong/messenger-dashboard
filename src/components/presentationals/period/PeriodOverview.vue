<template>
  <section class="period-overview">
    <div
      class="period-overview__content-wrapper"
      v-for="(content, i) in contents"
      :key="'period-overview-' + content.title"
    >
      <ContentBox>
        <template #title>{{ content.title }}</template>
        <template #default>
          <p class="content__desc">{{ data[content.title].desc }}</p>
          <strong class="content__value">{{ data[content.title].value }}</strong>
          <p class="content__desc">{{ content.desc }}</p>
          <div>
            <span class="content__prev-value">{{ data[content.title].prevValue }}</span>
            <span class="content__percent" :positive="percents[i] > 0" :negative="percents[i] < 0">
              <span v-if="percents[i] > 0">+</span>
              {{ percents[i] }}%
            </span>
          </div>
        </template>
      </ContentBox>
    </div>
  </section>
</template>

<script>
import ContentBox from '../ContentBox';

export default {
  props: {
    data: Object,
  },
  components: { ContentBox },
  data() {
    return {
      contents: [
        { title: 'day', desc: '전날 대비' },
        { title: 'week', desc: '전주 대비' },
        { title: 'month', desc: '전월 대비' },
        { title: 'custom', desc: '이전 n일 대비' },
      ],
    };
  },
  computed: {
    percents() {
      return Object.values(this.data).map(d => ((d.value - d.prevValue) * 100) / d.prevValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/base/_colors.scss' as color;
@use '@/assets/styles/base/_fonts.scss' as font;

.period-overview {
  display: flex;
  justify-content: space-between;
  &__content-wrapper {
    flex: 1;
    padding: 0 0.75rem;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
}
.content {
  &__desc {
    margin-top: 16px;
    color: color.$black-3;
    font-size: font.$small;
  }
  &__value {
    font-size: font.$xx-big;
    font-weight: font.$bold;
    color: color.$main-1;
  }
  &__prev-value {
    font-size: font.$big;
    font-weight: font.$bold;
    color: color.$main-4;
    margin-right: 16px;
  }
  &__percent {
    font-size: font.$big;
    font-weight: font.$bold;
    color: color.$black-4;
    margin-left: 16px;
    &[positive] {
      color: color.$sub-2;
    }
    &[negative] {
      color: color.$main-3;
    }
  }
}
</style>
