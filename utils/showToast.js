import { toast } from "react-hot-toast";

export const showToast = (type, message) => {
  const commonStyle = {
    padding: "16px",
    display: "flex",
    gap: "5px",
    border: "1px solid",
  };

  if (type === "error") {
    toast.error(message, {
      style: { ...commonStyle, borderColor: "red", color: "red" },
      iconTheme: { primary: "red", secondary: "white" },
    });
  } else if (type === "success") {
    toast.success(message, {
      style: { ...commonStyle, borderColor: "green", color: "green" },
      iconTheme: { primary: "green", secondary: "white" },
    });
  }
};