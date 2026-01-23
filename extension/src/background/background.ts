const runtime =
  (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

const tabs =
  (globalThis as any).chrome?.tabs || (globalThis as any).browser?.tabs;

runtime?.onInstalled?.addListener(() => {
  console.log("[DesignLint] Extension installed");
});

runtime.onMessage.addListener(
  (
    message: { type: string; payload?: any },
    _sender: any,
    sendResponse: (arg0: any) => void
  ) => {
    if (message.type === "START_SCAN") {
      console.log("[Background] forwarding START_SCAN to content script");

      tabs.query({ active: true, currentWindow: true }, (tabsList: any[]) => {
        console.log("[Background] active tab:", tabsList?.[0]);
        const tabId = tabsList?.[0]?.id;
        console.log("[Background] active tab ID:", tabId);

        if (!tabId) return;

        tabs.sendMessage(
          tabId,
          { type: "START_SCAN", payload: message.payload },
          (response: any) => {
            sendResponse(response);
            return true;
          }
        );
      });

      return true;
    }
  }
);
