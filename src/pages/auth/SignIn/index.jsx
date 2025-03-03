import React, { useEffect, useState } from "react";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import CryptoJS from "crypto-js";
import logo from '../../../assets/public/home/home-logo-purple.svg';
import { Link, useNavigate } from "react-router-dom";
import userAtom from "../../../context/atoms/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loadingAtom from "../../../context/atoms/loadingAtom";
import isLogged from "../../../context/atoms/loggedAtom";
import { cn } from "../../../lib/utils";
import { Label } from "../../public/Home/components/label";
import { Input } from "../../public/Home/components/input";
import { storeAtom } from "../../../context/atoms/storeAtom";
import AuthLayout from "../../../layout/auth";

function SignIn() {
  const ENCRYPTION_KEY = "your-secure-encryption-key"; // Replace with a secure key
  const setLoggedIn = useSetRecoilState(isLogged);
  const setLoading = useSetRecoilState(loadingAtom);
  const [editEmail, setEditEmail] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const store = useRecoilValue(storeAtom);
  const setUser = useSetRecoilState(userAtom);
  const [input, setInput] = useState({
    email: user ? user.email : '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("user-threads");
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    if (token && accounts) {
      navigate(`/store-list`);
    }
   
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
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
      console.log(data)
      if (data.error) {
        console.error("Error", data.error, "error");
        return;
      }
      setLoggedIn(true);

      // Encrypt and save user data
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();

      // Update local storage
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      const userExists = accounts.some(account => account.user && account.user._id === data._id);
      if (!userExists) {
        accounts.push({ user: encryptedUser });
        localStorage.setItem("accounts", JSON.stringify(accounts));
      }

      localStorage.setItem("user-threads", encryptedUser);
      setUser(data);
      navigate(`/store-list`);
    } catch (error) {
      console.log("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <AuthLayout>
      <div className="center">
        <h1 className="text-3xl tracking-[-0.10em] text-black font-bold">Supplify</h1>
        <img className="size-7 flex items-center justify-center" src={logo} />
      </div>

      <form className="my-8" onSubmit={handleSubmit}>
        {user && user.email && !editEmail ? (
          <div className="w-full flex mb-3 justify-center items-center">
            <button onClick={() => { setEditEmail(true); }} className="group p-[4px] w-full rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]">
              <div className="bg-gradient-to-b from-stone-200/40 to-white/80 flex items-center justify-center rounded-[8px] px-[1rem] py-2">
                <div className="flex gap-2 items-center">
                  <span className="font-semibold">Change Email</span>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={input.email}
              onChange={(event) => setInput({ ...input, email: event.target.value })}
            />
          </LabelInputContainer>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••••••"
            type="password"
            value={input.password}
            onChange={(event) => setInput({ ...input, password: event.target.value })}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={handleLogin}
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-400">
          If you haven't already registered <Link to={'/signUp'}><span className="font-bold text-bold text-purple-300">Sign Up</span></Link>
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

export default SignIn;
