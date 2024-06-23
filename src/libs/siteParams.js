import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSetParamsStore = defineStore('setParams',() => {
    let sets = ref(4)
    let set = ref(1)
    let minPerSet = ref(3)
    let secPerSet = ref(180)
    let setType = ref("Standard")
    let minRemaining = ref(3)
    let secRemaining = ref(0)
    let remainingSets = ref(4)
    let timerIsRunning = ref(false)
    let stopTimerNow = ref(false)
    let showTimerParms = ref(true)
    let showWorkoutCompleted = ref(false)
    let exercises = ref([])
    let showExercises = ref(false)
    // Getters
    const getMinPerSet = computed(() => minPerSet.value)
    const getSets = computed(() => sets.value)
    const getMinutes = computed(() => { return minRemaining.value })
    const getSeconds = computed(() => { return secRemaining.value })
    const getSet = computed(() => set.value)

    // Functions
    function updateMinPerSet(min){
        minPerSet.value = min
        secPerSet.value = min * 60
        minRemaining.value = ~~((min * 60)/60)
        secRemaining.value = (min * 60) % 60
    }
    function updateSets(numberOfSets){
        sets.value = numberOfSets
    }
    function updateSetType(type){
        setType.value = type
    }
    function addExercise(exercise){
        console.log("Exercise:", exercise)
        exercises.value.push(exercise)
        if (exercises.value.length > 0){
            showExercises.value = true
        }
        if (setType.value == 'EMOM'){
            updateMinPerSet(exercises.value.length)
        }
    }
    function clearExercises(){
        exercises.value = []
        showExercises.value = false
        if (setType.value == "EMOM"){
            updateMinSecRemaining(0)
        }
    }
    function updateMinSecRemaining(min){
        minPerSet.value = min
        secPerSet.value = min * 60
        minRemaining.value = ~~(secPerSet.value/60)
        secRemaining.value = secPerSet.value % 60
    }
    function startStandardTimer(){
        timerIsRunning.value = true
        showTimerParms.value = false
        showWorkoutCompleted.value = false
        set.value = 1
        secPerSet.value = minPerSet.value * 60
        const x = setInterval(() => {
            secPerSet.value -= 1
            minRemaining.value = ~~(secPerSet.value/60)
            secRemaining.value = secPerSet.value % 60
            if (secPerSet.value <= 0){
                remainingSets.value -= 1
                secPerSet.value = minPerSet.value * 60
                if (remainingSets.value <= 0) {
                    secPerSet.value = 0
                    timerIsRunning.value = false
                    showWorkoutCompleted.value = true
                    showTimerParms.value = true
                    clearInterval(x);
                }
                set.value += set.value < sets.value ? 1 : 0
            }
            if (stopTimerNow.value){
                secPerSet.value = 0
                set.value = 1
                timerIsRunning.value = false
                stopTimerNow.value = false
                showTimerParms.value = true
                clearInterval(x);
            }
        },1000)
    }
    function stopTimer(){
        stopTimerNow.value = true
    }

    
    return {sets, minPerSet, setType, timerIsRunning, stopTimerNow, showTimerParms, showWorkoutCompleted, exercises, showExercises,
        updateMinPerSet, updateSets, updateSetType, startStandardTimer, stopTimer, addExercise, clearExercises,
        getMinPerSet, getSets, getMinutes, getSeconds, getSet}
})