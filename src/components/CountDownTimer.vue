<template>
    <!-- Timer Widget-->
    <div id="timer" >
      <div>
        <p style="color: black;
        font-weight:500;
  font-size: 140px;
  
  margin: inherit;">
          {{ currentSecond }}
        </p>
      </div>
    </div>
  </template>
  <script setup>
import { useSetParamsStore } from '@/libs/siteParams';
import IconCloseCircleOutline from '~icons/mdi/close-circle-outline';
import { useCountDownTimer } from "@/libs/useCountDownTimer";
import { watch, onMounted } from 'vue';
let saveSetName = "";

const  store  = useSetParamsStore();
const { currentSecond, runCountdownTimer } = useCountDownTimer();
watch(() => currentSecond.value, (newValue, oldValue) =>{
    if (newValue == 0){
        store.setName = saveSetName;
        store.editMode = "Play";
        store.startTimer();
    }
})
onMounted(() => {
    console.log("Mounted CountDown", store.editMode)
    saveSetName = store.setName
    store.setName = "Get Ready, In..."
    runCountdownTimer();
})
</script>