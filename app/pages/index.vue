<template>
 <div class="w-screen h-screen p-10px">
    <el-tabs v-model="activeTab" class="w-full h-full">
      <el-tab-pane v-for="(changelog, i) in changelogs" :key="i" :label="changelog.title" :name="changelog.title">
        <ChangeLogCmp :model-value="changelog" class="h-full overflow-auto">
          <template #title>{{ changelog.subtitle }}</template>
        </ChangeLogCmp>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { ChangeLog } from "~/components/change-log/index";
import { ChangeLogCmp } from "~/components/change-log/index";
import { ElMessage } from "element-plus";
import { ref } from "vue";
const changelogs = ref<ChangeLog[]>([
  {
    title: "更新日志",
    releases: [{
      version: "v0.0.1",
      date: "2023-01-01",
      changes: [
        {
          type: "feat",
          description: "Initial release",
        },
      ],
    }]
  },
]);

const activeTab = ref<string>(changelogs.value.at(0)?.title || "");
watch(() => changelogs.value, (newVal) => {
  activeTab.value = newVal.at(0)?.title || "";
})
onMounted(() => {
  fetch("/changelog.json")
    .then<ChangeLog[]>((res) => res.json())
    .then((logs) => {
      changelogs.value = logs
    })
    .catch((e) => {
      ElMessage.error(`获取更新日志失败：${e}`);
    });
})
</script>

<style scoped>
:deep(.el-tabs__content) {
  overflow: auto;
}
</style>


