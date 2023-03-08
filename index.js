/* 
======================個人用メモ======================

コード進行がわかるようにメモ番号を振っているので参考程度に

====================================================
*/


function butonClickReset() {
  userLest()
};

//上位の変数置き場
let jsonVgl = 0; //JSON比較用の変数
let detachain = 0; //Detaを最後に実行するようの変数


//ボタンを押した時のイベント(生成)
let button = document.getElementById("send")
button.addEventListener('click', butonClick);

const tokenDeta = "&token=6ebafd14d8c8879999a3d1f29b5dab5244e19b2b4156089609da6d9edc5245fa7ebb57bf66be21a9b1f9df7cf3fb4fc3cd8c762715bf760e68e2a725f3376ffb" //トークン

const resultDivided = document.getElementById('hoge')

let apiUrlDeta = ["https://api.chunirec.net/2.0/records/profile.json?region=jp2& user_name=", "https://api.chunirec.net/2.0/records/rating_data.json?region=jp2& user_name="] //API取得設定

//テーブルを取得 またテーブルデータを作成
let userTable = document.getElementById("tbl");


function butonClick() { //ボタンを押された時の処理  ①コード進行開始場所
  let element = document.getElementById("name"); //②

  let convData = requestData(apiUrlDeta[0], element.value, tokenDeta).then(
    function (arg) {
      createUserProfileArea(JSON.parse(arg)); //7
      try {
      } catch (e) {
        console.log(e.message)
      }
    });

  convData = requestData(apiUrlDeta[1], element.value, tokenDeta).then(
    function (arg) {
      createUserRatingArea(JSON.parse(arg)); //7
      try {
      } catch (e) {
        console.log(e.message)
      }
    });

  /*
    let chunirecAccountData = requestData(apiUrlDeta[1], element.value, tokenDeta);
    console.log(chunirecAccountData);
  */
};


function createUserProfileArea(playerDataObj) {

  let userProfileArea = document.getElementById("userProfileArea")

  //HTMlからclass、idを取得 変数作成
  let userLevelText = document.getElementById("userLevelText");
  let userNameText = document.getElementById("userNameText");
  let rating = document.getElementById("rating");
  let maxRating = document.getElementById("maxRating");
  let title = document.getElementById("mainTitle");
  let freeTitle = {
    levelText: 'Lv.',
    ratinSlash: '/'
  };

  let createSpan = document.createElement("span");


  //初期化テスト

  //let userProfileParent = document.getElementById("userProfileArea")
  //userProfileParent.textContent = "";


  /*
  //初期化作業
  while (userLevelText.firstChild) {
    userLevelText.removeChild(userLevelText.firstChild);
  }
  while (userNameText.firstChild) {
    userNameText.removeChild(userNameText.firstChild);
  }
  while (rating.firstChild) {
    rating.removeChild(rating.firstChild);
  }
  while (maxRating.firstChild) {
    maxRating.removeChild(maxRating.firstChild);
  }
  while (title.firstChild) {
    title.removeChild(title.firstChild);
  }
  */


  title.innerText = "";
  createSpan = document.createElement("span");
  createSpan.textContent = playerDataObj.title
  title.appendChild(createSpan);

  userLevelText.innerText = "";
  createSpan = document.createElement("span");
  createSpan.textContent = freeTitle.levelText + playerDataObj.level;
  userLevelText.appendChild(createSpan);

  userNameText.innerText = "";
  createSpan = document.createElement("span");
  createSpan.textContent = playerDataObj.player_name;
  createSpan.setAttribute("class", "uppercaseLetter")
  userNameText.appendChild(createSpan);

  rating.innerText = "";
  createSpan = document.createElement("span");
  createSpan.textContent = playerDataObj.rating + freeTitle.ratinSlash
  rating.appendChild(createSpan);

  maxRating.innerText = "";
  createSpan = document.createElement("span");
  createSpan.textContent = playerDataObj.rating_max
  maxRating.appendChild(createSpan);

}

