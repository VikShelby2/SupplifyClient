import { atom } from "recoil";

const sidebarAtom = atom({
  key: "loadingAtom",
  default: false, 
});

export default sidebarAtom;
