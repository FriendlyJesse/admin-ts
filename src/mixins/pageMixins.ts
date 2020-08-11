import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Page extends Vue {
  // 页码及每页条数
  listQuery = {
    page: 1,
    limit: 10
  }
  total = 0
  listLoading = false // 是否加载中
  fetchList: any = null // 请求接口函数
  tableData = [] // 获取数据
  searchForm = {} // 筛选条件

  @Watch('listQuery', { deep: true })
  listQueryChange () {
    this.getList()
  }

  // 页码切换
  pageChange (page: number) {
    this.listQuery.page = page
  }
  // 每页条数切换
  sizeChange (size: number) {
    this.listQuery.limit = size
  }

  mounted () {
    this.getList()
  }

  // 获取列表数据
  async getList () {
    if (!this.fetchList || typeof this.fetchList !== 'function') {
      this.$message.error('请把列表接口函数赋值给fetchList')
      return
    }
    this.listLoading = true
    const query = this.$filterEmptyValue(this.listQuery, this.searchForm)
    const RESULT = await this.fetchList(query)
    this.tableData = RESULT
    this.total = RESULT.total
    this.listLoading = false
  }

  /**
   * @description: 操作项目及回调
   * fn: 需要执行的函数
   * cb: 回调（可传空）
   * ...rest: 需要执行函数的参数
   */
  async mixinHandleItem (fn: Function, cb: Function, ...rest: any) {
    const RESULT = await fn(...rest)
    if (RESULT.ok) {
      this.$message.success('操作成功')
      if (cb && typeof cb === 'function') {
        cb()
      }
    } else {
      this.$message.error(RESULT.meaasge[0] || '操作失败，请重试')
    }
  }
}