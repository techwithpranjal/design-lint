console.log("[DesignLint][AxeBridge] loaded");

window.addEventListener("message", async (event) => {
  if (event.source !== window) return;
  if (event.data?.source !== "designlint") return;

  if (event.data.type === "RUN_AXE") {
    console.log("[DesignLint][AxeBridge] running axe");
    try {
      const axe = window.axe;
      if (!axe) throw new Error("axe not available");

      const results = await axe.run(document);

      window.postMessage(
        {
          source: "designlint",
          type: "AXE_RESULT",
          payload: results,
        },
        "*"
      );
    } catch (err) {
      console.error("[DesignLint][AxeBridge] error", err);

      window.postMessage(
        {
          source: "designlint",
          type: "AXE_ERROR",
        },
        "*"
      );
    }
  }
});
