<template>
  <section class="date-overview">
    <div class="date-overview__left">
      <ContentBox>
        <template #title>최다 동시 접속자 수</template>
        <template #default>
          <div class="content">
            <div>
              <p class="content__desc">{{ firstDateData.desc }}</p>
              <strong class="content__value content__value--first">{{ firstDateData.max }}</strong>
            </div>
            <div v-if="isValidSecondDateData">
              <p class="content__desc">{{ secondDateData.desc }}</p>
              <strong class="content__value content__value--second">{{
                secondDateData.max
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
              <p class="content__desc">{{ firstDateData.desc }}</p>
              <strong class="content__value content__value--first">{{
                firstDateData.total
              }}</strong>
            </div>
            <div v-if="isValidSecondDateData">
              <p class="content__desc">{{ secondDateData.desc }}</p>
              <strong class="content__value content__value--second">{{
                secondDateData.total
              }}</strong>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <div class="date-overview__right">
      <ContentBox>
        <template #title>서버 별 접속자 수 총합</template>
        <template #default> </template>
      </ContentBox>
    </div>
  </section>
</template>

<script>
import ContentBox from '../ContentBox.vue';
export default {
  props: {
    firstDateData: {
      type: Object,
      require: true,
    },
    secondDateData: {
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
  },
  components: { ContentBox },
  computed: {
    isValidSecondDateData() {
      return (
        typeof this.secondDateData.desc === 'string' &&
        typeof this.secondDateData.max === 'number' &&
        typeof this.secondDateData.total === 'number' &&
        typeof this.secondDateData.servers === 'object'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/base/_colors.scss' as color;
@use '@/assets/styles/base/_fonts.scss' as font;

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
    color: color.$black-3;
    font-size: font.$small;
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
</style>
