
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../context/redux/userSlice";
import { startLoading, stopLoading } from "../../context/redux/loadingSlice";

const SECRET_KEY = "your-very-secure-key"; // Use a strong, unique key

// Encrypt data before storing
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data when retrieving
export const decryptData = (encryptedData) => {
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
  dispatch ,
  setStore,
  
) => {
  dispatch(startLoading())
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
      
      return;
    }

    localStorage.setItem("store", encryptData(data.store));

     // Encrypt only the name and email (creating a new object for the encrypted data)
     const encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify({ name: data.name, email: data.email }),
      SECRET_KEY
    ).toString();

    // Update localStorage with encrypted name and email
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const userExists = accounts.some(account => {
      try {
        const decryptedAccount = CryptoJS.AES.decrypt(account.user, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const parsedAccount = JSON.parse(decryptedAccount);
        return parsedAccount.email === data.email;
      } catch (err) {
        return false;
      }
    });

    if (!userExists) {
      accounts.push({ user: encryptedUser });
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    dispatch(loginSuccess(data.user))
    setStore(data.store);
    dispatch(stopLoading())
    navigate(`/store-panel/home`);
  } catch (error) {
    console.error("Error:", error);
   dispatch(loginFailure('Eorr'))
   dispatch(stopLoading())
  } finally {
    dispatch(loginFailure('Eorr'))
    dispatch(stopLoading())
  }
};

export const HandleLogIn = async (
  input,
  navigate,
  dispatch
) => { 
  dispatch(startLoading())
  
  try {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(input),
    });

    const data = await res.json();
    console.log(data);

    if (data.error) {
      console.error("Error:", data.error);
      return;
    }


    // Encrypt only the name and email (creating a new object for the encrypted data)
    const encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify({ name: data.name, email: data.email }),
      SECRET_KEY
    ).toString();

    // Update localStorage with encrypted name and email
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const userExists = accounts.some(account => {
      try {
        const decryptedAccount = CryptoJS.AES.decrypt(account.user, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const parsedAccount = JSON.parse(decryptedAccount);
        return parsedAccount.email === data.email;
      } catch (err) {
        return false;
      }
    });

    if (!userExists) {
      accounts.push({ user: encryptedUser });
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    
  
    dispatch(loginSuccess(data));
    dispatch(stopLoading())
    navigate(`/store-list`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    dispatch(stopLoading())
  }
};

export const authUser = () => async (dispatch) => {
  dispatch(startLoading())
  try {
      const response = await fetch('http://localhost:8080/api/protected', {
          method: 'GET',
          credentials: 'include',
      });
      const data = await response.json();
      console.log(data);

      
      if (data && data.user && data.user._id ) {
      
          dispatch(loginSuccess(data.user));
      } else {
                dispatch(loginFailure('Login failed: Incomplete data.'));
      }
  } catch (error) {
      console.log(error);
      dispatch(loginFailure('Login failed. Please try again.'));
  } finally {
      dispatch(stopLoading())
  }
};
