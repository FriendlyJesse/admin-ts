<template>
  <el-menu
    router
    unique-opened
    :default-active="$route.path"
    text-color="#68676c"
    active-text-color="#cececc"
  >
    <template v-for="(item, i) in menuList">
      <el-submenu
        v-if="item.children"
        :key="item.title"
        :index="i.toString()"
      >
        <template slot="title">
          <i
            class="iconfont"
            :class="item.icon"
          />{{ item.title }}
        </template>
        <el-menu-item-group
          v-for="child in item.children"
          :key="child.title"
        >
          <el-menu-item :index="child.index">
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        v-else
        :key="item.title"
        :index="item.index"
      >
        <i
          class="iconfont"
          :class="item.icon"
        />
        <span slot="title">{{ item.title }}</span>
        <i class="el-icon-arrow-right" />
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Menu extends Vue {

  menuList = [
    {
      title: '后台概览',
      icon: 'iconziyuan1',
      index: '/overview'
    },
    {
      title: '账户设置',
      icon: 'iconyonghu',
      index: '/account'
    },
    {
      title: '计划变动',
      icon: 'iconshuaxin',
      index: '/plans'
    },
    {
      title: '费用统计',
      icon: 'iconhuojian',
      index: '/expense'
    },
    {
      title: '付款方式',
      icon: 'iconqiabao',
      index: '/payment'
    },
    {
      title: '附加服务',
      icon: 'iconjiugedian',
      index: '/additionService'
    },
  ]

}
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  background: $BG_COLOR;
  &-item {
    background: $BG_COLOR;
    font-size: 16px;
    color: $FONT_COLOR;
    .iconfont {
      color: $FONT_COLOR;
    }
    .el-icon-arrow-right {
      visibility: hidden;
      position: absolute;
      top: 50%;
      right: 30px;
      color: #cececc;
      transform: translateY(-50%);
    }
    &.is-active {
      background: linear-gradient(to right,#402f42 0,#221c2a 10%, $BG_COLOR 20%, $BG_COLOR 100%);
      .iconfont {
        background-image: -webkit-linear-gradient(bottom,#552589,#b55dd8,#da82b2);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .el-icon-arrow-right {
        visibility: visible;
      }
    }
  }
}
.iconfont {
  vertical-align: middle;
  margin-right: 15px;
}
</style>