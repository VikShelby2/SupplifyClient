import { atom } from 'recoil'
import { decryptData } from '../../lib/crypto'

export const storeAtom = atom({
  key: 'storeAtom',
  default: decryptData(localStorage.getItem('store')),
})
