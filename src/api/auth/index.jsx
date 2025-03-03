import toast from "react-hot-toast";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your-very-secure-key"; // Use a strong, unique key

// Encrypt data before storing
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data when retrieving
const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Failed to decrypt data:", error);
    return null;
  }
};

export const HandleSignUp = async (
  input,
  navigate,
  setUser,
  setStore,
  setLoggedIn,
  setLoading
) => {
  try {
    const res = await fetch("http://localhost:8080/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Error:", data.error);
      toast.error("There was an error, please try again.");
      return;
    }

    // Encrypt and save user and store data to local storage
    localStorage.setItem("user-threads", encryptData(data.user));
    localStorage.setItem("store", encryptData(data.store));

    // Add the logged-in account to the 'accounts' array in local storage
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    if (accounts) {
      accounts = accounts.map((account) => ({
        user: decryptData(account.user), // Decrypt existing accounts
      }));
    } else {
      accounts = [];
    }

    const userExists = accounts.some(
      (account) => account.user._id === data.user._id
    );

    if (!userExists) {
      accounts.push({ user: data.user });
      const encryptedAccounts = accounts.map((account) => ({
        user: encryptData(account.user), // Encrypt accounts again
      }));
      localStorage.setItem("accounts", JSON.stringify(encryptedAccounts));
    }

    toast.success("Sign up went successfully");
    setUser(data.user);
    setStore(data.store);
    setLoggedIn(true);

    navigate(`/store-panel/${data.store._id}/home`);
  } catch (error) {
    console.error("Error:", error);
    toast.error("There was an error, please try again later.");
  } finally {
    setLoading(false);
  }
};
