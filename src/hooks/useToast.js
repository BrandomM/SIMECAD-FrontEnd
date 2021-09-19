import { useToastDispatchContext } from "../context/ToastContext";

export function useToast() {
  const dispatch = useToastDispatchContext();

  function toast(severity, message) {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: "ADD_TOAST",
      toast: {
        severity,
        message,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: "DELETE_TOAST", id });
    }, 3000);
  }

  return toast;
}
