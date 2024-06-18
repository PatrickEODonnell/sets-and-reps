<template>
  <!-- Timer Widget-->
  <div id="timer">
    <div id="set-counter">
      <h1>Set:&nbsp;</h1>
      <h1 id="sets-complete">1</h1>
      <h1 id="sets-total">/4</h1>
    </div>

    <div>
      <p id="time">{{ String(minClock) }}:{{ right('00' + String(secClock), 2) }}</p>
    </div>

    <div id="controls">
      <button id="reset">
        <img src="../assets/reset.svg" />
        <p class="sr-only">Reset timer</p>
      </button>
      <button id="play">
        <img id="play-pause" src="../assets/play.svg" />
        <p class="sr-only">Play</p>
      </button>
    </div>

    <button id="complete" class="normal-16 ripplebutton">
      <img src="../assets/check.png" />
      Workout Completed
      <div></div>
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(['timerDetails'])
let numOfMin = ref(props.timerDetails.min_per_set)
let numOfSec = ref(numOfMin.value * 60)
let minClock = ref(~~(numOfSec.value / 60))
let secClock = ref(numOfSec.value % 60)

const right = (str, len) => {
  console.log(str, str.length)
  return str.substring(str.length - 2, str.length)
}
</script>
