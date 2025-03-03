import { atom } from "recoil";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secure-encryption-key";
const decryptData = (encryptedData) => {
	try {
	  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
	  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
	  console.error("Failed to decrypt data:", error);
	  return null;
	}
  };

const userAtom = atom({
  key: "userAtom",
  default: decryptData(localStorage.getItem("user-threads"))
});

export default userAtom;
