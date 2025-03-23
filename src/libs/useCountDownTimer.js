import { ref } from "vue"
import { useSound } from "@vueuse/sound";
import countdownsound from '../assets/short-beep-countdown.wav';
import { useSetParamsStore } from "@/libs/siteParams";

export function useCountDownTimer() {
    const store = useSetParamsStore();
    const countDownSeconds = 10;
    const currentSecond = ref(10);
    const {play} = useSound(countdownsound);
    let playingSound = false;

    function runCountdownTimer(){
        const x = setInterval(() => {
            currentSecond.value -= 1
            if (currentSecond.value < 4 && store.soundEnabled && !playingSound){
                playingSound = true;
                play();
            }
            if (currentSecond.value <= 0 ){
                playingSound = false;
                clearInterval(x);
            }
        }, 1000);
    } 
    return {
        currentSecond,
        runCountdownTimer
    }
}