<template>
  <div class="changelog-container">
    <!-- 组件标题 -->
   <slot name="title">
     <div class="changelog-title">{{ modelValue.title || '更新日志' }}</div>
   </slot>

  <div v-if="modelValue.description" class="my-5px">{{ modelValue.description }}</div>
    <!-- 日志列表 -->
    <div class="changelog-list">
     <div v-for="(item, index) in modelValue.releases" :key="index" class="changelog-item">
        <!-- 版本信息（含日期） -->
        <div class="version-header" @click="toggleVersion(index)">
          <div class="version-info">
            <span class="version-tag" :class="{ latest: index === 0 }">
              {{ item.version }}
            </span>
            <span class="version-date">{{ item.date }}</span>
          </div>
          <span class="toggle-icon">
            {{ expandedIndex === index ? '−' : '+' }}
          </span>
        </div>

        <!-- 更新内容 -->
        <div v-show="expandedIndex === index || index === 0" class="version-content">
          <ul class="change-list">
            <li v-for="(change, idx) in item.changes" :key="idx" class="change-item">
              <span class="change-type px-6px py-2px" :class="change.type">
                {{ getTypeLabel(change.type) }}
              </span>
              <component :is="change.icon" v-if="change.icon" class="mr-2px" />
              <span class="change-desc">{{ change.description }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ChangeLog } from './types';
// 定义展开的版本索引（默认展开最新版本）
const expandedIndex = ref(0)

// 切换版本展开/折叠状态
const toggleVersion = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index
}

// 映射更新类型标签
const getTypeLabel = (type: string) => {
  const typeMap: Record<string, string> = {
    feat: '新增',
    fix: '修复',
    perf: '优化',
    style: '样式',
    docs: '文档',
    refactor: '重构'
  }
  return typeMap[type] || '更新'
}

const modelValue = defineModel<Partial<ChangeLog>>({
  required: true
})

</script>

<style scoped>
/* 基础容器样式 */
.changelog-container {
  margin: 20px auto;
  padding: 0 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 标题样式 */
.changelog-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* 日志列表 */
.changelog-list {
  gap: 12px;
  display: flex;
  flex-direction: column;
}

/* 版本项 */
.changelog-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

/* 版本头部（可点击） */
.version-header {
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
}

.version-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 版本标签 */
.version-tag {
  font-size: 15px;
  font-weight: 600;
  color: #2563eb;
}

.version-tag.latest {
  color: #dc2626;
}

/* 版本日期 */
.version-date {
  font-size: 13px;
  color: #6b7280;
}

/* 折叠/展开图标 */
.toggle-icon {
  font-size: 16px;
  color: #6b7280;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 版本内容 */
.version-content {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}

/* 更新内容列表 */
.change-list {
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 8px;
  display: flex;
  flex-direction: column;
}

/* 单个更新项 */
.change-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

/* 更新类型标签 */
.change-type {
  font-size: 12px;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
}

/* 不同更新类型的样式 */
.change-type.feat {
  background: #d1fae5;
  color: #065f46;
}

.change-type.fix {
  background: #fee2e2;
  color: #991b1b;
}

.change-type.perf {
  background: #dbeafe;
  color: #1e40af;
}

.change-type.style {
  background: #fef3c7;
  color: #92400e;
}

.change-type.docs {
  background: #e0e7ff;
  color: #4338ca;
}

.change-type.refactor {
  background: #e5e7eb;
  color: #4b5563;
}
</style>