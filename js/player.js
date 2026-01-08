const video = document.getElementById("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeSlider = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const dateSpan = document.getElementById("date");

/* Play / Pause */
playBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

/* Mute */
muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted
        ? '<i class="fas fa-volume-mute"></i>'
        : '<i class="fas fa-volume-up"></i>';
});

/* Volume */
volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
});

/* Fullscreen */
fullscreenBtn.addEventListener("click", () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
});

/* Date */
dateSpan.textContent = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric"
});
