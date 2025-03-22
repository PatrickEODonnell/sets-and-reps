import { ref } from "vue"
export function useCountDownTimer() {
    const countDownSeconds = 10;
    const currentSecond = ref(10);
    function runCountdownTimer(){
        const x = setInterval(() => {
            currentSecond.value -= 1
            if (currentSecond.value <= 0 ){
                clearInterval(x);
            }
        }, 1000);
    } 
    return {
        currentSecond,
        runCountdownTimer
    }
}