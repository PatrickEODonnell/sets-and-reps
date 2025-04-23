import { ref } from "vue";
import { useSound } from "@vueuse/sound";
import countdownsound from "../assets/short-beep-countdown.wav";
import { useSetParamsStore } from "@/libs/siteParams";

export function useWorkoutService() {
  const store = useSetParamsStore();

  return {};
}
