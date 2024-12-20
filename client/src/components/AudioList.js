import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const AudioList = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Fetch the audio files from the server
    const fetchAudioFiles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/audio"); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch audio files.");
            }
            const data = await response.json();
            setAudioFiles(data);
        }
        catch (error) {
            console.error("Error fetching audio files:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Delete an audio file
    const deleteAudioFile = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/audio/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete audio file.");
            }
            // Remove the deleted file from the list
            setAudioFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
        }
        catch (error) {
            console.error("Error deleting audio file:", error);
        }
    };
    // Play an audio file
    const playAudio = (url) => {
        const audio = new Audio(url);
        audio.play();
    };
    useEffect(() => {
        fetchAudioFiles();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Saved Audio Clips" }), isLoading ? (_jsx("p", { children: "Loading audio files..." })) : audioFiles.length === 0 ? (_jsx("p", { children: "No audio files found." })) : (_jsx("ul", { children: audioFiles.map((audio) => (_jsxs("li", { children: [_jsx("span", { children: audio.name }), _jsx("button", { onClick: () => playAudio(audio.url), children: "Play" }), _jsx("button", { onClick: () => deleteAudioFile(audio._id), children: "Delete" })] }, audio._id))) }))] }));
};
export default AudioList;
