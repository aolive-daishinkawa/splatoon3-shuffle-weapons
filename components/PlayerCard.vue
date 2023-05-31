<template lang="pug">
  v-card.my-4(:color="isAgainstTeam ? '#EAFF3D' : '#603BFF'")
    v-card-text
      v-row(align="center")
        v-col(cols="2")
          v-switch.mt-0(
            v-model="privateDisabled"
            :true-value="false"
            :false-value="true"
            color="#FF6B00"
            @change="$emit('update:disabled', privateDisabled)"
            hide-details
            light
          )
        v-col(cols="10")
          v-text-field(
            v-model="privateName"
            @input="$emit('update:name', privateName)"
            :disabled="disabled"
            :background-color="disabled ? '#BDBDBD' : 'white'"
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
            :disabled="disabled"
            @change="$emit('update:is-shuffle-weapon', privateIsShuffleWeapon)"
            hide-details
            light
            color="#FF6B00"
          )
        v-col(
          cols="10"
          :class="isAgainstTeam ? 'weapon-text-against' : 'weapon-text'"
        )
          | {{ weapon && !disabled ? weapon.name : '' }}
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import { Weapon } from '~/types/Weapon';

@Component({})
export default class PlayerCard extends Vue {
  @Prop() public name!: string
  @Prop() public disabled!: boolean
  @Prop() public isShuffleWeapon!: boolean
  @Prop() public weapon!: Weapon | null
  @Prop() public index!: number
  @Prop({default: false}) public isAgainstTeam?: boolean

  @Watch('name')
  updatePrivateName() {
    this.privateName = this.name
  }

  @Watch('name')
  updateprivateIsShuffleWeapon() {
    this.privateIsShuffleWeapon = this.isShuffleWeapon
  }

  privateName: string = this.name
  privateDisabled: boolean = this.disabled
  privateIsShuffleWeapon: boolean = this.isShuffleWeapon

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
