import type { ApiResponse } from "@ipa-schema/api";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler((event) => {
  if (!event.path.startsWith("/api/")) return;

  const res = event.node.res;
  const originalEnd = res.end;

  res.end = function (
    chunk?: any,
    encoding?: string | (() => void),
    cb?: () => void,
  ) {
    const wrappedBody: ApiResponse<any> = {
      data: chunk,
      success: true,
    };
    return originalEnd.call(
      this,
      JSON.stringify(wrappedBody),
      encoding as any,
      cb,
    );
  };
});
