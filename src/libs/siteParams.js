import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useSetsService } from "./idbSets";

export const useSetParamsStore = defineStore("setParams", () => {
  // Set Parameters
  let setType = ref("Standard");
  let sets = ref(4);
  const minPerSet = ref(3);
  let exercises = ref([]);
  let setName = ref("");
  let secondsOn = ref(20);
  let secondsOff = ref(10);
  let setId = ref(0);
  let test = ref("Yes");
  let editMode = ref("Add");
  let undoDisabled = ref(true);

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
  let minRemaining = ref(3);
  let secRemaining = ref(0);
  let remainingSets = ref(4);
  let timerIsRunning = ref(false);
  let stopTimerNow = ref(false);
  let currentExerciseLabel = ref("");
  let currentEmomSequence = ref(0);

  // Display parameters
  let showTimerParms = ref(true);
  let showWorkoutCompleted = ref(false);
  let showSaveSet = ref(false);
  let showExercises = ref(false);

  // Getters
  const getMinPerSet = computed(() => minPerSet.value);
  const getSets = computed(() => sets.value);
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

  const { addNewSet, saveSet } = useSetsService();
  // Functions
  function initSet(){
    setType.value = "Standard";
    sets.value = 4;
    updateMinPerSet(3);
    setName.value = "";
    secondsOn.value = 20;
    secondsOff.value = 10;
    setId.value = 0;
    editMode.value = "Add";
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
    console.log(exercises.value);
    backExercises.forEach(exercise => {
      restoreExercise({sequence: exercise.sequence, name: exercise.name});
    });
    console.log(exercises.value);

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
    if (type == "AMRAP") {
      minPerSet.value = 5;
      secPerSet.value = 300;
    }
  }
  function addExercise(exercise) {
    let seq = exercises.value.length + 1;
    exercises.value.push({ sequence: seq, name: exercise });
    if (exercises.value.length > 0) {
      showExercises.value = true;
    }
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
    console.log("exercises:", exercises.value);
  }
  function restoreExercise(ex){
    console.log(ex);
    exercises.value = [];
    exercises.value.push({sequence: ex.sequence, name: ex.name});
    showExercises.value = true;
  }
  function deleteExercise(val, sequence) {
    const index = exercises.value.findIndex((ex) => ex.sequence === sequence);
    exercises.value.splice(index, 1);
    console.log(exercises.value);
  }
  function clearExercises() {
    console.log(exercises.value);
    exercises.value = [];
    console.log(exercises.value);
    showExercises.value = false;
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
  function startStandardTimer() {
    timerIsRunning.value = true;
    showTimerParms.value = false;
    showWorkoutCompleted.value = false;
    set.value = 1;
    secPerSet.value = minPerSet.value * 60;
    const x = setInterval(() => {
      secPerSet.value -= 1;
      minRemaining.value = ~~(secPerSet.value / 60);
      secRemaining.value = secPerSet.value % 60;
      if (secPerSet.value <= 0) {
        remainingSets.value -= 1;
        secPerSet.value = minPerSet.value * 60;
        if (remainingSets.value <= 0) {
          secPerSet.value = 0;
          timerIsRunning.value = false;
          showWorkoutCompleted.value = true;
          showTimerParms.value = true;
          clearInterval(x);
        }
        set.value += set.value < sets.value ? 1 : 0;
      }
      if (stopTimerNow.value) {
        secPerSet.value = 0;
        set.value = 1;
        timerIsRunning.value = false;
        stopTimerNow.value = false;
        showTimerParms.value = true;
        clearInterval(x);
      }
    }, 1000);
  }
  function startEmomTimer() {
    timerIsRunning.value = true;
    showTimerParms.value = false;
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
          showTimerParms.value = true;
          clearInterval(x);
        }
        // set.value += set.value < sets.value ? 1 : 0
      }
      if (stopTimerNow.value) {
        secPerSet.value = 60;
        set.value = 1;
        timerIsRunning.value = false;
        stopTimerNow.value = false;
        showTimerParms.value = true;
        clearInterval(x);
      }
    }, 1000);
  }
  function stopTimer() {
    stopTimerNow.value = true;
  }

  function add() {
    console.log("store-add:");
    console.log("exercises: ", exercises.value);
    let setExercises = JSON.parse(JSON.stringify(exercises.value));
    console.log("exercises - serialized", setExercises);
    const newSet = {
      name: setName.value,
      setType: setType.value,
      numOfSets: sets.value,
      minPerSet: minPerSet.value,
      secondsOn: secondsOn.value,
      secondsOff: secondsOff.value,
      exercises: setExercises
    };
    setId.value = addNewSet(newSet);
    console.log("Set Id: ", setId.value);
  }
  function save() {
    console.log("store-save:");
    console.log("exercises: ", exercises.value);
    let setExercises = JSON.parse(JSON.stringify(exercises.value));
    console.log("exercises - serialized", setExercises);
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
    saveSet(setToSave);
    console.log("set saved");
  }

  return {
    sets,
    minPerSet,
    setType,
    timerIsRunning,
    stopTimerNow,
    showTimerParms,
    showWorkoutCompleted,
    exercises,
    showExercises,
    currentExerciseLabel,
    currentEmomSequence,
    showSaveSet,
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
    };
});
