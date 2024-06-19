import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSetParamsStore = defineStore('setParams',() => {
    let sets = ref(4)
    let minPerSet = ref(3)
    let setType = ref("Standard")

    // Getters
    const getMinPerSet = computed(() => minPerSet.value)
    const getSets = computed(() => sets.value)
    const getMinutes = computed(() => ~~((minPerSet.value * 60)/60))
    const getSeconds = computed(() => ((minPerSet.value * 60) % 60))

    // Functions

    function updateMinPerSet(min){
        minPerSet.value = min
    }
    function updateSets(numberOfSets){
        sets.value = numberOfSets
    }
    function updateSetType(setType){
        setType.value = setType
    }
    return {sets, minPerSet, setType, updateMinPerSet, updateSets, updateSetType, getMinPerSet, getSets, getMinutes, getSeconds}
})