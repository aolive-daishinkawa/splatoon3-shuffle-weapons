import {Weapon} from "~/types/Weapon";

export interface Player {
  name: string
  weapon: Weapon | null
  disabled: boolean
  isShuffleWeapon: boolean
}
