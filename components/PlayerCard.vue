<template lang="pug">
  v-card.my-4(:color="isAgainstTeam ? '#EAFF3D' : '#603BFF'")
    v-card-text
      v-row(align="center")
        v-col(cols="2")
          v-switch.mt-0(
            v-model="privateDisabled"
            :true-value="false"
            :false-value="true"
            :disabled="loading"
            color="#FF6B00"
            @change="openSnackbar(privateDisabled ? 'プレイヤーを無効にしました' : 'プレイヤーを有効にしました'); $emit('update:disabled', privateDisabled)"
            hide-details
            light
          )
        v-col(cols="10")
          v-text-field(
            v-model="privateName"
            @input="$emit('update:name', privateName)"
            :disabled="disabled || loading"
            :background-color="disabled || loading ? '#BDBDBD' : 'white'"
            :hide-details="true"
            :placeholder="`プレイヤー${index}`"
            outlined
            dense
            light
          )
      v-row(align="center")
        v-col(cols="2")
          v-switch.mt-0(
            v-model="privateIsShuffleWeapon"
            :disabled="disabled || loading"
            @change="openSnackbar(privateIsShuffleWeapon ? 'ブキシャッフルを有効にしました' : 'ブキシャッフルを無効にしました'); $emit('update:is-shuffle-weapon', privateIsShuffleWeapon)"
            hide-details
            light
            color="#FF6B00"
          )
        v-col(
          cols="10"
          :class="isAgainstTeam ? 'weapon-text-against' : 'weapon-text'"
        )
          v-select(
            v-model="privateWeaponIndex"
            :items="weaponsChoices"
            :disabled="disabled || loading"
            :background-color="disabled || loading ? '#BDBDBD' : 'white'"
            outlined
            dense
            hide-details
            light
          )

      v-snackbar(
        v-model="snackbar"
        centered
        timeout="1000"
        color="rgba(0, 0, 0, 0.8)"
      ) {{ snackbarMessage }}
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import { Weapon } from '~/types/Weapon';

@Component({})
export default class PlayerCard extends Vue {
  @Prop() public name!: string
  @Prop() public disabled!: boolean
  @Prop() public isShuffleWeapon!: boolean
  @Prop() public weaponIndex!: number | null
  @Prop() public index!: number
  @Prop({default: false}) public isAgainstTeam?: boolean
  @Prop() public loading!: boolean
  @Prop() public weaponsChoices!: Array<{text: string, value: number}>

  @Watch('name')
  updatePrivateName() {
    this.privateName = this.name
  }

  snackbar: boolean = false
  snackbarMessage: string = ''

  @Watch('name')
  updatePrivateIsShuffleWeapon() {
    this.privateIsShuffleWeapon = this.isShuffleWeapon
  }

  @Watch('weaponIndex')
  updatePrivateWeaponIndex() {
    this.privateWeaponIndex = this.weaponIndex
  }

  privateName: string = this.name
  privateDisabled: boolean = this.disabled
  privateIsShuffleWeapon: boolean = this.isShuffleWeapon
  privateWeaponIndex: number | null = null


  openSnackbar(msg: string) {
    this.snackbarMessage = msg
    this.snackbar = true
  }

}
</script>

<style lang="scss">
.weapon-text {
  font-size: 1.2rem;

  &-against {
    font-size: 1.2rem;
    color: #242424;
  }
}

</style>
