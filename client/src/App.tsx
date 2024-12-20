import React from "react";
import AudioRecorder from "./components/AudioRecorder";
import AudioList from "./components/AudioList";
import Synthesizer from "./components/Synthesizer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>Audio Development App</h1>

      {/* Synthesizer */}
      <section>
        <h2>Synthesizer</h2>
        <Synthesizer />
      </section>

      {/* Audio Recorder */}
      <section>
        <h2>Audio Recorder</h2>
        <AudioRecorder />
      </section>

      {/* Audio List */}
      <section>
        <h2>Audio List</h2>
        <AudioList />
      </section>
    </div>
  );
};

export default App;
