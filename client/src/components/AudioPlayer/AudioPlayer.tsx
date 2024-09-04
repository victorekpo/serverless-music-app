import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const audioRef = useRef(null as any);
  const intervalRef = useRef() as any;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const updateCurrentTime = () => {
        const minutes = Math.floor(audioRef.current.currentTime / 60);
        const seconds = Math.floor(audioRef.current.currentTime % 60);
        setCurrentTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      };

      const updateDuration = () => {
        const minutes = Math.floor(audioRef.current.duration / 60);
        const seconds = Math.floor(audioRef.current.duration % 60);
        setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      };

      audioRef.current.addEventListener("loadeddata", updateDuration);
      intervalRef.current = setInterval(updateCurrentTime, 1000);

      return () => {
        clearInterval(intervalRef.current);
        audioRef.current.removeEventListener("loadeddata", updateDuration);
      };
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleProgressChange = (event) => {
    const manualChange = Number(event.target.value);
    audioRef.current.currentTime =
      (audioRef.current.duration / 100) * manualChange;
    setProgress(manualChange);
  };

  return (
    <div className="audio-player">
      <div className="image-container">
        <img src={track.image} alt="Track" className="track-image"/>
        {track.description && (
          <div className="metadata">
            <p>{track.description}</p>
          </div>
        )}
      </div>
      <div className="track-info">
        <h4>{track.title}</h4>
        <p>{track.artist}</p>
      </div>
      <audio ref={audioRef} src={track.url}/>
      <div className="controls">
        <button onClick={skipBackward} className="control-btn">
          &#9664;
        </button>
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button onClick={stopPlayback} className="control-btn">
          ■
        </button>
        <button onClick={skipForward} className="control-btn">
          &#9654;
        </button>
      </div>
      <div className="time-info">
        <span>{currentTime}</span>
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <span>{duration}</span>
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
