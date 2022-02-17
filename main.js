let renderData = async (music) => {
  let drawData = await fetch(
    `https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST`
  );
  let data = await drawData.json();
  let album = data.songs;

  let topVN = document.querySelector("#top-VN");
  let topUSUK = document.querySelector("#top-usuk");
  let topAs = document.querySelector("#top-asia")

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
};

renderData();

