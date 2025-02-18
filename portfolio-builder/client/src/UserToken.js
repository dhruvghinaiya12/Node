// UserToken.js
import { jwtDecode } from "jwt-decode"; 
import Cookies from "js-cookie";

export const UserToken = () => {
  let token = Cookies.get("token");
  // console.log("Token from Cookies:", token);
  return token ? jwtDecode(token) : null;  
};
