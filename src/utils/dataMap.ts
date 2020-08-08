export const contractData = [ // 合同状态
  { label: '已完成', value: '1' },
  { label: '申请中', value: '2' },
  { label: '驳回', value: '3' }
]

interface DataMapInterface {
  label: string;
  value: number;
}

export const dataMap = (data: DataMapInterface[], value: number) => {
  if (Array.isArray(data)) {
    const item = data.find(v => v.value === value)
    return item ? item.label : value
  }
  return value
}