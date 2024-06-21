<template>
  <div id="timer-input">
    <div id="edit-heading"><h1>Edit Timer Details</h1></div>
    <div class="row">
      <div class="column">
        <div>Choose type of Set:</div>
        <div>
          <select v-model="store.setType" @change="changeSetType($event)">
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
        <div><input type="number" v-model="store.sets" @change="changeSets($event)" /></div>
      </div>
      <div class="column">
        <div>Minutes per Set?</div>
        <div>
          <input type="number" v-model="minPerSet" @change="changeMinPerSet($event)" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div>Add Exercises (optional):</div>
        <div><input type="text" v-model="newExercise" /></div>
      </div>
      <div class="column">
        <div>&nbsp;</div>
        <button @click="addExercise($event)" class="form-button">
          <img id="play-pause" src="../assets/add.svg" />
          <p class="sr-only">Add</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSetParamsStore } from '@/libs/siteParams'
const store = useSetParamsStore()
let minPerSet = ref(store.getMinPerSet)
let newExercise = ref('')
const setTypes = ref([
  { key: 'Standard', value: 'Standard' },
  { key: 'EMOM', value: 'EMOM' },
  { key: 'Tabata', value: 'Tabata' }
])
let numOfSets = ref(store.getSets)
function changeMinPerSet(event) {
  // console.log(event.target.value)
  store.updateMinPerSet(event.target.value)

  // console.log('minPerSet', store.getMinPerSet)
  // console.log('Minutes', store.minutesRemaining)
  // console.log('Seconds', store.secondsRemaining)
}
function changeSets(event) {
  // console.log(event.target.value)
  store.updateSets(event.target.value)

  // console.log('sets', store.getSets)
  // emits('onChangeParams', timerDetails)
}
function changeSetType(event) {
  console.log(event.target.value)
}
function startTimer(event) {
  store.startStandardTimer()
}
function addExercise(event) {
  store.addExercise(newExercise.value)
  newExercise.value = ''
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
