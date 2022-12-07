//上位の変数置き場
let jsonVgl = 0; //JSON比較用の変数


//ボタンを押した時のイベント
let button = document.getElementById("send")
button.addEventListener('click', butonClick);

const tokenDeta = "&token=6ebafd14d8c8879999a3d1f29b5dab5244e19b2b4156089609da6d9edc5245fa7ebb57bf66be21a9b1f9df7cf3fb4fc3cd8c762715bf760e68e2a725f3376ffb" //トークン

const resultDivided = document.getElementById('hoge')

let apiUrlDeta = ["https://api.chunirec.net/2.0/records/profile.json?region=jp2& user_name=", "https://api.chunirec.net/2.0/users/show.json?user_name="] //API取得設定

//テーブルを取得 またテーブルデータを作成
let userTable = document.getElementById("tbl");

function butonClick() {

  let element = document.getElementById("name");


  fncViaData(apiUrlDeta[0], element.value, tokenDeta);
  fncViaData(apiUrlDeta[1], element.value, tokenDeta);

  /*
    let chunirecAccountData = requestData(apiUrlDeta[1], element.value, tokenDeta);
    console.log(chunirecAccountData);
  */




};



function fncViaData(convApiUrl, convUserName, convToken) {

  let viaData = requestData(convApiUrl, convUserName, convToken)

  let convData = viaData.then(
    function (arg) {

      let objectConversion = JSON.parse(arg)
      console.log(objectConversion);

      /*
      let userTableTr = document.createElement("tr")
      let userTableTh = document.createElement("th")
      let userTableTd = document.createElement("td")
      */


    });

};

async function requestData(apiUrl, userName, token) {

  let apiTextData = null; //APiで取得後のデータを入れる用
  let URL = apiUrl + userName + token;

  await fetch(URL)
    .then(response => {
      return response.text();
    })
    .then(text => {
      apiTextData = text;
      console.log(apiTextData);

    })
    .catch(error => {
      console.log("データの取得に失敗しました。")
    });

  return apiTextData;
};



//memo

/*

console.log(arg)
resultDivided.innerText = '';
const userText = document.createElement('h3');
userText.innerText = arg;
resultDivided.appendChild(userText);

*/