"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

type ToastContextValues = {
  toasts: Toast[];
};

type ToastControlValues = {
  addToast: (params: { message: string }) => void;
  removeToast: (id: number) => void;
};

type Toast = {
  id: number;
  message: string;
};

const ToastContext = createContext<ToastContextValues | undefined>(undefined);
const ToastControlContext = createContext<ToastControlValues | undefined>(
  undefined
);

export function ToastProvider(props: React.PropsWithChildren) {
  const { addToast, removeToast, toasts } = useToasts();

  const controls = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast]
  );

  return (
    <ToastControlContext value={controls}>
      <ToastContext value={{ toasts }}>{props.children}</ToastContext>
    </ToastControlContext>
  );
}

function useToastCtx() {
  const data = useContext(ToastContext);

  if (!data) {
    throw new Error("useToastCtx must be used within ToastProvider");
  }

  return data;
}

export function useToast() {
  const controls = useContext(ToastControlContext);

  if (!controls) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return controls;
}

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback(
    (id: number) => {
      setToasts((prevToasts) => {
        return prevToasts.filter((t) => t.id !== id);
      });
    },
    [setToasts]
  );

  const addToast = useCallback(
    (params: { message: string }) => {
      const id = ++toastIdRef.current;
      setToasts((prev) => {
        return [...prev, { id, message: params.message }];
      });

      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [setToasts, removeToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
  };
}

export function Toast() {
  const { toasts } = useToastCtx();
  const { removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 m-4 bg-gray-50">
      <ul className="flex flex-col gap-4">
        {toasts.map((toast) => (
          <li
            key={toast.id}
            className="border border-gray-300 p-4 rounded-md shadow-md min-w-80 w-fit"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <span className="inline-block mr-2">✅</span>
                {toast.message}
              </div>

              <button
                className="shrink-0 self-start"
                onClick={() => removeToast(toast.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
