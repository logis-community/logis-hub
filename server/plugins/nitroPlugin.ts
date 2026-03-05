export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("close", async () => {
    // Will run when nitro is being closed
    console.info("Nitro is being closed");
  });
});
