import { useState } from "react";
import { useSpeechEngine } from "./hooks/useSpeechEngine";

const SpeechEngine = () => {
    const [textToSpeak, setTextToSpeak] = useState("");

    const { 
        speak, 
        togglePlayback, 
        cancel, 
        isPlaying } = useSpeechEngine(textToSpeak);
    
    const handleTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextToSpeak(e.target.value)
    };

    return (
        <div>
            <h2>Speech Engine</h2>
            <textarea
                placeholder="Enter text to speak..."
                onChange={handleTextChange}
                value={textToSpeak} 
            />
            <button onClick={speak}>Speak</button>
            <button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
            <button onClick={cancel}>Stop</button>
        </div>
    );
}

export default SpeechEngine;