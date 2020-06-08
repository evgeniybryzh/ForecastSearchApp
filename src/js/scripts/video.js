"use strict";

export function slowVideo() {
  const player = document.getElementById("video");
  player.playbackRate = 0.4;
}
