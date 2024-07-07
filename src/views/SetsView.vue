<template>
  <header>
    <PageHeading />
  </header>
  <TabHeading heading="S E T S" />
  <p v-for="set in sets" :key="set.id">{{ set.id }} - {{ set.name }}</p>
</template>
<script setup>
import PageHeading from '../components/PageHeading.vue'
import TabHeading from '../components/TabHeading.vue'
import { useSetsService } from '../libs/idbSets'
import { ref, onMounted } from 'vue'

const { getSets, initSets } = useSetsService()

let sets = ref([])

onMounted(async () => {
  console.log('On Mounted')
  sets.value = await getSets()
  if (sets.value.length == 0) {
    console.log('init sets:')
    initSets()
  }
})
</script>
