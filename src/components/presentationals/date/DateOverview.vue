<template>
  <section class="date-overview">
    <div class="date-overview__left">
      <ContentBox>
        <template #title>최다 동시 접속자 수</template>
        <template #default>
          <div class="content">
            <div>
              <p class="content__desc">2021.05.16</p>
              <strong class="content__value content__value--first">63488</strong>
            </div>
            <div>
              <p class="content__desc">2021.05.16</p>
              <strong class="content__value content__value--second">63488</strong>
            </div>
          </div>
        </template>
      </ContentBox>
      <ContentBox>
        <template #title>접속자 수 총합</template>
        <template #default>
          <div class="content">
            <div>
              <p class="content__desc">2021.05.16</p>
              <strong class="content__value content__value--first">63488</strong>
            </div>
            <div>
              <p class="content__desc">2021.05.16</p>
              <strong class="content__value content__value--second">63488</strong>
            </div>
          </div>
        </template>
      </ContentBox>
    </div>
    <div class="date-overview__right">
      <ContentBox>
        <template #title>서버 별 접속자 수 총합</template>
        <template #default>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
          <br />
          <div class="content">
            <div class="content__label">사내 (54)</div>
            <div class="content__data"></div>
            <div class="content__label--sub">6431</div>
          </div>
        </template>
      </ContentBox>
    </div>
  </section>
</template>

<script>
import ContentBox from '../ContentBox.vue';
export default {
  components: { ContentBox },
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
  justify-content: center;
  width: 100%;
  & > * {
    margin: 0 12px;
  }
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

  &__data {
    margin: 0 24px;
    width: 200px;
    border-top: solid 3px color.$main-1;
    border-bottom: solid 3px color.$sub-2;
  }
  &__label {
    font-size: font.$small;
    font-weight: font.$bold;
    color: color.$black-1;
    &--sub {
      font-size: font.$small;
      color: color.$black-3;
    }
  }
}
</style>
