import { useEffect } from "react";

export default function Popup() {
  const runtime =
    (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

  useEffect(() => {
    runtime.sendMessage({ type: 'PING' }, (response: any) => {
      console.log('[Popup] response from background:', response);
  
      runtime.sendMessage(
        { type: 'HELLO_FROM_POPUP' },
        (contentResponse: any) => {
          console.log('[Popup] response from content:', contentResponse);
        }
      );
    });
  }, []);

  return <div className="p-4 text-sm text-zinc-200">DesignLint Popup</div>;
}
