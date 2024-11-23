<template>
  <!-- Timer Widget-->
  <div id="timer">
    <div id="set-counter">
      <h1>Set:&nbsp;</h1>
      <h1 id="sets-complete">{{ store.getSet }}</h1>
      <h1 id="sets-total" v-if="store.setType != 'AMRAP'">/{{ store.sets }}</h1>
    </div>
    <div v-if="store.getSetType != 'EMOM' && store.getSetType != 'Tabata'">
      <p id="time">
        {{ String(store.getMinutes) }}:{{ right("00" + String(store.getSeconds), 2) }}
      </p>
    </div>
    <div v-if="store.getSetType == 'EMOM'">
      <p id="emom-time">
        {{ store.getCurrentExerciseLabel }} <br /><span style="font-size: 120px; font-weight: 400"
          >:{{ right("00" + String(store.getSeconds), 2) }}</span
        >
      </p>
    </div>
    <div v-if="store.getSetType == 'Tabata'">
      <p :class="onOffClass">
        {{ store.tabataOnOffMessage }}
      </p>

    </div>
    <div v-if="store.getSetType == 'Tabata'">
      <p id="time">
        {{ String(store.getTabataMinRemaining) }}:{{ right("00" + String(store.getTabataSecRemaining), 2) }}
      </p>
    </div>

    <div id="controls">
      <button class="sr-button" @click="stopTimer($event)" v-if="store.timerIsRunning">
        <IconStopCircleOutline style="font-size: 40; vertical-align: middle;" />
        <!-- <img id="play-pause" src="../assets/stop.svg" /> -->
      </button>
      <button class="sr-button" @click="startTimer($event)" v-if="!store.timerIsRunning">
          <IconPlayCircleOutline style="font-size: 40px;vertical-align: middle;" />
        <!-- <img id="play-pause" src="../assets/play.svg" /> -->
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
import { useSetParamsStore } from "@/libs/siteParams";
import { computed } from "vue";
import IconPlayCircleOutline from '~icons/mdi/play-circle-outline';
import IconStopCircleOutline from '~icons/mdi/stop-circle-outline';
const store = useSetParamsStore();
const right = (str, len) => {
  return str.substring(str.length - 2, str.length);
};
function startTimer(event) {
  console.log ("Set Type: ", store.getSetType);
  if (store.getSetType == "Standard" || store.getSetType == "Superset") {
    store.startStandardTimer();
  } else if (store.getSetType == "EMOM") {
    store.startEmomTimer();
  } else if (store.getSetType == "AMRAP") {
    store.sets = 1;
    store.startStandardTimer();
  } else if (store.getSetType == "Tabata") {
    store.startTabataTimer();
  }
}
function stopTimer(event) {
  store.stopTimer();
}
const onOffClass = computed(() => {
  return {
    tabataon: store.tabataOnOffMessage == "Go",
    tabataoff: store.tabataOnOffMessage != "Go"
  }
});
</script>
<style scoped>
#emom-time {
  text-align: center;
  color: black;
  font-size: 35px;
  font-weight: 400;
  margin: inherit;
}
.tabataon{
  text-align: center;
  color: green;
  font-size: 60px;
  font-weight: 400;
  margin: inherit;

}
.tabataoff{
  text-align: center;
  color: red;
  font-size: 60px;
  font-weight: 400;
  margin: inherit;

}


</style>

