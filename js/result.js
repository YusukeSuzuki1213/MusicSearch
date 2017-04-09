let get_data;
let number　=　0;
let button_toggle　=　true;    


/*リクエストパラメーター*/ 
let params = {
  country : 'JP',
  lang    : 'ja_jp',
  entry   : 'music',
  media   : 'music',
  limit   : 100,
  term    : getUrlQuery(),
};


/*APIリクエスト*/
$.ajax({
  url      : 'https://itunes.apple.com/search',
  method   : 'GET',
  data     : params,
  dataType : 'jsonp',
  success  : function(json) {
    showData(json);
  },
  error: function() {
    console.log("error"); 
  }
});


/*APIレスポンス*/ 
function showData(json)
{
  if (json.results.length != 0) {
    let track_url        = [];
    let track_name       = [];
    let artist_name      = [];
    let collection_name  = [];
    let collection_image = []; 
    
    for(i = 0; i < json.resultCount; i++){
      track_url       [i]  = json.results[i].previewUrl;
      track_name      [i]  = json.results[i].trackCensoredName;
      artist_name     [i]  = json.results[i].artistName;
      collection_name [i]  = json.results[i].collectionName;
      collection_image[i]  = json.results[i].artworkUrl100;
    }    
  
    get_data = {track_url ,track_name, artist_name, collection_name, collection_image};
    setData("set");
  }
  
  else {
    document.getElementById('song').textContent = "見つかりませんでした。";
    return;
  }
}


/*クエリ取得*/
function getUrlQuery()
{    
  let url      = window.location.search;
  let key_word = url.slice(5);
  key_word     = decodeURI(key_word).replace(/\s+/g, "");
  return key_word;
}


/*nextボタンが押されたら*/ 
function buttonNext(){
  setData("next");
  if(!button_toggle){
    setButoonImage("img/button_run.png");
    button_toggle = true;
  }
}


/*runボタンが押されたら*/
function buttonRun(){    
  let image = new Image();
  if(button_toggle){
    setButoonImage("img/button_stop.png");     
    document.getElementById('audio').pause();
  } 
  else{
    setButoonImage("img/button_run.png");    
    document.getElementById('audio').play();
  }
}


/*backボタンが押されたら*/ 
function buttonBack(){
  setData("back");
  if(!button_toggle){
    setButoonImage("img/button_run.png");
  }
}


/*データをセット*/ 
function setData(order){
  switch(order){
    case "set":
      setHTML(number);
      break;
    
    case "next":
      if(number === get_data.track_url.length - 1){number = 0;}
      else number++;
      setHTML(number);
      break;
    
    case "back":            
      if(number === 0){number = get_data.track_url.length - 1;}
      else number--;
      setHTML(number);
      break;
  }
}


/*HTMLをセット*/
function setHTML(elements_number){
  let image        = new Image();

  let audio_tag    = document.getElementById('audio');   
  let image_tag    = document.getElementById('image');
  let song_tag     = document.getElementById('song');
  let musician_tag = document.getElementById('musician');
  let album_tag    = document.getElementById('album');
 
  audio_tag.src            = get_data.track_url[elements_number];
  image.src                =  get_data.collection_image[elements_number];
  image_tag.src            =  image.src;
  song_tag.textContent     =  get_data.track_name[elements_number];
  musician_tag.textContent =  get_data.artist_name[elements_number];
  album_tag.textContent    =  get_data.collection_name[elements_number];
}


/*ボタン画像セット*/ 
function setButoonImage(url){
    let image = new Image();
    image.src = url;
    document.getElementById('button_run_img').src = image.src;
    button_toggle = ! button_toggle;
}


/*再検索ボタンが押されたら*/
function buttonRe_Search(){
  location.href = "index.html";
}