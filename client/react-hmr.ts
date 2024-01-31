export default function CustomHmr() {
  return {
    name: "custom-hmr",
    enforce: "post",
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".json")) {
        console.log("[i18next] reloading json files...");

        server.ws.send({ type: "full-reload", path: "*" });
      }
    },
  };
}
