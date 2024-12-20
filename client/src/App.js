import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AudioRecorder from "./components/AudioRecorder";
import AudioList from "./components/AudioList";
import Synthesizer from "./components/Synthesizer";
import "./App.css";
const App = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Audio Development App" }), _jsxs("section", { children: [_jsx("h2", { children: "Synthesizer" }), _jsx(Synthesizer, {})] }), _jsxs("section", { children: [_jsx("h2", { children: "Audio Recorder" }), _jsx(AudioRecorder, {})] }), _jsxs("section", { children: [_jsx("h2", { children: "Audio List" }), _jsx(AudioList, {})] })] }));
};
export default App;
