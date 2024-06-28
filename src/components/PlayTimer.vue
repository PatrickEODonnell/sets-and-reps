<template>
  <!-- Timer Widget-->
  <div id="timer">
    <div id="set-counter">
      <h1>Set:&nbsp;</h1>
      <h1 id="sets-complete">{{ store.getSet }}</h1>
      <h1 id="sets-total" v-if="store.setType != 'AMRAP'">/{{ store.getSets }}</h1>
    </div>
    <div v-if="store.getSetType != 'EMOM'">
      <p id="time">
        {{ String(store.getMinutes) }}:{{ right('00' + String(store.getSeconds), 2) }}
      </p>
    </div>
    <div v-if="store.getSetType == 'EMOM'">
      <p id="emom-time">
        {{ store.getCurrentExerciseLabel }} <br /><span style="font-size: 120px; font-weight: 400"
          >:{{ right('00' + String(store.getSeconds), 2) }}</span
        >
      </p>
    </div>

    <div id="controls">
      <button id="stop" @click="stopTimer($event)" v-if="store.timerIsRunning">
        <img id="play-pause" src="../assets/stop.svg" />
        <p>Stop</p>
      </button>
      <button id="play" @click="startTimer($event)" v-if="!store.timerIsRunning">
        <img id="play-pause" src="../assets/play.svg" />
        <p class="sr-only">Play</p>
      </button>
    </div>

    <button id="complete" class="normal-16 ripplebutton" v-if="store.showWorkoutCompleted">
      <img src="../assets/check.png" />
      Workout Completed
      <div></div>
    </button>
  </div>
</template>
<script setup>
import { useSetParamsStore } from '@/libs/siteParams'

const store = useSetParamsStore()
const right = (str, len) => {
  return str.substring(str.length - 2, str.length)
}
function startTimer(event) {
  if (store.getSetType == 'Standard' || store.getSetType == 'Superset') {
    store.startStandardTimer()
  } else if (store.getSetType == 'EMOM') {
    store.startEmomTimer()
  } else if (store.getSetType == 'AMRAP') {
    store.startStandardTimer()
  }
}
function stopTimer(event) {
  store.stopTimer()
}
</script>
<style scoped>
#emom-time {
  text-align: center;
  color: black;
  font-size: 35px;
  font-weight: 400;
  margin: inherit;
}
</style>
