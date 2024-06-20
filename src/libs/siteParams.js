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
    function updateSetType(setType){
        setType.value = setType
    }
    function startStandardTimer(){
        timerIsRunning.value = true
        const x = setInterval(() => {
            secPerSet.value -= 1
            minRemaining.value = ~~(secPerSet.value/60)
            secRemaining.value = secPerSet.value % 60
            console.log("secPerSet",secPerSet.value)
            console.log("remainingSets",remainingSets.value)
            console.log("minRemaining", minRemaining.value)
            console.log("secRemaining", secRemaining.value)
            if (secPerSet.value <= 0){
                remainingSets.value -= 1
                secPerSet.value = minPerSet.value * 60
                if (remainingSets.value <= 0) {
                    secPerSet.value = 0
                    timerIsRunning.value = false
                    clearInterval(x);
                }
                set.value += set.value < sets.value ? 1 : 0
            }
        },1000)
    }

    
    return {sets, minPerSet, setType, updateMinPerSet, updateSets, updateSetType, startStandardTimer, getMinPerSet, getSets, getMinutes, getSeconds, getSet}
})