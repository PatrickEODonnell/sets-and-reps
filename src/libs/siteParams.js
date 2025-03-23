import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useIdbservice } from "./useIdbService";
import { useSound } from "@vueuse/sound";
import countdownsound from '../assets/short-beep-countdown.wav';

export const useSetParamsStore = defineStore("setParams", () => {

  // Default Values
  const defaultSetType = "Standard";
  const defaultEditMode = "Add";
  const standardMinPerSet = 3;
  const standardSets = 4;
  const amrapMinPerSet = 5
  const emomSets = 3;
  const tabataSecondsOn = 20;
  const tabataSecondsOff = 10;
  const tabataRounds = 8;
  const tabataDefaultMessage = "Go";
  const {play} = useSound(countdownsound);

  // Set Parameters
  let setType = ref("Standard");
  let sets = ref(4);
  const minPerSet = ref(3);
  let exercises = ref([]);
  let setName = ref("");
  let secondsOn = ref(20);
  let secondsOff = ref(10);
  let setId = ref(0);
  let editMode = ref("Add");
  let undoDisabled = ref(true);
  let soundEnabled = ref(false);
  let countdownEnabled = ref(false);
  
  // Backup Set Parameters
  let backSetType = "";
  let backSets = 4;
  let backMinPerSet = 3;
  let backSetName = "";
  let backSecondsOn = 20;
  let backSecondsOff = 10;
  let backSetId = 0;
  let backExercises = [];

  // Play parameters
  let set = ref(1);
  let secPerSet = ref(180);
  let minRemaining = ref(standardMinPerSet);
  let secRemaining = ref(0);
  let remainingSets = ref(standardSets);
  let timerIsRunning = ref(false);
  let stopTimerNow = ref(false);
  let currentExerciseLabel = ref("");
  let currentEmomSequence = ref(0);
  let tabataSecRemaining = ref(secondsOn.value);
  let tabataOnOffMessage = ref(tabataDefaultMessage);

  // Display parameters
  let showWorkoutCompleted = ref(false);

  // Getters
  const getMinPerSet = computed(() => minPerSet.value);
  const getSets = computed(() => sets.value);
  const getTabataMinRemaining = computed(() => {
    return ~~(tabataSecRemaining.value/60);
  });
  const getTabataSecRemaining = computed(() => {
    return tabataSecRemaining.value % 60
  })
  const getMinutes = computed(() => {
    return minRemaining.value;
  });
  const getSeconds = computed(() => {
    return secRemaining.value;
  });
  const getSet = computed(() => { return set.value});
  const getSetType = computed(() => {
    return setType.value;
  });
  const getCurrentExerciseLabel = computed(() => {
    return currentExerciseLabel.value;
  });
  const getCurrentDateTime = computed(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const hour = now.getHours();
    const min = now.getMinutes();
    const currentDateTime = `${month}-${day} ${hour}:${min}`;
    return currentDateTime;
  });
  const getCurrentTime = computed(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const hour = now.getHours();
    const min = now.getMinutes();
    const currentDateTime = `${hour}:${min}`;
    return currentDateTime;
  });

  const { addItem: addLog } = useIdbservice("logs");
  const { addItem: addSet, saveItem: saveSetItem } = useIdbservice("sets");
  // Functions
  function initSet(){
    setType.value = defaultSetType;
    sets.value = standardSets;
    updateMinPerSet(standardMinPerSet);
    setName.value = "";
    secondsOn.value = tabataSecondsOn;
    secondsOff.value = tabataSecondsOff;
    setId.value = 0;
    editMode.value = defaultEditMode;
    exercises.value = [];
    showWorkoutCompleted.value = false;
  }
  function saveOriginalSet(){
    
    backSetType = setType.value;
    backMinPerSet = minPerSet.value;
    backSecondsOff = secondsOff.value;
    backSecondsOn = secondsOn.value;
    backSetId = setId.value;
    backSetName = setName.value;
    backSets = sets.value;
    backExercises = [];
    exercises.value.forEach(exercise => {
      backExercises.push(exercise);
    
    });
    
  }
  function undoChanges(){
    setType.value = backSetType;
    minPerSet.value = backMinPerSet;
    secondsOff.value = backSecondsOff;
    secondsOn.value = backSecondsOn;
    setId.value = backSetId;
    setName.value = backSetName;
    sets.value = backSets;
    exercises.value = [];
    backExercises.forEach(exercise => {
      restoreExercise({sequence: exercise.sequence, name: exercise.name});
    });
 
  }
  function updateMinPerSet(min) {
    minPerSet.value = min;
    secPerSet.value = min * 60;
    minRemaining.value = ~~((min * 60) / 60);
    secRemaining.value = (min * 60) % 60;
  }
  function updateSets(numberOfSets) {
    sets.value = numberOfSets;
  }
  function updateSetType(type) {
    // setType.value = type
    if (type == "Standard" || type == "Superset"){
      sets.value = standardSets
      minPerSet.value = standardMinPerSet;
      minRemaining.value = standardMinPerSet;
    }
    if (type == "EMOM"){
      sets.value = emomSets;
      minPerSet.value = 1;
    }
    if (type == "AMRAP") {
      minPerSet.value = amrapMinPerSet;
      minRemaining.value = amrapMinPerSet;
      secPerSet.value = 300;
    }
    if (type == "Tabata"){
      sets.value = tabataRounds;
      set .value = 1;
      minRemaining.value = tabataSecondsOn;
    }
    set.value = 1;
  }
  function updateSoundEnabled(val){
    console.log("updateSoundEnabled", val);
    soundEnabled.value = val;
  }
  function addExercise(exercise) {
    let seq = exercises.value.length + 1;
    exercises.value.push({ sequence: seq, name: exercise });
    if (setType.value == "EMOM") {
      updateMinPerSet(exercises.value.length);
    }
  }
  function updateExercise(val, sequence) {
    for (let exercise of exercises.value) {
      if (exercise.sequence == sequence) {
        exercise.name = val;
        break;
      }
    }
  }
  function restoreExercise(ex){
    exercises.value.push({sequence: ex.sequence, name: ex.name});
  }
  function deleteExercise(val, sequence) {
    const index = exercises.value.findIndex((ex) => ex.sequence === sequence);
    exercises.value.splice(index, 1);
  }
  function clearExercises() {
    exercises.value = [];
    if (setType.value == "EMOM") {
      updateMinSecRemaining(0);
    }
    undoDisabled.value = false;
  }
  function updateMinSecRemaining(min) {
    minPerSet.value = min;
    secPerSet.value = min * 60;
    minRemaining.value = ~~(secPerSet.value / 60);
    secRemaining.value = secPerSet.value % 60;
  }
  function startTimer(){
    editMode.value = "Play"
    if (getSetType.value == "Standard" || getSetType.value == "Superset") {
      startStandardTimer();
    } else if (getSetType.value == "EMOM") {
      startEmomTimer();
    } else if (getSetType.value == "AMRAP") {
      sets.value = 1;
      startStandardTimer();
    } else if (getSetType.value == "Tabata") {
      startTabataTimer();
    }
  }
  function startStandardTimer() {
    console.log("soundEnabled", soundEnabled.value)
    let playingSound = false;
    remainingSets.value = sets.value;
    timerIsRunning.value = true;
    showWorkoutCompleted.value = false;
    set.value = 1;
    secPerSet.value = minPerSet.value * 60;
    const x = setInterval(() => {
      secPerSet.value -= 1;
      minRemaining.value = ~~(secPerSet.value / 60);
      secRemaining.value = secPerSet.value % 60;
      if (secPerSet.value < 4 && !playingSound && soundEnabled.value){
        playingSound = true;
        play();
      }
      if (secPerSet.value <= 0) {
        remainingSets.value -= 1;
        secPerSet.value = minPerSet.value * 60;
        playingSound = false;
        if (remainingSets.value <= 0) {
          secPerSet.value = 0;
          timerIsRunning.value = false;
          showWorkoutCompleted.value = true;
          clearInterval(x);
        }
        set.value += set.value < sets.value ? 1 : 0;
      }
      if (stopTimerNow.value) {
        console.log("Timer stopped.");
        secPerSet.value = 0;
        set.value = 1;
        timerIsRunning.value = false;
        stopTimerNow.value = false;
        showWorkoutCompleted.value = true;
        clearInterval(x);
      }
    }, 1000);
  }
  function startTabataTimer(){
    remainingSets.value = sets.value;
    let tabataSets = sets.value * 2;
    let timePeriodToggle = "On";
    tabataOnOffMessage.value = "Go";
    timerIsRunning.value = true;
    showWorkoutCompleted.value = false;
    set.value = 1;
    tabataSecRemaining.value = secondsOn.value;
    const x = setInterval(() => {
      tabataSecRemaining.value -= 1;
      if (tabataSecRemaining.value <= 0) {
        timePeriodToggle = timePeriodToggle == "On" ? "Off" : "On";
        console.log("Toggle: ", timePeriodToggle);
        if (timePeriodToggle == "On"){
          tabataSecRemaining.value = secondsOn.value;
          tabataOnOffMessage.value = "Go";
        }
        else{
          tabataSecRemaining.value = secondsOff.value;
          tabataOnOffMessage.value = "Rest";
        }
        tabataSets -= 1;
        if ((tabataSets % 2) === 0 ){
          remainingSets.value -= 1;
          set.value += 1;
        }
        if (remainingSets.value <= 0) {
          set.value = sets.value;
          tabataSecRemaining.value = 0;
          timerIsRunning.value = false;
          showWorkoutCompleted.value = true;
          clearInterval(x);
        }
      }
      if (stopTimerNow.value) {
        tabataSecRemaining.value = 0;
        set.value = 1;
        timerIsRunning.value = false;
        stopTimerNow.value = false;
        clearInterval(x);
      }
    }, 1000);

  }
  function startEmomTimer() {
    timerIsRunning.value = true;
    // showTimerParms.value = false;
    showWorkoutCompleted.value = false;
    set.value = 1;
    secPerSet.value = 60;
    let currentExercise = 1;
    currentEmomSequence.value = 1;
    currentExerciseLabel.value = exercises.value[0].name;
    const x = setInterval(() => {
      secPerSet.value -= 1;
      minRemaining.value = currentExercise;
      secRemaining.value = secPerSet.value % 60;
      if (secPerSet.value <= 0) {
        currentExercise += 1;
        currentEmomSequence.value = currentExercise;
        if (currentExercise > exercises.value.length) {
          set.value += 1;
          currentExercise = 1;
          currentEmomSequence.value = currentExercise;
        }
        currentExerciseLabel.value = exercises.value[currentExercise - 1].name;
        secPerSet.value = 60;
        if (set.value > sets.value) {
          secPerSet.value = 0;
          timerIsRunning.value = false;
          showWorkoutCompleted.value = true;
          clearInterval(x);
        }
      }
      if (stopTimerNow.value) {
        secPerSet.value = 60;
        set.value = 1;
        timerIsRunning.value = false;
        stopTimerNow.value = false;
        showWorkoutCompleted.value = true;
        clearInterval(x);
      }
    }, 1000);
  }
  function stopTimer() {
    stopTimerNow.value = true;
  }

  async function add() {
    let setExercises = JSON.parse(JSON.stringify(exercises.value));
    const newSet = {
      name: setName.value,
      setType: setType.value,
      numOfSets: sets.value,
      minPerSet: minPerSet.value,
      secondsOn: secondsOn.value,
      secondsOff: secondsOff.value,
      exercises: setExercises
    };
    setId.value = await addSet(newSet);
    editMode.value = "Edit"
    console.log("Edit Mode: ", editMode.value);
  }
  async function save() {
    let setExercises = JSON.parse(JSON.stringify(exercises.value));
    const setToSave = {
      id: setId.value,
      name: setName.value,
      setType: setType.value,
      numOfSets: sets.value,
      minPerSet: minPerSet.value,
      secondsOn: secondsOn.value,
      secondsOff: secondsOff.value,
      exercises: setExercises
    };
    await saveSetItem(setToSave)
  }
// Logging
  async function logSet(logEntry){
    console.log("LogEntry:",logEntry);
    console.log("Call to logSet");
    await addLog(logEntry);
  }
  return {
    sets,
    minPerSet,
    setType,
    timerIsRunning,
    stopTimerNow,
    showWorkoutCompleted,
    exercises,
    currentExerciseLabel,
    currentEmomSequence,
    setName,
    secondsOff,
    secondsOn,
    setId,
    updateMinPerSet,
    updateSets,
    updateSetType,
    startStandardTimer,
    stopTimer,
    addExercise,
    clearExercises,
    startEmomTimer,
    updateExercise,
    deleteExercise,
    save,
    add,
    getMinPerSet,
    getSets,
    getMinutes,
    getSeconds,
    getSet,
    getSetType,
    getCurrentExerciseLabel,
    initSet,
    undoChanges,
    saveOriginalSet,
    undoDisabled,
    restoreExercise,
    editMode,
    startTabataTimer,
    tabataSecRemaining,
    getTabataMinRemaining,
    getTabataSecRemaining,
    tabataOnOffMessage,
    logSet,
    getCurrentDateTime,
    getCurrentTime,
    soundEnabled,
    countdownEnabled,
    updateSoundEnabled,
    startTimer
  };
});
