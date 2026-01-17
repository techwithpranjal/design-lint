console.log('[DesignLint][Content] loaded on page');

const runtime =
  (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

runtime.onMessage.addListener((message: any, _sender: unknown, sendResponse: any) => {
  if (message.type === 'HELLO_FROM_POPUP') {
    console.log('[DesignLint][Content] received message');
    sendResponse({ type: 'CONTENT_ACK' });
    return true;
  }
});