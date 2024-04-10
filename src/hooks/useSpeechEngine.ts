import { useEffect, useState, useCallback } from "react";

export const useSpeechEngine = (textToSpeak: string) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const synth = window.speechSynthesis;

    const cleanupSpeechSynthesis = useCallback(() => {
        if(synth){
            synth.cancel();
        } 
    }, [synth])

    useEffect(() => {
        return () => {
            cleanupSpeechSynthesis();
        }
    }, [cleanupSpeechSynthesis])


    const togglePlayback = () => {
        if(isPlaying){
            synth.pause();
            console.log("Pause", synth);
        } else {
            synth.resume()
            console.log("Resume", synth);
        }
        
        setIsPlaying(!isPlaying);
    }

    const cancel = () => synth.cancel();

    const speak = () => {
        if(synth && textToSpeak){
            if (synth.speaking) {
                console.error("speechSynthesis.speaking");
                return;
            }
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = textToSpeak;
            setIsPlaying(true);
            synth.speak(utterance);
        }
    };

    return { speak, togglePlayback, cancel, isPlaying }
    
}