<template>
  <section class="account">
    <com-list
      :source-data="tableData"
      :columns="columns"
      :page-request="listQuery"
      :page-total="total"
      :loading="listLoading"
      :page-sizes="[10, 25, 50]"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
      <template #operation>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              round
              @click="onEdit(scope.row)"
            >
              修改
            </el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(scope.row._id)"
            >
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                plain
                round
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </com-list>
  </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import pageMixins from '@/mixins/pageMixins'
import ComList from '@/components/ComList/index.vue'
import { getUsers, removeUser } from '@/api/users'


@Component({
  components: {
    ComList
  }
})
export default class Account extends pageMixins {

  fetchList = getUsers
  columns: Array<object> = [
    {
      label: 'ID',
      prop: '_id'
    },
    {
      label: '用户名',
      prop: 'username'
    },
    {
      slot: 'operation'
    }
  ]

  private handleDelete (id: number) {
    this.mixinHandleItem(removeUser, this.getList, { ids: [ id ] })
  }

}
</script>

<style lang="scss" scoped>
.account {
  color: #fff;
}
</style>