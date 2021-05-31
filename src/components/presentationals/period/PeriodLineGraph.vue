<template>
  <section class="period-linegraph">
    <div class="period-linegraph__label period-linegraph__y-label">동시 접속자 수</div>
    <div class="period-linegraph__right">
      <ContentBox>period linegraph</ContentBox>
      <div class="period-linegraph__label period-linegraph__x-label">날짜</div>
    </div>
  </section>
</template>

<script>
import ContentBox from '@/components/presentationals/ContentBox.vue';

export default {
  components: { ContentBox },
};
</script>
<style lang="scss" scoped>
@use '@/assets/styles/base/_colors.scss' as color;
@use '@/assets/styles/base/_fonts.scss' as font;

.period-linegraph {
  display: flex;
  min-width: 1000px;
  &__right {
    flex: 1;
  }
  &__label {
    font-size: font.$small;
    font-weight: font.$bold;
    color: color.$black-3;
  }
  &__y-label {
    writing-mode: vertical-lr;
    text-orientation: sideways;
    transform: rotate(180deg);
    margin-right: 8px;
  }
  &__x-label {
    text-align: center;
    margin-top: 8px;
  }
}
</style>