function createUserRatingArea(playerDataObj) {

  //メインのテーブルを取得
  let myBestRating = document.getElementById("ratingBest");

  //初期化処理
  while (myBestRating.firstChild) {
    myBestRating.removeChild(myBestRating.firstChild);
  }


  //テーブルに追加する要素
  let myBestTitleText = ["曲名", "難易度", "Lv.", "スコア", "ランク", "定数", "レート"]
  let myBestRatingScore = document.createElement("tr");
  let myBestRatingTitleTd = document.createElement("td");


  for (let i = 0; i < myBestTitleText.length; i++) {
    let myBestRatingTitle = document.createElement("th");
    myBestRatingTitle.textContent = myBestTitleText[i];
    myBestRatingScore.appendChild(myBestRatingTitle);
    myBestRating.appendChild(myBestRatingScore);
  }


  for (let i = 0; i < playerDataObj.best.entries.length; i++) {
    myBestRatingScore = document.createElement("tr")
    let myBestMusicGrope = document.createElement("td");
    myBestMusicGrope.setAttribute("class", "musicName")
    myBestMusicGrope.textContent = playerDataObj.best.entries[i].title //楽曲名
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestMusicGrope = document.createElement("td");
    myBestMusicGrope.textContent = playerDataObj.best.entries[i].diff //難易度
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestMusicGrope = document.createElement("td");
    myBestMusicGrope.textContent = difficultyIf(playerDataObj.best.entries[i].level); //Lv.
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestMusicGrope = document.createElement("td");
    myBestMusicGrope.textContent = playerDataObj.best.entries[i].score //スコア
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestMusicGrope = document.createElement("td");
    let scoreDetaRankObj = null
    scoreDetaRankObj = scoreRankIf(playerDataObj.best.entries[i].score) //ランク
    myBestMusicGrope.textContent = scoreDetaRankObj.Rank
    myBestMusicGrope.setAttribute("class", scoreDetaRankObj.RankColor);
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestMusicGrope = document.createElement("td");
    myBestMusicGrope.textContent = playerDataObj.best.entries[i].const.toFixed(1) //定数
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestMusicGrope = document.createElement("td");
    myBestMusicGrope.textContent = playerDataObj.best.entries[i].rating.toFixed(2) //レート
    myBestRatingScore.appendChild(myBestMusicGrope);

    myBestRating.appendChild(myBestRatingScore);//楽曲表示最終出力
  }
  detachain += 1;
}

/*function createDocument(arg) { //取得したデータを表示する。

  //リセット用ボタン
  let buttonReset = document.getElementById("reset")
  buttonReset.addEventListener('click', userListReset);

  let playerDataObj = JSON.parse(arg)
  console.log(playerDataObj);

  if (detachain === 0) {//複数読み込むとバグるためそのための対策

  } else if (detachain === 1) {

  };
  function userListReset() {//表示のリセット
    detachain = 0; //干渉対策の変数をリセット

    //ユーザーデータの表示を削除
    userLevelText.removeChild(userLevelSpan);
    userNameText.removeChild(userNameSpan);
    rating.removeChild(ratingSpan);
    maxRating.removeChild(maxRatingSpan);
    title.removeChild(titleSpan);

  }
};*/


function difficultyIf(level) { //レベル分け関数
  switch (level) {
    case 14.5: return "14+"
    case 13.5: return "13+"
    case 12.5: return "12+"
    case 11.5: return "11+"
    case 10.5: return "10+"
    case 9.5: return "9+"
    case 8.5: return "8+"
    case 7.5: return "7+"
    default: return String(level)
  };
}


function scoreRankIf(scoreRank) { //ランク分け関数
  let scoreDetaRankObj = {
    Rank: "",
    RankColor: ""
  }

  if (scoreRank >= 1009000 && scoreRank <= 1010000) {
    scoreDetaRankObj = {
      Rank: "SSS+",
      RankColor: "topSss"
    }
  } else if (scoreRank >= 1007500 && scoreRank <= 1008999) {
    scoreDetaRankObj = {
      Rank: "SSS",
      RankColor: "Sss"
    }
  } else if (scoreRank >= 1005000 && scoreRank <= 1007499) {
    scoreDetaRankObj = {
      Rank: "SS+",
      RankColor: "topSs"
    }
  } else if (scoreRank >= 1000000 && scoreRank <= 1004999) {
    scoreDetaRankObj = {
      Rank: "SS",
      RankColor: "Ss"
    }
  } else if (scoreRank >= 990000 && scoreRank <= 999999) {
    scoreDetaRankObj = {
      Rank: "S+",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 975000 && scoreRank <= 989999) {
    scoreDetaRankObj = {
      Rank: "S",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 950000 && scoreRank <= 974999) {
    scoreDetaRankObj = {
      Rank: "AAA",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 925000 && scoreRank <= 949999) {
    scoreDetaRankObj = {
      Rank: "AA",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 900000 && scoreRank <= 924999) {
    scoreDetaRankObj = {
      Rank: "A",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 800000 && scoreRank <= 899999) {
    scoreDetaRankObj = {
      Rank: "BBB",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 700000 && scoreRank <= 799999) {
    scoreDetaRankObj = {
      Rank: "BB",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 600000 && scoreRank <= 699999) {
    scoreDetaRankObj = {
      Rank: "B",
      RankColor: "Nomal"
    }
  } else if (scoreRank >= 500000 && scoreRank <= 599999) {
    scoreDetaRankObj = {
      Rank: "C",
      RankColor: "Nomal"
    }
  } else {
    scoreDetaRankObj = {
      Rank: "D",
      RankColor: "Nomal"
    }
  }
  return scoreDetaRankObj
};

async function requestData(apiUrl, userName, token) {  //⑤

  let apiTextData = null; //APiで取得後のデータを入れる用
  let URL = apiUrl + userName + token;

  await fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    })
    .then(text => {
      apiTextData = text;
    })
    .catch(error => {
      console.log("データの取得に失敗しました。")
    });

  return apiTextData; //Return↑
};



//memo

/*

console.log(arg)
resultDivided.innerText = '';
const userText = document.createElement('h3');
userText.innerText = arg;
resultDivided.appendChild(userText);

*/