let dataMusicForSearch = [];
      let album = [];
      let renderData = async () => {
        let drawData = await fetch(
          `https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST`
        );
        let data = await drawData.json();
        album = data.songs;
        dataMusicForSearch = data.songs.top100_VN[0].songs;
        console.log(album);

        let topVN = document.querySelector("#top-VN");
        let topUSUK = document.querySelector("#top-usuk");
        let topAs = document.querySelector("#top-asia");

        topVN.innerHTML = "";
        topUSUK.innerHTML = "";
        topAs.innerHTML = "";
        for (let i = 0; i < 5; i++) {
          let html = `<li class="splide__slide">
                                
        <div class="large-boxes_box">
            <img src="${album.top100_VN[0].songs[i].avatar}" alt="">
            <div class="large-boxes_box--title">${album.top100_VN[0].songs[i].title}</div>
        </div>
        
    </li>`;

          topVN.innerHTML += html;
        }

        for (let i = 0; i < 5; i++) {
          let html = `<li class="splide__slide">
                                        
                <div class="large-boxes_box">
                    <img src="${album.top100_AM[0].songs[i].avatar}" alt="">
                    <div class="large-boxes_box--title">${album.top100_AM[0].songs[i].title}</div>
                </div>
                
            </li>`;
          topUSUK.innerHTML += html;
        }
        for (let i = 0; i < 5; i++) {
          let html = `<li class="splide__slide">
                                        
                <div class="large-boxes_box">
                    <img src="${album.top100_CA[0].songs[i].avatar}" alt="">
                    <div class="large-boxes_box--title">${album.top100_CA[0].songs[i].title}</div>
                </div>
                
            </li>`;
          topAs.innerHTML += html;
        }
        renderDataSearch(dataMusicForSearch);
      };

      renderData();

      // play music

      const song = document.getElementById("song");
      const playBtn = document.querySelector("#play-btn");
      const nextBtn = document.querySelector("#nextBtn");
      const prevBtn = document.querySelector("#preBtn");
      const durationTime = document.querySelector(".current-time");
      const remainingTime = document.querySelector(".max-duration");
      const rangeBar = document.querySelector(".range");
      const musicName = document.querySelector(".musicName");
      const musicAvatar = document.querySelector(".musicAvatar");

      let isPlaying = true;
      let indexSong = 0;

      const musics = [
        {
          id: 1,
          title: "3107-2",
          file: "3107-2.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/02/04/5/a/2/5/1612405167313.jpg",
        },
        {
          id: 2,
          title: "Gác lại âu lo",
          file: "Gaclaiaulo.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2020/07/24/f/6/5/1/1595564868985.jpg",
        },
        {
          id: 3,
          title: "Gieo quẻ",
          file: "Gieoque.mp3",
          image:
            "https://lyricvn.com/wp-content/uploads/2022/01/5230f92190341d46150e33f7033ee619.jpg",
        },
        {
          id: 4,
          title: "Muộn rồi mà sao còn",
          file: "Muonroimasaocon.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg",
        },
        {
          id: 5,
          title: "Nàng thơ",
          file: "Nangtho.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2020/07/31/c/5/8/9/1596188259603.jpg",
        },
        {
          id: 6,
          title: "Thói quen",
          file: "Thoiquen.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/11/19/6/d/9/1/1637319864768.jpg",
        },
      ];

      let timer;

      nextBtn.addEventListener("click", function () {
        changeSong(1);
      });
      prevBtn.addEventListener("click", function () {
        changeSong(-1);
      });
      song.addEventListener("ended", handleEndedSong);
      function handleEndedSong() {
        changeSong(1);
      }

      function changeSong(dir) {
        if (dir === 1) {
          indexSong++;
          if (indexSong >= musics.length) {
            indexSong = 0;
          }
          isPlaying = true;
        } else if (dir === -1) {
          indexSong--;
          if (indexSong < 0) {
            indexSong = musics.length - 1;
          }
          isPlaying = true;
        }
        init(indexSong);
        playPause();
      }

      playBtn.addEventListener("click", playPause);

      function playPause() {
        if (isPlaying) {
          song.play();
          playBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
          isPlaying = false;
          timer = setInterval(displayTimer, 500);
        } else {
          song.pause();
          playBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
          isPlaying = true;
          timer = clearInterval;
        }
      }

      function displayTimer() {
        const { duration, currentTime } = song;
        rangeBar.max = duration;
        rangeBar.value = currentTime;
        durationTime.textContent = formatTimer(currentTime);
        if (!duration) {
          remainingTime.textContent = "00:00";
        } else {
          remainingTime.textContent = formatTimer(duration);
        }
      }
      function formatTimer(number) {
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number - minutes * 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`;
      }
      rangeBar.addEventListener("change", handleChangeBar);
      function handleChangeBar() {
        song.currentTime = rangeBar.value;
      }
      function init(indexSong) {
        song.setAttribute("src", `./Music/${musics[indexSong].file}`);
        musicAvatar.setAttribute("src", `${musics[indexSong].image}`);
        musicName.textContent = `${musics[indexSong].title}`;
      }
      displayTimer();
      init(indexSong);

      // search & reader
      let content = document.querySelector(".content");
      let searchMusics = document.querySelector(".search-musics");
      let searchForm = document.querySelector("#search-form");
      const searchBar = document.getElementById("searchBar");

      let renderDataSearch = (data) => {
        // const shuffledArray = data.sort((a, b) => 0.5 - Math.random());
        searchMusics.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          let html = `<div class="music-box">
    <img src="${data[i].avatar}" alt="">
    <span>${data[i].title}</span>
    <span>${data[i].creator}</span>
    <i class="fa-solid fa-arrow-down-to-line"></i>
    <a href="${data[i].music}" class="music-download"><i class="fa-solid fa-download"></i> Tải xuống</a>
</div>`;

          searchMusics.innerHTML += html;
        }
      };

      searchForm.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();

        const filteredMusic = dataMusicForSearch.filter((d) => {
          return (
            d.title.toLowerCase().includes(searchString) ||
            d.creator.toLowerCase().includes(searchString)
          );
        });
        renderDataSearch(filteredMusic);
      });

      function search() {
        content.style.display = "none";
        searchMusics.style.display = "flex";
        searchForm.style.display = "block";
      }

      function home() {
        content.style.display = "block";
        searchMusics.style.display = "none";
        searchForm.style.display = "none";
      }