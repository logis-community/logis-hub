export * from "./types";

export const ChangeLogCmp = defineAsyncComponent(
  () => import("./ChangeLog.vue"),
);
