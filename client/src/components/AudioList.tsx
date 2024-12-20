import { useEffect, useState } from "react";

interface AudioFile {
  _id: string;
  name: string;
  url: string; // Cloudinary URL for playback
}

const AudioList: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the audio files from the server
  const fetchAudioFiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/audio"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch audio files.");
      }
      const data: AudioFile[] = await response.json();
      setAudioFiles(data);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an audio file
  const deleteAudioFile = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/audio/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete audio file.");
      }
      // Remove the deleted file from the list
      setAudioFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
    } catch (error) {
      console.error("Error deleting audio file:", error);
    }
  };

  // Play an audio file
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  return (
    <div>
      <h2>Saved Audio Clips</h2>
      {isLoading ? (
        <p>Loading audio files...</p>
      ) : audioFiles.length === 0 ? (
        <p>No audio files found.</p>
      ) : (
        <ul>
          {audioFiles.map((audio) => (
            <li key={audio._id}>
              <span>{audio.name}</span>
              <button onClick={() => playAudio(audio.url)}>Play</button>
              <button onClick={() => deleteAudioFile(audio._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AudioList;
