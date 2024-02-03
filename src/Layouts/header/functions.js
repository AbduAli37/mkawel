import { toast } from "react-toastify";

export const logOut = () => {
  localStorage.removeItem("mkawel_data");
  toast.success("تم تسجيل الخروج بنجاح");
  window.location.href = "/login";
};
