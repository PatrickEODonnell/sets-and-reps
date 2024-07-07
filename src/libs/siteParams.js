import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSetsService} from './idbSets'

export const useSetParamsStore = defineStore('setParams',() => {

    // Set Parameters
    let setType = ref("Standard")
    let sets = ref(4)
    let minPerSet = ref(3)
    let exercises = ref([])
    let setName = ref("")
    let secondsOn = ref(20)
    let secondsOff = ref(10)
    let setId = ref(0)

    // Play parameters
    let set = ref(1)
    let secPerSet = ref(180)
    let minRemaining = ref(3)
    let secRemaining = ref(0)
    let remainingSets = ref(4)
    let timerIsRunning = ref(false)
    let stopTimerNow = ref(false)
    let currentExerciseLabel = ref("")
    let currentEmomSequence = ref(0)

    // Display parameters
    let showTimerParms = ref(true)
    let showWorkoutCompleted = ref(false)
    let showSaveSet = ref(false)
    let showExercises = ref(false)

    // Getters
    const getMinPerSet = computed(() => minPerSet.value)
    const getSets = computed(() => sets.value)
    const getMinutes = computed(() => { return minRemaining.value })
    const getSeconds = computed(() => { return secRemaining.value })
    const getSet = computed(() => set.value)
    const getSetType = computed(() => {return setType.value})
    const getCurrentExerciseLabel= computed(() => { return currentExerciseLabel.value })

    const {addSet} = useSetsService()
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
        // setType.value = type
        if (type == "AMRAP"){
            minPerSet.value = 5
            secPerSet.value = 300
        }
    }
    function addExercise(exercise){
        let seq = exercises.value.length + 1
        exercises.value.push({sequence: seq, name: exercise})
        if (exercises.value.length > 0){
            showExercises.value = true
        }
        if (setType.value == 'EMOM'){
            updateMinPerSet(exercises.value.length)
        }
    }
    function updateExercise(val, sequence){
        for (let exercise of exercises.value) {
            if (exercise.sequence == sequence){
                exercise.name = val
                break
            }
          }  
          console.log("exercises:", exercises.value)  
    }
    function deleteExercise(val, sequence){
        const index = exercises.value.findIndex(ex => ex.sequence === sequence);
        exercises.value.splice(index, 1);
        console.log(exercises.value)
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
    function startEmomTimer(){
        timerIsRunning.value = true
        showTimerParms.value = false
        showWorkoutCompleted.value = false
        set.value = 1
        secPerSet.value = 60
        let currentExercise  = 1
        currentEmomSequence.value = 1
        currentExerciseLabel.value = exercises.value[0].name
        const x = setInterval(() => {
            secPerSet.value -= 1
            minRemaining.value = currentExercise
            secRemaining.value = secPerSet.value % 60
            if (secPerSet.value <= 0){
                currentExercise += 1
                currentEmomSequence.value = currentExercise
                if (currentExercise > exercises.value.length){
                    set.value += 1
                    currentExercise = 1
                    currentEmomSequence.value = currentExercise
                }
                currentExerciseLabel.value = exercises.value[currentExercise - 1].name
                secPerSet.value = 60
                if (set.value > sets.value) {
                    secPerSet.value = 0
                    timerIsRunning.value = false
                    showWorkoutCompleted.value = true
                    showTimerParms.value = true
                    clearInterval(x);
                }
                // set.value += set.value < sets.value ? 1 : 0
            }
            if (stopTimerNow.value){
                secPerSet.value = 60
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

    async function add(){
        console.log("store-add:")
        const newSet = {"name": setName.value, "setType": setType.value, "numOfSets": sets.value, "minPerSet": minPerSet.value, "secondsOn": secondsOn.value, "secondsOff": secondsOff.value,}
        setId.value = await addSet(newSet)
        console.log("Set Id: ", setId.value)
    }
    function save(){
        

    }

    
    return {sets, minPerSet, setType, timerIsRunning, stopTimerNow, showTimerParms, showWorkoutCompleted, exercises, showExercises, currentExerciseLabel, 
        currentEmomSequence, showSaveSet, setName, secondsOff, secondsOn, setId,
        updateMinPerSet, updateSets, updateSetType, startStandardTimer, stopTimer, addExercise, clearExercises, startEmomTimer, updateExercise,deleteExercise,
        save, add,
        getMinPerSet, getSets, getMinutes, getSeconds, getSet, getSetType, getCurrentExerciseLabel}
})