import Cookies from "js-cookie";
import { useAuthMeQuery } from "../redux/auth/authApi";

export default function useAuthMe() {
  return useAuthMeQuery(null, {
    skip: !(Cookies && Cookies.get("token")),
  });
}
