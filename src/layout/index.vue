<template>
  <el-container>
    <el-aside>
      <div class="info">
        <div class="info__logo">
          <!-- <el-image
            style="width: 100px; height: 100px"
            :src="require('@/icons/svg/logo.svg')"
            fit="cover"
          /> -->
          <i class="iconfont icongoogle_wallet" />
        </div>
        <div class="info__avatar">
          <el-image
            style="width: 100px; height: 100px"
            :src="require('@/assets/images/avatar.png')"
            fit="cover"
          />
          <div class="info__name">
            FriendlyJesse
          </div>
          <div class="info__id">
            123456
          </div>
        </div>
      </div>
      <Menu />
    </el-aside>

    <el-container>
      <el-header>
        <h4 class="title">
          {{ $route.meta.title }}
        </h4>
        <div>
          <el-dropdown>
            <i
              class="el-icon-setting"
              style="margin-right: 15px"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Menu from './components/Menu.vue'

@Component({
  components: {
    Menu
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss">
  .el-container {
    background-color: $BG_COLOR;
    height: 100vh;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    background-color: $BG_COLOR;
    color: #333;
    line-height: 60px;

    .title {
      font-size: 25px;
      color: $TITLE_COLOR;
    }
  }

  .el-aside {
    width: 200px;
    background-color: $BG_COLOR;
    color: #333;
    .info {
      padding-bottom: 60px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__logo {
        margin: 30px 0 50px;
        .iconfont {
          background-image: -webkit-linear-gradient(right,#552589,#b55dd8,#da82b2);
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 50px;
        }
      }
      &__avatar {
        .el-image {
          border-radius: 50%;
        }
      }
      &__name {
        font-size: 15px;
        color: #fff;
      }
      &__id {
        color: $FONT_COLOR;
      }
    }
  }
</style>