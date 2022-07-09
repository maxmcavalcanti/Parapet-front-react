import bus from "../utils/bus";

export function useFlashMessage() {
  function setFlashMessage(msg, type) {
    bus.emit("flash", { message: msg, type: type });
  }

  return { setFlashMessage };
}
