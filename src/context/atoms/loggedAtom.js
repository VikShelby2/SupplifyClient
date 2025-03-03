import { atom } from "recoil";

const isLogged = atom({
  key: 'isLogged' ,
  default: false
})

export default isLogged