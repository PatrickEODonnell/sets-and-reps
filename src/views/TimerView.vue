<template>
  <header>
    <PageHeading />
  </header>
  <main>
    <TabHeading heading="Timer" />
    <SetTimerParms v-if="store.showTimerParms" />
    <PlayTimer />
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useSetParamsStore } from '@/libs/siteParams'
import SetTimerParms from '../components/SetTimerParms.vue'
import PageHeading from '../components/PageHeading.vue'
import TabHeading from '../components/TabHeading.vue'
import PlayTimer from '../components/PlayTimer.vue'

const store = useSetParamsStore()
</script>
