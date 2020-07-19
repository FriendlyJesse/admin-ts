<template>
  <section class="login">
    <Login-bg />
    <div class="login__container">
      <h2 class="login__top">
        <span>登陆</span>
        <span>注册</span>
      </h2>
      <div @click="flag = !flag" class="login__bar">
        <i class="iconfont iconziyuan" :class="{active: flag}"></i>
      </div>
      <div class="card">
        <div class="card__wrapper" :class="{active: flag}">
          <div class="card-front">
            <div class="card-content">
              <login-form />
            </div>
          </div>
          <div class="card-back">
            <div class="card-content">456</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginBg from './components/LoginBg.vue'
import LoginForm from './components/LoginForm.vue'


@Component({
  components: {
    LoginBg,
    LoginForm
  }
})
export default class Login extends Vue {

  private flag = false

}
</script>

<style lang="scss">
$color: #c4c3ca;

.login {
  height: 100%;

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
  }

  &__top {
    margin: 0;
    padding-bottom: 16px;
    color: $color;
    font-size: 16px;
    text-align: center;
    span {
      padding: 0 20px;
    }
  }

  &__bar {
    position: relative;
    width: 60px;
    height: 16px;
    margin: 10px auto;
    cursor: pointer;
    border-radius: 8px;
    background: #ffeba7;
    text-align: center;
    .iconziyuan {
      position: absolute;
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: #ffeba7;
      background-color: #102770;
      z-index: 20;
      top: -10px;
      left: -10px;
      line-height: 36px;
      text-align: center;
      font-size: 24px;
      transition: all 0.5s ease;
      &.active {
        transform: translateX(44px) rotate(-300deg)
      }
    }
  }

  .cart-wrapper {
    perspective: 800px;
    transform-style: preserve-3d;
  }

  .card {
    position: relative;
    width: 440px;
    max-width: 100%;
    height: 400px;
    transform-style: preserve-3d;
    perspective: 800px;
    margin-top: 60px;
    &__wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform-style: preserve-3d;
      transition: all 600ms ease-out;
      &.active {
        transform: rotateY(180deg);
      }
    }
    .card-front, .card-back {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #2a2b38 url('../../icons/svg/pat.svg') no-repeat bottom center / 300%;
      border-radius: 6px;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }
    .card-back {
      transform: rotateY(180deg);
    }
    .card-content {
      color: #fff;
      position: absolute;
      width: 100%;
      padding: 0 35px;
      top: 50%;
      left: 0;
      transform: translate3d(0, -50%, 35px) perspective(100px);
      z-index: 20;
      display: block;
    }
  }
}
</style>
