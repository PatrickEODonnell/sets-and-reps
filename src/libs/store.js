import { reactive } from "vue";

export const store = reactive({
  setParams: {
    name: "",
    set_type: "Standard",
    sets: 4,
    min_per_set: 2.5,
    interval: 1,
    interval_off: 10,
    exercise_count: 0
  }
});
