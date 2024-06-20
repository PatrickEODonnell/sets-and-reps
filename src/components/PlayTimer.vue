<template>
  <!-- Timer Widget-->
  <div id="timer">
    <div id="set-counter">
      <h1>Set:&nbsp;</h1>
      <h1 id="sets-complete">{{ store.getSet }}</h1>
      <h1 id="sets-total">/{{ store.getSets }}</h1>
    </div>

    <div>
      <p id="time">
        {{ String(store.getMinutes) }}:{{ right('00' + String(store.getSeconds), 2) }}
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

    <button id="complete" class="normal-16 ripplebutton" v-if="!store.timerIsRunning">
      <img src="../assets/check.png" />
      Workout Completed
      <div></div>
    </button>
  </div>
</template>
<script setup>
import { useSetParamsStore } from '@/libs/siteParams'

const store = useSetParamsStore()
console.log(store.getSet)
const right = (str, len) => {
  return str.substring(str.length - 2, str.length)
}
function startTimer(event) {
  store.startStandardTimer()
}
function stopTimer(event) {
  store.stopTimer()
}
</script>
