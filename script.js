const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const progress = progressBar.querySelector("div");
const time = document.getElementById("time");

playBtn.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    audio.play();
    playBtn.textContent = "⏸"; // 일시중지 버튼으로 변경
  } else {
    audio.pause();
    playBtn.textContent = "▶"; // 재생 버튼으로 변경
  }
});

// 오디오 재생이 종료되었을 때 버튼 상태를 초기화
audio.addEventListener("ended", () => {
  playBtn.textContent = "▶"; // 재생 버튼으로 돌아가기
});

// 시간 업데이트
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration || 1; // Avoid divide by zero
  progress.style.width = (currentTime / duration) * 100 + "%";
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60)
    .toString()
    .padStart(2, "0");
  time.textContent = `${minutes}:${seconds}`;
});

progressBar.addEventListener("click", (e) => {
  const clickX = e.offsetX;
  const width = progressBar.offsetWidth;
  const duration = audio.duration || 1;
  audio.currentTime = (clickX / width) * duration;
});

//songs 리스트에 지정할 곡들
const albumSongs = {
  album1: ["Flicker(feat. Car, the garden)", "Dance", "Laundry", "Kung"],
  album2: [
    "MIMI",
    "PINK!",
    "ZEBRA",
    "AIRPLANE MODE",
    "BYE BYE",
    "WHITE(feat.Heize)",
  ],
  album3: ["Swim", "Homework!"],
  album4: ["my"],
  album5: ["More(feat. GIRIBOY)", "Night Running (Feat. John Park)"],
};

// 앨범 이미지를 클릭하면 해당 곡 목록으로 업데이트
const albums = document.querySelectorAll(".album-img");
const aricleAlbumImg = document.querySelector(".article-album-img");
const songList = document.getElementById("song-list");

albums.forEach((album) => {
  album.addEventListener("click", () => {
    const albumId = album.id; // 클릭한 앨범의 ID 가져오기
    const songs = albumSongs[albumId]; // 해당 앨범의 곡 목록 가져오기
    const albumImageSrc = album.src;
    // 기존 곡 목록 지우기
    songList.innerHTML = "";

    // 앨범에 맞는 곡 목록을 새로운 리스트로 추가

    songs.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = song; // 곡 제목을 리스트 항목에 추가
      li.className = "album-songs"; // 클래스 이름 지정

      // 동적으로 생성된 곡 항목에 이벤트 리스너 추가
      li.addEventListener("click", () => {
        const audioTitle = song;
        const img = `./images/${albumId}.jpeg`;
        const audio = `./audios/${audioTitle}.mp3`;

        // 플레이어 업데이트
        document.getElementById("audio-title").innerText = audioTitle;
        document.getElementById("audio").src = audio;
        document.getElementById("album-cover").src = img;
      });
      songList.appendChild(li); // 곡 항목을 songList에 추가
    });

    aricleAlbumImg.src = albumImageSrc;
  });
});
