import { atom } from "recoil";

const loadingAtom = atom({
  key: "loadingAtom",
  default: false, 
});

export default loadingAtom;
