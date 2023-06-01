<template lang="pug">
  div
    v-row.my-4(justify="center")
      v-col(cols="auto")
        h1 スプラトゥーン３ ブキシャッフル
    v-row
      v-col(cols="12" sm="6")
        v-card.ma-0(color="#EAFF3D")
          v-card-text
            template(v-for="(player, i) in players.slice(0, 4)")
              player-card(
                :name.sync="player.name"
                :disabled.sync="player.disabled"
                :is-shuffle-weapon.sync="player.isShuffleWeapon"
                :weapon-index="player.weaponIndex"
                :index="i + 1"
                :loading="loading"
                :weapons-choices="weaponsChoices"
              )

      v-col(cols="12" sm="6")
        v-card.ma-0(color="#603BFF")
          v-card-text
            template(v-for="(player, i) in players.slice(4, 8)")
              player-card(
                :name.sync="player.name"
                :disabled.sync="player.disabled"
                :is-shuffle-weapon.sync="player.isShuffleWeapon"
                :weapon-index="player.weaponIndex"
                :is-against-team="true"
                :index="i + 5"
                :loading="loading"
                :weapons-choices="weaponsChoices"
              )

    v-row
      v-col(cols="12" sm="6")
        v-btn.font-weight-bold(
          color="#FF6B00"
          block
          @click="execShuffleWeapons"
          :disabled="shuffleWeaponsInstance"
        ) ブキシャッフル

      v-col(cols="12" sm="6")
        v-btn.font-weight-bold(
          color="#FF6B00"
          block
          size="large"
          @click="execShufflePlayers"
          :disabled="shufflePlayersInstance"
        ) プレイヤーシャッフル

    v-snackbar(
      v-model="snackbar"
      centered
      timeout="1000"
      color="rgba(0, 0, 0, 0.8)"
    ) {{ snackbarMessage }}

    hr(style="margin-top: 120px; margin-bottom: 24px;")
    v-row
      v-col.pb-0(cols="12")
        h3 ブキ一覧
        span.text-caption ※ 合計 {{ allWeapons.length }} 種類
    v-row
      v-col(cols="auto")
        v-chip(v-for="weapon in allWeapons" x-small) {{ weapon.name }}


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Player } from '~/types/Player'
import WEAPONS from '~/assets/weapons.json'
import {Weapon} from "~/types/Weapon";

@Component({})
export default class IndexPage extends Vue {
  players: Array<Player> = [
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: '',
      weaponIndex: null,
      disabled: false,
      isShuffleWeapon: true,
    },
  ]

  shuffleWeaponsInstance: any = null
  shufflePlayersInstance: any = null

  snackbar: boolean = false
  snackbarMessage: string = ''

  get loading() {
    return this.shuffleWeaponsInstance || this.shufflePlayersInstance
  }

  get allWeapons() {
    return WEAPONS
  }

  get weaponsChoices(): Array<{text: string, value: number}> {
    return this.allWeapons.map((v: Weapon, i: number) => ({
      text: v.name,
      value: i,
    }))
  }

  execShuffleWeapons() {
    this.shuffleWeaponsInstance = setInterval(this.shuffleWeapons, 50)
    setTimeout(() => {
      clearInterval(this.shuffleWeaponsInstance)
      this.shuffleWeaponsInstance = null
      this.openSnackbar('シャッフル完了!!')
    }, 2000)
    this.openSnackbar('ブキをシャッフルします')
  }

  shuffleWeapons() {
    const shuffleIndexes: Array<string> = []
    for (const i in this.players) {
      if (this.players[i].isShuffleWeapon) {
        shuffleIndexes.push(i)
      }
    }
    for (const i of shuffleIndexes) {
      this.players[Number(i)].weaponIndex = this.getRandomWeaponIndex()
    }
  }

  execShufflePlayers() {
    this.shufflePlayersInstance = setInterval(this.shufflePlayers, 50)
    setTimeout(() => {
      clearInterval(this.shufflePlayersInstance)
      this.shufflePlayersInstance = null
      this.openSnackbar('シャッフル完了!!')
    }, 2000)
    this.openSnackbar('プレイヤーをシャッフルします')
  }

  shufflePlayers() {
    const shuffleIndexes: Array<string> = []
    const notShuffleIndexes: Array<string> = []
    for (const i in this.players) {
      if (!this.players[i].disabled) {
        shuffleIndexes.push(i)
      } else {
        notShuffleIndexes.push(i)
      }
    }
    this.arrayShuffle(shuffleIndexes)

    const newPlayersArray: Array<Player> = []
    for (const i in this.players) {
      if (notShuffleIndexes.includes(i)) {
        newPlayersArray[i] = this.players[i]
      } else {
        newPlayersArray[i] = this.players[Number(shuffleIndexes.pop())]
      }
    }
    this.players = [...newPlayersArray]

  }

  openSnackbar(msg: string) {
    this.snackbarMessage = msg
    this.snackbar = true
  }


  getRandomWeaponIndex() {
    return (Math.floor(Math.random() * WEAPONS.length))
  }

  arrayShuffle(array: Array<any>) {
    for(let i = (array.length - 1); i > 0; i--){

      // 0〜(i+1)の範囲で値を取得
      const r = Math.floor(Math.random() * (i + 1))

      // 要素の並び替えを実行
      const tmp = array[i]
      array[i] = array[r]
      array[r] = tmp
    }
    return array
  }

}

</script>

<style lang="scss">
.btn-text {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
