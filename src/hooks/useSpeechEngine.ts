import { useEffect, useState, useCallback, useRef } from "react";

export const useSpeechEngine = (textToSpeak: string) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const synth = window.speechSynthesis;
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const cleanupSpeechSynthesis = useCallback(() => {
        if (synth) {
            synth.cancel();
        }
    }, [synth]);

    useEffect(() => {
        return () => {
            cleanupSpeechSynthesis();
        };
    }, [cleanupSpeechSynthesis]);

    const togglePlayback = () => {
        if (!synth) return;

        if (isPlaying) {
            synth.pause();
            console.log("Pause", synth);
        } else {
            synth.resume();
            console.log("Resume", synth);
        }

        setIsPlaying(!isPlaying);
    };

    const cancel = () => {
        if (synth) {
            synth.cancel();
        }
        setIsPlaying(false);
    };

    const speak = () => {
        if (!synth || !textToSpeak) return;

        if (synth.speaking) {
            console.error("speechSynthesis.speaking");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utteranceRef.current = utterance;

        utterance.onstart = () => {
            setIsPlaying(true);
        };

        utterance.onend = () => {
            setIsPlaying(false);
        };

        utterance.onerror = (event) => {
            console.error("SpeechSynthesisUtterance error:", event);
            setIsPlaying(false);
        };

        synth.speak(utterance);
    };

    return { speak, togglePlayback, cancel, isPlaying };
};
