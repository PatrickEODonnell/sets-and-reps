<template>
  <div id="timer-input">
    <div class="row">
      <div class="column" style="text-align: center">
        <div>Choose type of Set:</div>
        <div>
          <select v-model="timerDetails.set_type" @change="changeItem($event)">
            <option v-for="type in setTypes" :key="type.key">
              {{ type.value }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <div>How many Sets?:</div>
        <div><input type="text" v-model="timerDetails.sets" @change="changeSets($event)" /></div>
      </div>
      <div class="column">
        <div>Minutes per Set?</div>
        <div>
          <input type="text" v-model="minPerSet" @change="changeMinPerSet($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSetParamsStore } from '@/libs/siteParams'

const store = useSetParamsStore()
const props = defineProps(['timerDetails'])
const emits = defineEmits(['onChangeParams'])
let timerDetails = props.timerDetails
let minPerSet = ref(store.getMinPerSet)
let selected_set_type = props.timerDetails.set_type
const setTypes = ref([
  { key: 'Standard', value: 'Standard' },
  { key: 'EMOM', value: 'EMOM' },
  { key: 'Tabata', value: 'Tabata' }
])
let numOfSets = ref(props.timerDetails.numOfSets)
let numOfMin = ref(props.timerDetails.numOfMin)
function changeMinPerSet(event) {
  console.log(event.target.value)
  store.updateMinPerSet(event.target.value)

  console.log('minPerSet', store.getMinPerSet)
  // emits('onChangeParams', timerDetails)
}
function changeSets(event) {
  console.log(event.target.value)
  store.updateSets(event.target.value)

  console.log('sets', store.getSets)
  // emits('onChangeParams', timerDetails)
}
</script>

<style>
#timer-input {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  position: relative;

  border-radius: 20px;
  border: 1px solid black;
}
</style>
