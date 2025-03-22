<template>
  <!-- Timer Widget-->
  <div id="timer" >
    <div id="set-counter">
      <h1>Set:&nbsp;</h1>
      <h1 id="sets-complete">{{ store.getSet }}</h1>
      <h1 id="sets-total" v-if="store.setType != 'AMRAP'">/{{ store.sets }}</h1>
    </div>
    <button id="close" v-if="showClose" class="close-button" @click="closeTImer" >
      <IconCloseCircleOutline />
    </button>
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
        <IconStopCircleOutline style="font-size: 40px; vertical-align: middle;" />
        <!-- <img id="play-pause" src="../assets/stop.svg" /> -->
      </button>
      <button class="sr-button" @click="startTimer($event)" v-if="!store.timerIsRunning">
          <IconPlayCircleOutline style="font-size: 40px;vertical-align: middle;" />
        <!-- <img id="play-pause" src="../assets/play.svg" /> -->
        <p class="sr-only">Play</p>
      </button>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
    <div v-if="showWorkoutCompleted">
      <button id="logSetAndRecord" class="form-button" @click="recordWeight" style="margin-right: 5px;">
      Record Set
    </button>
    </div>
    </div>
  </div>
</template>
<script setup>
import { useSetParamsStore } from "@/libs/siteParams";
import { computed, onMounted, watch } from "vue";
import IconPlayCircleOutline from '~icons/mdi/play-circle-outline';
import IconStopCircleOutline from '~icons/mdi/stop-circle-outline';
import IconCloseCircleOutline from '~icons/mdi/close-circle-outline';

const store = useSetParamsStore();
const right = (str, len) => {
  return str.substring(str.length - 2, str.length);
};
const closeTImer = () => {
  console.log("Close Timer")
  if (store.setName != ""){
    store.editMode = "Edit"
  } else {
    store.editMode = "Add"
  }
  store.showWorkoutCompleted = false;
}
const showWorkoutCompleted = computed(()=>{
  return store.showWorkoutCompleted && store.setName != "";
});
const showClose = computed(()=>{
  return store.showWorkoutCompleted;
})
const logSet = async () => {
  console.log("Log set");
  await store.logSet();
  store.showTimerParms = true;
  store.showWorkoutCompleted = false;

}
const recordWeight = () => {
  console.log("Record Weight");
  store.editMode = "Log";
}
function startTimer(event) {
  if (store.countdownEnabled == true){
    store.editMode = "CountDown"
  } else {
    store.startTimer();
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
watch(() => store.editMode, (newValue, oldValue) => {
  console.log(newValue, oldValue);
})
onMounted(() => {
  console.log(store.editMode);
})
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

