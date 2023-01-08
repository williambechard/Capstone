import { createContext } from "react";

const ToastContext = createContext({
  toasts: [],
  setToasts: () => [],
});

export default ToastContext;
