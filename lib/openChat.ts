// Cross-component signal to open the floating chat widget.
export const OPEN_CHAT_EVENT = "aj:open-chat";

export function openChat(prefill?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { prefill } }));
}
