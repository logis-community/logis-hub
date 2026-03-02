<template>
 <div>
    <ChangeLogCmp :model-value="changelog" />
  </div>
</template>

<script setup lang="ts">
import type { ChangeLog, ChangeLogItem } from '~/components/change-log/index';
import { ChangeLogCmp } from '~/components/change-log/index';


// 示例更新日志数据（可替换为接口返回数据）
const changelogData = ref<ChangeLogItem[]>([
  {
    version: 'v1.2.0',
    date: '2026-02-27',
    changes: [
      { type: 'feat', description: '新增狐狸头图标自定义功能' },
      { type: 'fix', description: '修复移动端更新日志展示错位问题' },
      { type: 'perf', description: '优化组件加载速度，减少50%渲染时间' }
    ]
  },
  {
    version: 'v1.1.0',
    date: '2026-02-20',
    changes: [
      { type: 'feat', description: '新增更新日志折叠/展开功能' },
      { type: 'style', description: '优化版本标签样式，增加最新版本高亮' },
      { type: 'fix', description: '修复日期格式显示异常的bug' }
    ]
  },
  {
    version: 'v1.0.0',
    date: '2026-02-10',
    changes: [
      { type: 'feat', description: '初始版本发布，支持基础更新日志展示' },
      { type: 'docs', description: '完善组件使用文档' }
    ]
  }
])

const changelog = computed<Partial<ChangeLog>>(() => ({
  title: "智能仿真大师",
  subtitle: "版本更新日志",
  items: changelogData.value
}))
</script>

<style scoped></style>