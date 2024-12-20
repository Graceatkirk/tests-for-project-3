import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import * as Tone from "tone";
const Synthesizer = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const audioContext = useRef(null);
    const destination = useRef(null);
    const synth = useRef(null);
    const notes = [
        { note: "C", freq: 261.63 },
        { note: "C#", freq: 277.18 },
        { note: "D", freq: 293.66 },
        { note: "D#", freq: 311.13 },
        { note: "E", freq: 329.63 },
        { note: "F", freq: 349.23 },
        { note: "F#", freq: 369.99 },
        { note: "G", freq: 392.0 },
        { note: "G#", freq: 415.3 },
        { note: "A", freq: 440.0 },
        { note: "A#", freq: 466.16 },
        { note: "B", freq: 493.88 },
    ];
    const octaves = [3, 4, 5];
    const allNotes = octaves.flatMap((octave) => notes.map((n) => ({
        name: `${n.note}${octave}`,
        frequency: n.freq * Math.pow(2, octave - 4),
    })));
    const initializeSynth = () => {
        setIsInitialized(true);
        audioContext.current = new AudioContext();
        destination.current = audioContext.current.createMediaStreamDestination();
        synth.current = new Tone.Synth().toDestination(); // Tone.Synth automatically connects to the default audio context output.
    };
    const playNote = (frequency) => {
        if (!isInitialized || !synth.current)
            return;
        synth.current.triggerAttackRelease(frequency, "8n");
    };
    const startRecording = () => {
        if (!destination.current)
            return;
        const recorder = new MediaRecorder(destination.current.stream, {
            mimeType: "audio/webm",
        });
        recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            setAudioBlob(blob);
            chunksRef.current = [];
        };
        recorder.start();
        recorderRef.current = recorder;
        setIsRecording(true);
    };
    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stop();
        }
        setIsRecording(false);
    };
    const handleMouseDown = (frequency) => {
        setIsMouseDown(true);
        playNote(frequency);
    };
    const handleMouseEnter = (frequency) => {
        if (isMouseDown) {
            playNote(frequency);
        }
    };
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    return (_jsxs("div", { onMouseUp: handleMouseUp, children: [_jsx("h1", { children: "3-Octave Synthesizer" }), !isInitialized ? (_jsx("button", { onClick: initializeSynth, children: "Initialize Synthesizer" })) : (_jsxs(_Fragment, { children: [_jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "10px" }, children: allNotes.map((note) => (_jsx("button", { onMouseDown: () => handleMouseDown(note.frequency), onMouseEnter: () => handleMouseEnter(note.frequency), style: {
                                width: "60px",
                                height: "60px",
                                backgroundColor: note.name.includes("#") ? "#333" : "#ddd",
                                color: note.name.includes("#") ? "#fff" : "#000",
                                borderRadius: "5px",
                                border: "1px solid #000",
                                cursor: "pointer",
                            }, children: note.name }, note.name))) }), _jsxs("div", { style: { marginTop: "20px" }, children: [_jsx("button", { onClick: startRecording, disabled: isRecording, children: "Start Recording" }), _jsx("button", { onClick: stopRecording, disabled: !isRecording, children: "Stop Recording" })] }), audioBlob && (_jsxs("div", { style: { marginTop: "20px" }, children: [_jsx("p", { children: "Recording complete!" }), _jsx("a", { href: URL.createObjectURL(audioBlob), download: "synth-recording.webm", children: "Download Recording" })] }))] }))] }));
};
export default Synthesizer;
