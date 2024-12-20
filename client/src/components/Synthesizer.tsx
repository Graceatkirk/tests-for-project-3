import React, { useState, useRef } from "react";
import * as Tone from "tone";

const Synthesizer: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioContext = useRef<AudioContext | null>(null);
  const destination = useRef<MediaStreamAudioDestinationNode | null>(null);
  const synth = useRef<Tone.Synth | null>(null);

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
  const allNotes = octaves.flatMap((octave) =>
    notes.map((n) => ({
      name: `${n.note}${octave}`,
      frequency: n.freq * Math.pow(2, octave - 4),
    }))
  );

  const initializeSynth = () => {
    setIsInitialized(true);
    audioContext.current = new AudioContext();
    destination.current = audioContext.current.createMediaStreamDestination();
    synth.current = new Tone.Synth().toDestination(); // Tone.Synth automatically connects to the default audio context output.
  };

  const playNote = (frequency: number) => {
    if (!isInitialized || !synth.current) return;
    synth.current.triggerAttackRelease(frequency, "8n");
  };

  const startRecording = () => {
    if (!destination.current) return;

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

  const handleMouseDown = (frequency: number) => {
    setIsMouseDown(true);
    playNote(frequency);
  };

  const handleMouseEnter = (frequency: number) => {
    if (isMouseDown) {
      playNote(frequency);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div onMouseUp={handleMouseUp}>
      <h1>3-Octave Synthesizer</h1>

      {!isInitialized ? (
        <button onClick={initializeSynth}>Initialize Synthesizer</button>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {allNotes.map((note) => (
              <button
                key={note.name}
                onMouseDown={() => handleMouseDown(note.frequency)}
                onMouseEnter={() => handleMouseEnter(note.frequency)}
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: note.name.includes("#") ? "#333" : "#ddd",
                  color: note.name.includes("#") ? "#fff" : "#000",
                  borderRadius: "5px",
                  border: "1px solid #000",
                  cursor: "pointer",
                }}
              >
                {note.name}
              </button>
            ))}
          </div>

          {/* Recording Controls */}
          <div style={{ marginTop: "20px" }}>
            <button onClick={startRecording} disabled={isRecording}>
              Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
              Stop Recording
            </button>
          </div>

          {/* Download Recorded Audio */}
          {audioBlob && (
            <div style={{ marginTop: "20px" }}>
              <p>Recording complete!</p>
              <a
                href={URL.createObjectURL(audioBlob)}
                download="synth-recording.webm"
              >
                Download Recording
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Synthesizer;
