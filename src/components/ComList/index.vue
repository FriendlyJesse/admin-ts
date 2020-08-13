<template>
  <section class="com-list">
    <el-table
      v-loading="loading"
      :data="sourceData"
      class="com-list__table"
      @selection-change="selectionChange"
    >
      <!-- 选择框 -->
      <el-table-column
        v-if="selectVisible"
        type="selection"
        width="45"
        align="center"
      />

      <!-- 主体数据 -->
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="column.render"
          :key="column.prop"
          :label="column.label"
        >
          <template slot-scope="scope">
            <Render
              :row="scope.row"
              :index="index"
              :render="column.render"
            />
          </template>
        </el-table-column>
        <slot
          v-else-if="column.slot"
          :name="column.slot"
        />
        <el-table-column
          v-else
          :key="column.prop"
          v-bind="setAttrs(column)"
        />
      </template>

      <!-- 分页 -->
      <div
        v-if="needPage"
        slot="append"
        class="com-list__footer"
      >
        <el-row
          type="flex"
          justify="left"
        >
          <el-col>
            <el-button
              v-if="deleteVisible"
              type="danger"
            >
              批量删除
            </el-button>
            <el-button
              v-if="setGroupVisible"
            >
              设置分组
            </el-button>
            <slot name="read" />
          </el-col>
          <el-col
            v-if="needPage"
            class="pagination"
            :span="6"
          >
            <el-pagination
              small
              background
              layout="prev, pager, next"
              :total="pageTotal"
              :page-size="pageRequest.limit"
              :current-page.sync="pageRequest.page"
              @current-change="page => $emit('page-change', page)"
              @size-change="size => $emit('page-change', size)"
            />
          </el-col>
        </el-row>
      </div>
    </el-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Render from './render'

@Component({
  components: {
    Render
  }
})
export default class ComList extends Vue {

  @Prop({ default: false }) loading!: boolean
  @Prop() sourceData!: object // 表格数据
  @Prop() columns!: Array<object> // 表格项
  @Prop({ default: false }) selectVisible?: boolean // 选择框
  @Prop({ default: false }) deleteVisible?: boolean // 批量删除
  @Prop({ default: false }) setGroupVisible?: boolean // 设置分组
  @Prop({ default: true }) needPage?: boolean // 是否有分页
  @Prop({ default: () => {return { page: 1, limit: 10, total: 0 } } }) pageRequest?: object // 分页数据
  @Prop({ default: 0 }) pageTotal?: number // 分页总数

  private selections: Array<object> = []

  private selectionChange (selections: Array<object>) {
    this.selections = selections
    this.$emit('selectionChange', { selections })
  }

  private setAttrs (params: object) {
    // eslint-disable-next-line
    const { slot, ...options }: any = params // 排除 slot
    return { align: 'center', ...options }
  }

}
</script>

<style lang="scss" scoped>
.com-list {
  &__footer {
    margin: 10px 22px 10px 0;
    text-align: left;
    .pagination {
      margin-top: 6px;
      text-align: right;
    }
    .el-pagination {
      text-align: right;
      padding: 0;
    }
  }
}
</style>