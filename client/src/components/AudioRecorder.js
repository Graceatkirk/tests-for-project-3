import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// client/src/components/AudioRecorder.tsx
import { useState, useRef } from 'react';
const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState('');
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (e) => {
            const audioBlob = e.data;
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        };
        mediaRecorderRef.current = mediaRecorder;
        setRecording(true);
    };
    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };
    return (_jsxs("div", { children: [_jsx("button", { onClick: startRecording, disabled: recording, children: "Start Recording" }), _jsx("button", { onClick: stopRecording, disabled: !recording, children: "Stop Recording" }), audioUrl && _jsx("audio", { controls: true, src: audioUrl })] }));
};
export default AudioRecorder;
