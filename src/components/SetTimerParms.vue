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

    <div v-if="store.setType == 'Standard' || store.setType == 'Superset'">
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
      <div class="row">
        <div class="column" style="font-weight: 500; padding-top: 3px">
          Total workout time: {{ store.sets * minPerSet }}
        </div>
      </div>
    </div>

    <div v-if="store.setType == 'EMOM'">
      <div class="row">
        <div class="column">
          <div>How many Sets?:</div>
          <div><input type="number" v-model="store.sets" @change="changeSets($event)" /></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercises:</div>
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
      <div class="row">
        <div class="column" style="font-weight: 500; padding-top: 3px">
          Total workout time: {{ store.sets * store.exercises.length }}
        </div>
      </div>
    </div>

    <div v-if="store.setType == 'AMRAP'">
      <div class="row">
        <div class="column">
          <div>How many Minutes?:</div>
          <div>
            <input type="number" v-model="store.minPerSet" @change="changeMinPerSet($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercise(s):</div>
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
      <!-- <div class="row">
        <div class="column" style="font-weight: 500; padding-top: 3px">
          Total workout time: {{ store.minPerSet }}
        </div>
      </div> -->
    </div>
    <div v-if="store.setType == 'Tabata'">
      <div class="row">
        <div class="column">
          <div>How many Rounds?:</div>
          <div><input type="number" v-model="rounds" @change="changeSets($event)" /></div>
        </div>
        <div class="column">
          <div>Seconds On?</div>
          <div>
            <input type="number" v-model="secondsOn" @change="changeMinPerSet($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Seconds Off?</div>
          <div>
            <input type="number" v-model="secondsOff" @change="changeMinPerSet($event)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div>Add Exercises:</div>
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
      <div class="row">
        <div class="column" style="font-weight: 500; padding-top: 3px">
          Total workout time: {{ (rounds * (secondsOn + secondsOff)) / 60 }} minutes.
        </div>
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
  { key: 'Superset', value: 'Superset' },
  { key: 'EMOM', value: 'EMOM' },
  { key: 'AMRAP', value: 'AMRAP' },
  { key: 'Tabata', value: 'Tabata' }
])
let secondsOn = ref(20)
let secondsOff = ref(10)
let rounds = ref(8)
let numOfSets = ref(store.getSets)
function changeMinPerSet(event) {
  store.updateMinPerSet(event.target.value)
}
function changeSets(event) {
  store.updateSets(event.target.value)
}
function changeSetType(event) {
  store.updateSetType(event.target.value)
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
