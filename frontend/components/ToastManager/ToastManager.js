import React, { Fragment } from "react";
import useToast from "../../hooks/useToast";
import Toast from "../Toast";

const ToastManager = () => {
  const [toasts, , removeToast] = useToast();

  return toasts.length > 0 ? (
    <>
      {toasts.map((toast) => (
        <Fragment key={toast.id}>
          <Toast
            onClose={() => removeToast(toast.id)}
            message={toast.message}
            type={toast.type}
          />
        </Fragment>
      ))}
    </>
  ) : null;
};

export default ToastManager;
