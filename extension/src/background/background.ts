const runtime =
  (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

const tabs =
  (globalThis as any).chrome?.tabs || (globalThis as any).browser?.tabs;

runtime?.onInstalled?.addListener(() => {
  console.log("[DesignLint] Extension installed");
});

runtime.onMessage.addListener(
  (
    message: { type: string },
    _sender: unknown,
    sendResponse: (response: { type: string }) => void
  ) => {
    if (message.type === "PING") {
      console.log("[Background] received PING");
      sendResponse({ type: "PONG" });
    }
  }
);

runtime.onMessage.addListener(
  (
    message: { type: string },
    _sender: any,
    sendResponse: (arg0: any) => void
  ) => {
    if (message.type === "HELLO_FROM_POPUP") {
      console.log("[Background] forwarding HELLO_FROM_POPUP to content script");
      tabs.query({ active: true, currentWindow: true }, (tabsList: any[]) => {
        console.log("[Background] active tab:", tabsList?.[0]);
        const tabId = tabsList?.[0]?.id;
        console.log("[Background] active tab ID:", tabId);

        if (!tabId) return;

        tabs.sendMessage(
          tabId,
          { type: "HELLO_FROM_POPUP" },
          (response: any) => {
            sendResponse(response);
          }
        );
      });

      return true;
    }
  }
);
