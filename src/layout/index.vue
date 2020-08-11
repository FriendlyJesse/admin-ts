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
          <el-dropdown @command="onSetTheme">
            <i
              class="el-icon-setting"
              style="margin-right: 15px"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in themes"
                :key="item.command"
                :command="item.command"
              >
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="username">王小虎</span>
        </div>
      </el-header>

      <el-main>
        <transition
          name="el-zoom-in-center"
          :duration="{ enter: 500, leave: 0 }"
        >
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Menu from './components/Menu.vue'
import { Mutation } from 'vuex-class'

interface ThemesInterface {
  name: string;
  command: string;
}

@Component({
  components: {
    Menu
  }
})
export default class Layout extends Vue {
  @Mutation('SET_THEME') setTheme: any

  private themes: ThemesInterface[] = [
    {
      name: '默认',
      command: 'default'
    },
    {
      name: '明亮',
      command: 'light'
    },
    {
      name: '暗黑',
      command: 'night'
    }
  ]

  private onSetTheme (val: string) {
    this.setTheme(val)
  }

}
</script>

<style lang="scss">
  .el-container {
    background-color: var(--BG_COLOR);
    height: 100vh;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    color: #333;
    line-height: 60px;

    .title {
      font-size: 25px;
      color: var(--TITLE_COLOR);
    }
    .username {
      color: var(--FONT_COLOR);
    }
  }

  .el-aside {
    position: relative;
    background-color: var(--BG_COLOR);
    box-shadow: 0px 0px 60px 0px rgba(158, 178, 215, 0.16);
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
        color: var(--DISPLAY_COLOR);
      }
      &__id {
        color: var(--FONT_COLOR);
      }
    }
  }

  .el-icon-setting {
    color: var(--TITLE_COLOR);
  }
</style>