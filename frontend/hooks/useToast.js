import { useContext } from "react";
import { ToastContext } from "../providers";

const returnUpdatedToasts = (currentToasts, index, newToast) => {
  const newToasts = [...currentToasts];
  [...newToasts].splice(index, 1, newToast);
  return newToasts;
};

const useToast = () => {
  const { toasts, setToasts } = useContext(ToastContext);

  const removeToast = (id) => {
    if (id === null) setToasts([]);
    else setToasts((previous) => previous.filter((item) => item.id !== id));
  };

  const addToast = (incomingToast) => {
    if (!incomingToast) return;

    const {
      id = Date.now(),
      duration = 3000,
      persist = false,
    } = incomingToast || {};
    const newToast = { ...incomingToast, id, duration, persist };

    setToasts((previous) => {
      const existing = previous.findIndex((item) => item.id === id);

      return existing === -1
        ? [...previous, newToast]
        : returnUpdatedToasts(previous, existing, newToast);
    });

    if (!newToast.persist)
      setTimeout(
        (removeId) => {
          removeToast(removeId);
        },
        newToast.duration,
        newToast.id
      );
  };

  return [toasts, addToast, removeToast];
};

export default useToast;
