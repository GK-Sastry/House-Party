import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

// Function component for MusicPlayer
export default function MusicPlayer(props) {
  // Calculate song progress based on the current time and duration
  const songProgress = (props.time / props.duration) * 100;

  // Function to skip the current song
  function skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

  // Function to pause the current song
  function pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  // Function to play the current song
  function playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img
            src={props.image_url}
            height="100%"
            width="100%"
            alt="Album Cover"
          />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {props.artist}
          </Typography>
          <div>
            {/* Toggle between play/pause depending on the current state */}
            <IconButton
              onClick={() => {
                props.is_playing ? pauseSong() : playSong();
              }}
            >
              {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            {/* Skip song functionality */}
            <IconButton onClick={skipSong}>
              {props.votes} / {props.votes_required}
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      {/* Display song progress */}
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
}
