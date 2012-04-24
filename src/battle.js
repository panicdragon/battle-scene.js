$(function(){
setTimeout(function(){
$("h1").text("ドラゴンクエスト風戦闘シーン");
},100);
//初期化
$(function init(){
mHp = 132; //モンスターHP
pLv = 30; //プレイヤーレベル
pHp = 140; //プレイヤーHP
pMp = 50; //プレイヤーMP
$(".player01Li>.lv").text(pLv);
$(".player01Li>.hp").text(pHp);
$(".player01Li>.mp").text(pMp);
});

/********* たたかう *************/
$(".battle>a").click(function(){
attckP();
bTurn();

//あなたのターン
if(turn){
  //あなたのこうげき
  $(".message>p").text("あなたのこうげき、キングスライムに "+pAttck+"のダメージ");
  mHp = mHp-pAttck;
  dieCheck();
  $(".monsterLi>li").addClass("damage");
  setTimeout(function(){$(".monsterLi>li").removeClass("damage");},1500);
  if(die==0){
    setTimeout(function(){
      //キングスライムのこうげき
      $(".monsterLi>li").addClass("attck");
      $(".dqArea").addClass("shock");
      $(".message>p").text("キングスライムのこうげき、"+mAttck+"のダメージ");
      pHp = pHp-mAttck;
      dieCheck();
      $(".player01Li>.hp").text(pHp);
      setTimeout(function(){
        $(".monsterLi>li").removeClass("attck");
        $(".dqArea").removeClass("shock");
        },1700);
      },1500);
    }
}else{
  //キングスライムのこうげき
  $(".monsterLi>li").addClass("attck");
  $(".dqArea").addClass("shock");
  $(".message>p").text("キングスライムのこうげき、"+mAttck+"のダメージ");
  pHp = pHp-mAttck;
  dieCheck();
  setTimeout(function(){
    $(".monsterLi>li").removeClass("attck");
    $(".dqArea").removeClass("shock");
  },1700);
  if(die == 0){
    setTimeout(function(){
    //あなたのこうげき
    $(".monsterLi>li").addClass("damage");
    $(".message>p").text("あなたのこうげき、キングスライムに "+pAttck+"のダメージ");
    mHp = mHp-pAttck;
    dieCheck();
    $(".player01Li>.hp").text(pHp);
    setTimeout(function(){$(".monsterLi>li").removeClass("damage");},1500);
    },1500);
  }
}
return false;
});

/********* にげる *************/
$(".escape>a").click(function(){
  $(".message>p").text("あなたはにげだしました。");
  $(".commend").css("display","none");
  return false;
});

/********* どうぐ *************/
$(".item>a").click(function(){
  $(".message>p").text("あなたはやくそうをつかいました。\nHPが23かいふくしました。");
  pHp = pHp+23;
  $(".player01Li>.hp").text(pHp);
   //キングスライムのこうげき
    attckP();
    setTimeout(function(){
      $(".monsterLi>li").addClass("attck");
      $(".dqArea").addClass("shock");
      $(".message>p").text("キングスライムのこうげき、"+mAttck+"のダメージ！");
      pHp = pHp-mAttck;
      dieCheck();
      $(".player01Li>.hp").text(pHp);
      setTimeout(function(){
      $(".monsterLi>li").removeClass("attck");
      $(".dqArea").removeClass("shock");
      },2000);
    },2800);

    dieCheck();
  return false;
});

/********* ぼうぎょ *************/
$(".guard>a").click(function(){
  $(".message>p").text("あなたはみがまえています。");
  //キングスライムのこうげき
    attckP();
    mAttck = Math.floor(mAttck*0.4);
    setTimeout(function(){
      $(".monsterLi>li").addClass("attck");
      $(".dqArea").addClass("shock");
      $(".message>p").text("キングスライムのこうげき、"+mAttck+"のダメージ！");
      pHp = pHp-mAttck;
      dieCheck();
      $(".player01Li>.hp").text(pHp);
      setTimeout(function(){
        $(".monsterLi>li").removeClass("attck");
        $(".dqArea").removeClass("shock");
      },1500);
    },2000);
  return false;
});

//死亡チェック
function dieCheck(){
if(pHp<=0){
  $(".player01Li>.hp").text("0");
  die = 1;
  //pAttck=0;
  //$(".message>p").text("キングスライムのこうげき、"+mAttck+"のダメージ。あなたはしにました。");
  setTimeout(function(){$(".message>p").text("あなたはしにました。");},1300);
  $(".commend").css("display","none");
  $(".dqArea").removeClass("badCndtn");
  $(".dqArea").addClass("die");
  return die;
}else{die=0;}
if(mHp<=0){
  setTimeout(function(){$(".message>p").text("キングスライムをたおしました。");},1100);
  $(".monsterLi img").css("display","none");
  $(".commend").css("display","none");
  die =1;
  }else{die=0;}
  if(pHp<=30){
  $(".dqArea").addClass("badCndtn");
  }else{
  $(".dqArea").removeClass("badCndtn");
  }
}

//コマンド処理
$('.commend li').hover(function(){
$('.commend li').removeClass("cur");
$(this).addClass("cur");
});

init();
});

//攻撃力算出
function attckP(){
pAttck=Math.floor(Math.random()*10+20);
if(pAttck<=25){
pAttck=25;
}
mAttck=Math.floor(Math.random()*10+20);
if(mAttck<=25){
mAttck=25;
}
return false;
}

//ターン算出
function bTurn(){
turn=Math.floor(Math.random()*10);
if(turn<=5){
  turn=false;
}else{
  turn=true;
}
return false;
}
