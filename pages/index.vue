<template lang="pug">
  div
    v-row
      v-col(cols="6")
        v-card.ma-0(color="#EAFF3D")
          v-card-text
            template(v-for="(player, i) in players.slice(0, 4)")
              player-card(
                :name.sync="player.name"
                :disabled.sync="player.disabled"
                :is-shuffle-weapon.sync="player.isShuffleWeapon"
                :weapon="player.weapon"
                :index="i + 1"
              )

      v-col(cols="6")
        v-card.ma-0(color="#603BFF")
          v-card-text
            template(v-for="(player, i) in players.slice(4, 8)")
              player-card(
                :name.sync="player.name"
                :disabled.sync="player.disabled"
                :is-shuffle-weapon.sync="player.isShuffleWeapon"
                :weapon="player.weapon"
                :is-against-team="true"
                :index="i + 5"
              )

    v-row
      v-col(cols="6")
        v-btn.font-weight-bold(
          color="#FF6B00"
          block
          @click="execShuffleWeapons"
        ) ブキシャッフル

      v-col(cols="6")
        v-btn.font-weight-bold(
          color="#FF6B00"
          block
          size="large"
          @click="shufflePlayers"
        ) プレイヤーシャッフル

    pre {{ players }}


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Player } from '~/types/Player'
import WEAPONS from '~/assets/weapons.json'

@Component({})
export default class IndexPage extends Vue {
  players: Array<Player> = [
    {
      name: 'いち',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'に',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'さん',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'よん',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'ご',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'ろく',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'なな',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
    {
      name: 'はち',
      weapon: null,
      disabled: false,
      isShuffleWeapon: true,
    },
  ]

  shuffle: any = {}

  execShuffleWeapons() {
    this.shuffle = setInterval(this.shuffleWeapons, 50)
    setTimeout(() => { clearInterval(this.shuffle)}, 2000)
  }

  shuffleWeapons() {
    const shuffleIndexes: Array<string> = []
    for (const i in this.players) {
      if (this.players[i].isShuffleWeapon) {
        shuffleIndexes.push(i)
      }
    }
    for (const i of shuffleIndexes) {
      this.players[Number(i)].weapon = {...this.getRandomWeapon()}
    }
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


  getRandomWeapon() {
    return WEAPONS[(Math.floor(Math.random() * WEAPONS.length))]
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
