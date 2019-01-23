import dataQuiz from './quiz.json';
import dataRanking from './ranking.json';

const quizReady = ['satu', 'dua', 'tiga', 'empat', 'lima'];
const totalQUiz = dataQuiz.questions.length;

let quizCount = 0;
let userScore = 0;
let participant = 1000;

let isViewAds = false;
let isPlayBtn = true;
let isLeaderboardOnAds = false;

$(document).ready(function() {
  // initGameOver();
  // initHome();
  checkDesktop();
  // loading('%');
});

// window.checkDesktop = checkDesktop
function checkDesktop() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null,
    windowWidth = $(window).width();

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  if ((os === 'Android' || os === 'iOS') && windowWidth <= 1024) {
    renderHome();
  } else {
    renderBlocker();
  }
}

window.renderBlocker = renderBlocker;
function renderBlocker() {
  var html = `
    <div class="blocker">
      <div class="blocker__container">
      <img src="https://lh3.googleusercontent.com/oqyY6hp_34ToIUKzxPEDSJ4Htk35VqoFwxvwoafWm31ujE0wzKpsESofGzOec85Dq3VXfrHxORHI0TxyBr0mZPISB2NozvIMnn0E8YYr8vdvaytGqxidcuJMOIxdIKK_DzRRVB1I5kn2_gpyrye0alTTpUWsj-LP6yb4Uf_uI_ZW4eMQx21jQwc_vD6EUpIBZGWF3PQQkKDGJZHmEv6L107Qys7Jx10tbHv9xiSCsAEmofS0teqz6Uq6N3mmIdlqX0pDyO9q9xtWcr2-HyYzlo5PD9kaUQw6I1uEz9CjScnR7eHejxZSAqqPP6GHzuC86MfnDily_kIx1YXUCntv1yjIHzhaksv9d_Iknw0TWR81_nNfowYCE1N49h2ZeJJ0-fAvzp-tJ1Pm__gRKbXo4G_CeYOinUiax0uGb9uraBVeN3ErEbyrj4NpkK6G9jijyEADvqLQyD5fEwGbo9ZE-GcPZNtTKDSOSxrH5bbaY0RkYgV6nQFTC4EtUYTCoowBL_NC39ORQcF7Kt2aSJwAjsxQIViiENzhyKJdd1tZtTE-1LVDyg3T9ZDf-NV7dujYmZELR3RuVuHMa5l_kumRfe3cSr1Zim-m=w2880-h1424"/>
      <div class="blocker__desc">
          NET Play Hanya dapat diakses melalui aplikasi.
          <br/>
          Download aplikasi Tokopedia di sini
      </div>
      <div class="blocker__download">
          <a href="https://itunes.apple.com/us/app/tokopedia-jual-beli-online/id1001394201#?platform=iphone" class="btn__download btn__download--ios"></a>
          <a href="https://play.google.com/store/apps/details?id=com.tokopedia.tkpd" class="btn__download btn__download--android"></a>
      </div>
      </div>
  </div>
  `;
  renderPage(html);
}

// Loading

function loading(percent = '') {
  const loading = `
  <div class="loading">
    <div class="loading__container">
      <div class="loading__loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
  `;

  const loadingPercent = `
    <span id="js_loading-percent" class="loading__percent">0%</span>
  `;

  $('body').append(loading);
  $('.overlay').addClass('overlay--show');
  if (percent != '') {
    let num = 0;
    if (percent != '') {
      $('.loading__container').append(loadingPercent);
    }
    let numInterval = setInterval(() => {
      num++;
      $('#js_loading-percent').text(`${num}%`);
      if (num == 75) {
        clearInterval(numInterval);
        $('.overlay').removeClass('overlay--show');
        $('.loading').remove();
      }
    }, 150);
  }
}

// General

$(function globalCloseDialog() {
  $('body').on({
    click: function(e) {
      if ($(event.target).hasClass('dialog--show')) {
        handleCloseDialog();
      }
    },
  });
});

window.handleOpenDialog = handleOpenDialog;
function handleOpenDialog() {
  $('body').addClass('lock');
  $('.overlay').addClass('overlay--show');
  $('.dialog').addClass('dialog--show');
}

window.handleCloseDialog = handleCloseDialog;
function handleCloseDialog() {
  $('body').removeClass('lock');
  $('.overlay').removeClass('overlay--show');
  $('.dialog').removeClass('dialog--show');
}

function renderPage(html) {
  $('body').empty();
  $('body').append(html);
}

function renderWrapper(html) {
  $('#wrapper').empty();
  $('#wrapper').append(html);
}

// Home

window.initHome = initHome;
function initHome() {
  const wrapper = `
    <div id="wrapper"></div>
  `;

  const sound = `
    <audio id="js_sound-opening" src="./assets/music/opening.mp3"></audio>
  `;

  $('body').empty();
  $('body').prepend(wrapper);
  $('body').prepend(sound);
  soundOpening('play');
  renderHome();
}

window.renderHome = renderHome;
function renderHome() {
  const html = `
    <div class="landing-page">
      <div class="landing-page__wrapper">
        <div class="landing-page__info">
          <div class="landing-page__info-text">Ichsan Indra mendapatkan skor 999.999</div>
          <span class="landing-page__info-num"></span>
        </div>
        
        <div class="landing-page__container content">
          <div class="landing-page__menu menu">
            <a href="" class="menu__action menu__action--back"></a>
            <div class="landing-page__menu-right">
              <span class="menu__action menu__action--leaderboard" onclick="renderLeaderboard('home')"></span>
              <span class="menu__action menu__action--share"></span>
            </div>
          </div>
          <div class="landing-page__action">
            <img class="landing-page__logo" src="./assets/img/logo_marvel.png" alt="" srcset="">
            <div class="landing-page__title">
              <span>Quiz</span>
              <div class="landing-page__title-spark"></div>
            </div>
            <div class="landing-page__content">
              <div class="landing-page__content-btn"></div>
              <button onclick="handleOpenDialog()" class="btn btn--small btn--price">
                <div class="btn__inner">
                  <span class="icon icon--price">Info Hadiah</span>
                </div>
              </button>
            </div>
          </div>
        </div> 
      </div>

      <div class="overlay"></div>
      <div class="dialog dialog--custom dialog--home">
        <div class="dialog__container">
          <div onclick="handleCloseDialog()" class="dialog__close"></div>
          <div class="dialog__star">
            <div class="dialog__star-line dialog__star-line--left">
              <div class="dialog__star-line__inner"></div>
            </div>
            <div class="dialog__star-icon"></div>
            <div class="dialog__star-line dialog__star-line--right">
              <div class="dialog__star-line__inner"></div>
            </div>
          </div>
          <div class="dialog__content">
            <div class="dialog__inner">       
              <p class="dialog__desc">Dapatkan kesempatan menangkan kupon cashback sampai 60%!</p>
              <div class="coupon">
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  renderWrapper(html);
  renderPlayBtn();
  dummyInfo();
  dummyParticipant();
}

var dummyInfoInterval;

function dummyInfo() {
  dummyInfoInterval = setInterval(function() {
    randomDummy();
  }, 1000);
}

function randomDummy() {
  let numb = Math.ceil(Math.random() * 10);
  if (numb >= 7) {
    otherPlayerInfo();
    clearInterval(dummyInfoInterval);
  }
}

function otherPlayerInfo() {
  let data = dataRanking[Math.floor(Math.random() * dataRanking.length)];
  $('.landing-page__info')
    .find('div:first-child')
    .html(
      `<div>${data.name}</div><div>mendapatkan skor ${convertScore(
        data.skor
      )}</div>`
    )
    .end()
    .addClass('landing-page__info--show');

  setTimeout(() => {
    $('.landing-page__info').removeClass('landing-page__info--show');
    dummyInfoInterval = setInterval(function() {
      randomDummy();
    }, 1000);
  }, 3000);
}

function dummyParticipant() {
  let dummyParticipantInterval = setInterval(function() {
    randomAdd();
  }, 1000);
}

function randomAdd() {
  var numb = Math.ceil(Math.random() * 10);
  if (numb >= 6) {
    participant += 1;
  } else if (numb > 3 && numb < 6) {
    participant -= 1;
  } else {
    participant += 0;
  }
  $('.landing-page__info>span').text(convertScore(participant));
}

function renderPlayBtn() {
  const playBtn = `
    <p class="landing-page__desc">Kuis telah dimulai</p>
    <button class="btn btn--primary" onclick="renderStartQuiz()">
      <div class="btn__inner">
        <div class="btn__inner-shine">
          <span>Mulai Main</span>
        </div>
      </div>
    </button>
  `;

  const remindBtn = `
    <p class="game-over__desc">Kuis akan dimulai pada 12.00 - 13.00</p>
    <button class="btn btn--primary" onclick="handleBtnReminder(this)">
      <div class="btn__inner">
        <div class="btn__inner-shine">
          <span>Ingatkan Saya</span>
        </div>
      </div>
    </button>
  `;

  if (isPlayBtn) {
    $('.landing-page__content-btn').append(playBtn);
  } else {
    $('.landing-page__content-btn').append(remindBtn);
  }
}

// function renderStatePlay() {
//   $('#js_btn-landing')
//     .prev()
//     .text('Kuis akan segera dimulai.');
//   $('#js_btn-landing').removeAttr('onclick');
//   $('#js_btn-landing').attr('onclick', 'renderStartQuiz()');
//   $('#js_btn-landing')
//     .find('span')
//     .text('Mulai Main');
// }

window.handleRemindMe = handleRemindMe;
function handleRemindMe(e) {
  let $this = $(e);
  if ($this.hasClass('btn--transparent')) {
    $this.removeClass('btn--transparent');
    $this.addClass('btn--primary');
    $this.find('span').text('Ingatkan Saya');
  } else {
    $this.removeClass('btn--primary');
    $this.addClass('btn--transparent');
    $this.find('span').text('Hapus Pengingat');
  }
}

// function renderMenuHome() {
//   const menu = `
//     <div class="landing-page__menu menu">
//       <a href="" class="menu__action menu__action--back"></a>
//       <div class="landing-page__menu-right">
//         <span class="menu__action menu__action--leaderboard" onclick="renderLeaderboard('home')"></span>
//         <span class="menu__action menu__action--share"></span>
//       </div>
//     </div>
//   `;

//   $('.landing-page__container').prepend(menu);
// }

// Leaderboard

window.renderLeaderboard = renderLeaderboard;
function renderLeaderboard(prevPage) {
  if (prevPage == 'home') {
    clearInterval(dummyInfoInterval);
    clearInterval(dummyParticipantInterval);
  }

  const html = `
    <div class="leaderboard">
      <div class="leaderboard__menu menu">
        <span class="menu__action menu__action--back"></span>
        <h1 class="menu__title">Leaderboard</h1>
      </div>

      <div class="leaderboard__container container">
        <div class="leaderboard__top">
          <div id="js_top-ranking" class="row"></div>
        </div>

        <div class="leaderboard__content">
          <div id="js_search" class="search">
            <div class="unf-searchbar">
              <input id="js_search-ranking" type="text" class="unf-searchbar__input" placeholder="Cari Namamu">
              <button id="js_reset-search-ranking" class="unf-searchbar__close"></button>
            </div>
          </div> 
          <div id="js_ranking" class="ranking" onscroll="handleScrollRanking(this)"></div>
        </div>

      </div>
    </div>
  `;

  renderWrapper(html);

  let backTo;

  switch (prevPage) {
    case 'home':
      backTo = 'renderHome()';
      break;

    case 'gameover':
      backTo = 'renderGameOver()';
      break;

    default:
      break;
  }

  $('.menu__action--back').attr('onclick', backTo);

  handleLoaderResult();
  handleLeaderBoardAction();
  setTimeout(() => {
    topRanking(dataRanking);
    initDataRanking();
  }, 3000);
}

function appendRankingElem(el) {
  $('#js_ranking').empty();
  $('#js_ranking').append(el);
}

function initDataRanking() {
  resultsRanking(dataRanking);
}

window.handleScrollRanking = handleScrollRanking;
function handleScrollRanking(e) {
  let scroll = $(e).scrollTop();
  if (scroll > 0) {
    $('#js_search').addClass('search--shadow');
  } else {
    $('#js_search').removeClass('search--shadow');
  }
}

function topRanking(obj) {
  $('#js_top-ranking').empty();

  obj = obj.filter(function(value, index, arr) {
    return value.ranking <= 3;
  });

  for (const key of obj) {
    const topRank = `
      <div class="col-4">
        <div class="top top--${key.ranking}">
          <div class="top__img">   
            <div class="top__img-border">
              <div class="top__img-val" style="background-image: url(${
                key.image
              })">
                <div class="top__star"></div>
              </div>
            </div>
          </div>

          <div class="top__info">
            <h4 class="top__info-name">${key.name}</h4>
            <h6 class="top__info-phone">${key.phone}</h6>
            <h5 class="top__info-score">${key.skor}</h5>
          </div>
        </div>
      </div>
    `;

    if (key.ranking != 2) {
      $('#js_top-ranking').append(topRank);
    } else {
      $('#js_top-ranking').prepend(topRank);
    }
  }
}

function resultsRanking(obj) {
  const listContainer = `
    <div id="js_ranking-list" class="ranking__list"></div> 
  `;

  appendRankingElem(listContainer);

  obj = obj.filter(function(value, index, arr) {
    return value.ranking > 3;
  });

  for (const key of obj) {
    var ranking = key.ranking;

    if (ranking > 999) {
      ranking = '999+';
    }

    const listRank = `
      <div class="row">
        <div class="ranking__list-left">
          <div class="ranking__info">
            <div class="info-num">
              <span>${ranking}</span>
            </div>
            <div class="info-profile">
              <div class="profile-text">
                <span class="profile-name">${key.name}</span>
                <span class="profile-phone">${key.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ranking__list-right">
          <span class="ranking__score">${key.skor}</span>
        </div>
      </div>
    `;

    $('#js_ranking-list').append(listRank);
  }
}

function handleLoaderResult() {
  for (let i = 1; i <= 3; i++) {
    const loaderTopRank = `
      <div class="col-4">
        <div class="top top--${i}">
          <div class="top__img top__img--loader">
            <span class="unf-loader-circle"></span>
          </div>
          <div class="top__info--loader-name">
            <span class="unf-loader-line"></span>
          </div>
          <div class="top__info--loader-phone">
            <span class="unf-loader-line"></span>
          </div>
          <div class="top__info--loader-score">
            <span class="unf-loader-line"></span>
          </div>
        </div>
      </div>
    `;

    if (i != 2) {
      $('#js_top-ranking').append(loaderTopRank);
    } else {
      $('#js_top-ranking').prepend(loaderTopRank);
    }
  }

  const loader = `<div id="js_ranking-loader" class="ranking__loader"></div>`;

  appendRankingElem(loader);

  const listLoader = `
    <div class="row">
      <div class="col-1">
        <span class="unf-loader-line"></span>
      </div>
      <div class="col-9">
        <div class="loader__name">
          <span class="unf-loader-line"></span>
        </div>
        <div class="loader__phone">
          <span class="unf-loader-line"></span>
        </div> 
      </div>
      <div class="col-2">
        <span class="unf-loader-line"></span>
      </div>
    </div>
  `;

  for (let i = 0; i < 5; i++) {
    $('#js_ranking-loader').append(listLoader);
  }
}

function handleLeaderBoardAction() {
  $('#js_search-ranking').on({
    input: function(e) {
      let $this = $(this);

      if ($this.val()) {
        $this.siblings().addClass('unf-searchbar__close--show');
      } else {
        $this.siblings().removeClass('unf-searchbar__close--show');
      }
    },
    keypress: function(e) {
      const results = [];
      let val = $(this).val();
      if (val) {
        if (e.which == 13) {
          $(this).blur();
          for (let i = 0; i < dataRanking.length; i++) {
            for (key in dataRanking[i]) {
              if (
                dataRanking[i][key].toLowerCase().indexOf(val.toLowerCase()) !=
                -1
              ) {
                results.push(dataRanking[i]);
              }
            }
          }
          handleLoaderResult();
          setTimeout(() => {
            if (results != 0) {
              resultsRanking(results);
            } else {
              handleEmptyResult();
            }
          }, 3000);
        }
      } else {
        if (e.which == 13) {
          $(this).blur();
          handleLoaderResult();
          setTimeout(() => {
            initDataRanking();
          }, 3000);
        }
      }
    },
  });

  // reset
  $('#js_reset-search-ranking').on({
    click: function() {
      let input = $('#js_search-ranking');
      input.val('');
      input.siblings().removeClass('unf-searchbar__close--show');
      initDataRanking();
    },
  });
}

function handleEmptyResult() {
  console.log('masuk');
}

// Quiz

window.renderStartQuiz = renderStartQuiz;
function renderStartQuiz() {
  const html = `
    <div class="quiz">
      <div class="quiz__wrapper">
        <div class="quiz__wrapper-start"></div>
        <div class="quiz__wrapper-menu"></div>
        <div class="quiz__wrapper-content"></div>
      </div>
      <div class="overlay"></div>
      <div class="dialog dialog--custom dialog--back">
        <div class="dialog__container">
          <div class="dialog__close" onclick="handleCloseDialog()"></div>
          <div class="dialog__content">
            <div class="dialog__inner">
              <h3 class="dialog__title">Kembali ke Home Captain Marvel Quiz?</h3>
              <p class="dialog__desc">Skor akan hangus dan Anda tidak dapat melanjutkan kuis hari ini apabila telah keluar.</p>
              <button class="btn btn--exit" onclick="initHome()">
                <div class="btn__inner">
                  <span>Ya, Keluar</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <audio id="js_sound-quiz" src="./assets/music/quiz.mp3"></audio>
      <audio id="js_sound-onboarding-quiz" src="./assets/music/start-quiz.mp3"></audio>
      <audio id="js_sound-choose" src="./assets/music/choose-answer.mp3"></audio>
      <audio id="js_sound-correct" src="./assets/music/right-answer.mp3"></audio>
      <audio id="js_sound-wrong" src="./assets/music/wrong-answer.mp3"></audio>
      <audio id="js_sound-countdown-quiz" src="./assets/music/countdown-quiz.mp3"></audio>
    </div>
  `;

  renderPage(html);
  soundOnboardingQuiz();
  getReady(false, dataQuiz.config.onboarding_message);
}

function getReady(next, text) {
  const countDown = `
    <div class="quiz__start start">
      <div class="start__txt">${text}</div>
      <div class="start__timer countdown">
        <div class="start__timer-moon countdown__illus"></div>
        <div class="start__timer-spark"></div>
        <h1 class="start__timer-num countdown__num"></h1>
      </div>
      <audio id="js_sound-countdown" src="./assets/music/countdowns.mp3"></audio>
    </div>
  `;

  $('.quiz__wrapper-start').prepend(countDown);
  soundCountdown();
  handleTimeStart(next, 3);
  if (next) {
    $('.quiz__time').remove();
  }
}

function handleTimeStart(next, time) {
  $('.countdown__num').text(time);
  let timeStart = setInterval(() => {
    $('.countdown__num').text(time--);
    $('.countdown').addClass('countdown--animate');
    setTimeout(() => {
      $('.countdown').removeClass('countdown--animate');
    }, 500);
    if (time < 0) {
      clearInterval(timeStart);
      $('.quiz__wrapper-start').empty();
      if (!next) {
        renderMenuQuiz();
        initQuiz();
      } else {
        initQuiz();
      }
    }
  }, 1500);
}

function renderMenuQuiz() {
  const menu = `
    <div class="quiz__menu menu">
      <span class="menu__action menu__action--back" onclick="handleOpenDialog()"></span>
      <div class="menu__score">
        <span id="js_quiz-score">0</span>
      </div>
    </div>
  `;

  $('.quiz__wrapper-menu').append(menu);
}

function renderTimeQuiz() {
  const time = `
    <div class="countdown quiz__time">
      <span class="countdown__num"></span>
      <svg class="countdown__progress">
        <defs>
          <linearGradient id="cdgradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#b21c26" />
            <stop offset="100%" style="stop-color:#ffdb84" />
          </linearGradient>
        </defs>
        <circle class="countdown__progress-gradient" fill="url(#cdgradient)"/>
        <circle class="countdown__progress-bar" />
      </svg>
    </div>
  `;

  $('.quiz__menu').append(time);
  handleTimeQuiz(10);
}

function renderScore(score) {
  let isScore = $('.quiz__score');

  if (isScore.length != 0) {
    isScore.remove();
  }

  const quizScore = `
    <div class="quiz__score">
      <div class="quiz__score-inner"><span>+${score}</span>Skor</div>
      <div class="quiz__score-background"><div style="background-image: url(../img/bg-quiz.jpg)"></div></div>
    </div>
  `;

  $('body').append(quizScore);

  setTimeout(() => {
    $('.quiz__score').addClass('quiz__score--hide');
  }, 3000);
}

function renderTimesup() {
  const quizTimesup = `
    <div class="quiz__score quiz__score--wrong">
      <div class="quiz__score-inner">TIME IS UP</div>
      <div class="quiz__score-background"><div></div></div>
    </div>
  `;

  $('body').append(quizTimesup);
}

function removeToasterScore() {
  $('.quiz__score').addClass('quiz__score--hide');
  setTimeout(() => {
    $('.quiz__score').remove();
  }, 300);
}

function initQuiz() {
  questionsAnswer(quizCount);
}

function questionsAnswer(idx) {
  soundQuiz();
  renderTimeQuiz();

  $('.quiz__wrapper-content').empty();

  const data = dataQuiz.questions[idx];
  let typeAnswerQuiz = true;

  const questionsContainer = `
    <div class="quiz__content">
      <div class="quiz__question"></div>
      <div class="quiz__answer"></div>
    </div>
  `;

  $('.quiz__wrapper-content').append(questionsContainer);

  let questions = `
    <div class="quiz__question-inner">
      <span>${data.question_text}</span>
    </div>
  `;

  $('.quiz__question').append(questions);

  if (data.config.img_url != '') {
    let questionsImg = `
      <img src="${data.config.img_url}" alt="">
    `;
    $('.quiz__question-inner').prepend(questionsImg);
  }

  let numberQuiz = `
    <h6 class="quiz__of">${idx + 1} dari ${totalQUiz} pertanyaan</h6>
  `;

  $('.quiz__content').append(numberQuiz);

  for (const key of data.answers) {
    let answer = `
      <div class="quiz__answer-btn">
        <div class="answer-btn">
          <div class="answer-btn__inner">
            <div class="answer-btn__val">
              <img src="${key.config.img_url}" alt="">
              <span>${key.answer_title}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    $('.quiz__answer').append(answer);

    if (key.config.img_url == '') {
      typeAnswerQuiz = false;
      $('.answer-btn__val img').remove();
    }
  }

  if (typeAnswerQuiz) {
    $('.quiz__answer').addClass('quiz__answer--img');
    $('.answer-btn').attr('onclick', 'handleBtnAnswerImg(this)');
  } else {
    $('.quiz__answer').addClass('quiz__answer--text');
    $('.answer-btn').attr('onclick', 'handleBtnAnswerTxt(this)');
  }
}

// function handleTimeQuiz(start) {
//   var newStart = start;
//   var bar = 82;

//   $('.countdown__num').text(start);
//   setTimeout(function() {
//     $('.countdown__progress-bar').css({
//       'stroke-dashoffset': ((newStart - 1) / start) * bar,
//       transition: 'stroke-dashoffset 1s linear',
//     });
//   }, 1);

//   var timeOut = setInterval(() => {
//     newStart -= 1;
//     var newBar =
//       ((newStart - 1) / start) * bar > 0 ? ((newStart - 1) / start) * bar : 0;
//     $('.countdown__num').text(Math.ceil(newStart));
//     $('.countdown').addClass('countdown--animate');
//     setTimeout(() => {
//       $('.countdown').removeClass('countdown--animate');
//     }, 500);
//     $('.countdown__progress-bar').css({
//       'stroke-dashoffset': newBar,
//     });
//     if (newStart < 3) {
//       soundCountdownQuiz('play');
//     }
//     if (newStart <= 0) {
//       clearInterval(timeOut);
//       soundCountdownQuiz('stop');
//       handleCheckAnswer();
//     }
//   }, 1000);
// }

function handleTimeQuiz(start) {
  $('.countdown__num').text(start);
  var bar = 500;
  var timeOut = setInterval(() => {
    $('.countdown__num').text(start--);
    $('.countdown').addClass('countdown--animate');
    setTimeout(() => {
      $('.countdown').removeClass('countdown--animate');
    }, 500);
    if (start < 3) {
      soundCountdownQuiz('play');
    }
    if (start < 0) {
      clearInterval(timeOut);
      soundCountdownQuiz('stop');
      handleCheckAnswer();
    }
  }, 1000);

  var barCount = setInterval(() => {
    $('.countdown__progress-bar');
    $('.countdown__progress-bar').css({
      'stroke-dashoffset': bar--,
    });
    if (start < 0) {
      clearInterval(barCount);
    }
  }, 70);
}

function handleCheckAnswer() {
  let $answer = $('.answer-btn--active');
  if ($answer.length != 0) {
    // Check answer correct or wrong
    if ($answer.length != 0) {
      handleCorrectAnswer();
      addScore(1000);
    } else {
      handleWrongAnswer();
    }
  } else {
    renderTimesup();
  }

  quizCount++;
  if (quizCount <= totalQUiz - 1) {
    setTimeout(() => {
      nextQuestions();
    }, 3000);
  } else {
    setTimeout(() => {
      gameOver();
    }, 5000);
  }
}

function handleCorrectAnswer() {
  soundCorrectAnswer();
  setTimeout(() => {
    $('.answer-btn--active')
      .removeClass('answer-btn--active')
      .addClass('answer-btn--correct');
  }, 1000);
}

function handleWrongAnswer() {
  $('.answer-btn--active')
    .removeClass('answer-btn--active')
    .addClass('answer-btn--wrong');
  soundWrongAnswer();
}

function nextQuestions() {
  removeToasterScore();
  setTimeout(() => {
    $('.quiz__time').addClass('quiz__time--hide');
    $('.quiz__content').addClass('quiz__content--hide');
  }, 500);
  setTimeout(() => {
    getReady(true, `Siap jawab pertanyaan ke${quizReady[quizCount]}`);
  }, 1500);
}

window.handleBtnAnswerTxt = handleBtnAnswerTxt;
function handleBtnAnswerTxt(e) {
  focusAnswer('text');
  $(e).addClass('answer-btn--active');
  soundChooseAnswer();
}

window.handleBtnAnswerImg = handleBtnAnswerImg;
function handleBtnAnswerImg(e) {
  focusAnswer('img');
  $(e).removeClass('answer-btn--disabled');
  $(e).addClass('answer-btn--active');
  soundChooseAnswer();
}

function focusAnswer(type) {
  if (type == 'img') {
    $('.answer-btn').addClass('answer-btn--disabled');
  }

  if (type == 'text') {
    $('.answer-btn').addClass('answer-btn--off');
  }

  $('.answer-btn').removeClass('answer-btn--active');
}

// GameOver

function gameOver() {
  removeToasterScore();
  setTimeout(() => {
    $('.quiz__time').addClass('quiz__time--hide');
    $('.quiz__content').addClass('quiz__content--hide');
  }, 500);
  setTimeout(() => {
    initGameOver();
  }, 1000);
}

function initGameOver() {
  const wrapper = `
    <div id="wrapper"></div>
  `;

  const sound = `
    <audio id="js_sound-opening" src="./assets/music/opening.mp3"></audio>
    <audio id="js_sound-game-over" src="./assets/music/game-over.mp3"></audio>
  `;
  $('body').empty();
  $('body').prepend(wrapper);
  $('body').prepend(sound);
  soundOpening('play');
  soundGameOver();
  renderGameOver();
}

window.renderGameOver = renderGameOver;
function renderGameOver() {
  const html = `
    <div class="game-over">
      <div class="game-over__menu menu">
        <span class="menu__action menu__action--back"></span>
        <span onclick="renderLeaderboard('gameover')" class="menu__action menu__action--leaderboard"></span>
      </div>

      <div class="game-over__container">
        <div class="game-over__content">
          <h1 class="game-over__title">MISSION COMPLETE</h1>
          <h3 class="game-over__score">Total Skor : <span id="js_result-score">${convertScore(
            userScore
          )}</span></h3>
          <button class="btn btn--score">
            <div class="btn__inner">
              <span>Pamerkan Skor</span>
            </div>
          </button>
          <div class="game-over__separator">
            <div class="game-over__separator-inner"></div>
          </div>
        </div>
        <div class="game-over__footer"></div>
      </div>

      <div class="overlay"></div>
      <div class="dialog dialog--custom dialog--reward">
        <div class="dialog__container">
          <div class="dialog__close" onclick="handleCloseDialog()"></div>
          <div class="dialog__star">
            <div class="dialog__star-line dialog__star-line--left">
              <div class="dialog__star-line__inner"></div>
            </div>
            <div class="dialog__star-icon"></div>
            <div class="dialog__star-line dialog__star-line--right">
              <div class="dialog__star-line__inner"></div>
            </div>
          </div>
          <div class="dialog__content">
            <div class="dialog__inner dialog__inner--star">
              <p class="dialog__desc">Selamat!<br>
              Anda mendapatkan kupon cashback hingga Rp 200.000</p>
              <div class="coupon">
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
                <div class="coupon__list">
                  <img src="./assets/img/coupon.png" alt="" srcset="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  renderWrapper(html);
  renderGameOverBtn(isViewAds);

  if (!isLeaderboardOnAds) {
    isLeaderboardOnAds = true;
    countUp('#js_result-score', userScore);
    handleOpenDialog();
  }
}

function renderGameOverBtn() {
  $('.game-over__footer').empty();

  const doubleSkor = `
    <p class="game-over__desc">Lihat konten berikut untuk dapatkan 2x skor</p>
    <button class="btn btn--primary" onclick="renderAds()">
      <div class="btn__inner">
        <div class="btn__inner-shine">
          <span>Gandakan Skor</span>
        </div>
      </div>
    </button>
  `;

  const remindBtn = `
    <p class="game-over__desc">Kuis akan dimulai pada 12.00 - 13.00</p>
    <button class="btn btn--primary" onclick="handleBtnReminder(this)">
      <div class="btn__inner">
        <div class="btn__inner-shine">
          <span>Ingatkan Saya</span>
        </div>
      </div>
    </button>
  `;

  if (isViewAds) {
    $('.game-over__footer').append(remindBtn);
  } else {
    $('.game-over__footer').append(doubleSkor);
  }
}

// function countUp(count) {
//   var div_by = 100,
//     speed = Math.round(count / div_by),
//     $display = $('#js_result-score'),
//     run_count = 1,
//     int_speed = 24;

//   var int = setInterval(function() {
//     if (run_count < div_by) {
//       $display.text(speed * run_count);
//       run_count++;
//     } else if (parseInt($display.text()) < count) {
//       var curr_count = parseInt($display.text()) + 1;
//       $display.text(curr_count);
//     } else {
//       clearInterval(int);
//     }
//   }, int_speed);
// }

function countUp(el, count, start) {
  console.log(start, count);
  var $display = $(el),
    init = start === undefined ? 0 : start,
    add = 1,
    inc = 0;
  console.log(init);
  $display.text(convertScore(init));
  var counting = setInterval(() => {
    init += add;
    inc += add;
    add = Math.ceil(inc / 10);
    if (init < count) {
      $display.text(convertScore(init));
    } else {
      $display.text(convertScore(count));
      clearInterval(counting);
    }
  }, 25);
}

function addScore(score, results) {
  renderScore(score);
  if (results) {
    countUp('#js_result-score', userScore + score, score);
  } else {
    countUp('#js_quiz-score', userScore + score, score);
  }

  userScore += score;
}

function convertScore(score) {
  score += '';
  var x = score.split(',');
  var x1 = x[0];
  var x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

// Ads

window.renderAds = renderAds;
function renderAds() {
  soundOpening('stop');
  isViewAds = true;

  const ads = `
    <div class="ads">
      <div class="ads__countdown">
          <span class="countdown__num" onclick="closeAds()"></span>
          <svg class="countdown__progress">
              <linearGradient id="cdgradient" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#EEBA3F" />
                  <stop offset="100%" style="stop-color:#FAEAC9" />
              </linearGradient>
              <circle class="countdown__progress-gradient" fill="url(#cdgradient)"/>
              <circle class="countdown__progress-bar" />
          </svg>
      </div>
      <a href="https://www.tokopedia.com/" target="_blank">
        <img class="ads__image" src="https://lh3.googleusercontent.com/WfRh1tG1HGwtToqPc75BR_CA5eRBx-NbL3JZ0cS8ZxdbVw8eiSwWsqnQzUBh4UX7Hv7zISEH3wsgJ9dAqoc9HPFHavRDCgZaLL8XsOhWJ1xwjM53xzaqgV9zycwm_TLn8vLRWXNIjrh2_r9Uv5nSq1uB-CIv9WkakkEO_IHPtKAuTSG0YIan-qrPmCImbpIfUnoUsCiXcvt4HI_rbG0110WqRO9bGOUvp16KhJpzhD-zuYM3J-43ExUx2_STOf1W_Cm5s7aUYpuaWp9ECzXqDWloijtRjzIuG_Qmmf6Fn6wHxdONfFUkTdcjO_fpRxpAjnEjEzRU4JLNeJXUpT0sAUtR49igIQATYRVLP1FNRqVsTsnBm6z8CmFePI4pkh4ysGMfSVY3UVJzzqpuEi4LM4pOXmpNpOXEs9L9oIo8UERjbDHanNfY-RFMXj0CXBQeQunyff95ahsFdU9vTes2ZEbwJrRrSsiQLxWyOF3iazQN5YtbEUKj16s7bGyTOppCkMklOPR6CrV0z6mQAdqyJooq2xF-ArjFb-rPIPpojtWS9F1DN00UCtY5VlJvR-m67-nbaOvAQKLDynIjyWJ1x7thmmtLcs0Y=w2880-h1424" alt=""/>
      </a>
    </div>
  `;

  $('.game-over').append(ads);
  handleTimeAds(10);
}

function handleTimeAds(start) {
  var newStart = start;
  var bar = 82;

  $('.ads .countdown__num').text(start);
  setTimeout(function() {
    $('.ads .countdown__progress-bar').css({
      'stroke-dashoffset': ((newStart - 1) / start) * bar,
      transition: 'stroke-dashoffset 1s linear',
    });
  }, 1);

  var timeOut = setInterval(() => {
    newStart -= 1;
    var newBar =
      ((newStart - 1) / start) * bar > 0 ? ((newStart - 1) / start) * bar : 0;
    $('.ads .countdown__num').text(Math.ceil(newStart));
    $('.ads .countdown__progress-bar').css({
      'stroke-dashoffset': newBar,
    });
    if (newStart <= 0) {
      $('.ads .countdown__num')
        .text('')
        .addClass('countdown__num--close');
      clearInterval(timeOut);
    }
  }, 1000);
}

window.closeAds = closeAds;
function closeAds() {
  $('.ads').addClass('ads--hide');
  setTimeout(() => {
    $('.ads').remove();
  }, 300);

  soundOpening('play');
  soundGameOver();
  addScore(userScore, true);
  renderGameOverBtn(isViewAds);
}

window.handleBtnReminder = handleBtnReminder;
function handleBtnReminder(e) {
  let $this = $(e);
  if ($this.hasClass('btn--transparent')) {
    $this.removeClass('btn--transparent');
    $this.addClass('btn--primary');
    $this.find('span').text('Ingatkan Saya');
  } else {
    $this.removeClass('btn--primary');
    $this.addClass('btn--transparent');
    $this.find('span').text('Hapus Pengingat');
  }
}

// Audio

function soundOpening(type) {
  let audioHome = document.getElementById('js_sound-opening');
  if (type == 'play') {
    audioHome.play();
    audioHome.loop = true;
  } else {
    audioHome.pause();
    setTimeout(() => {
      audioHome.currentTime = 0;
    }, 100);
  }
}

function soundGameOver() {
  let audioHome = document.getElementById('js_sound-game-over');
  audioHome.play();
}

function soundOnboardingQuiz() {
  let audioStartQuiz = document.getElementById('js_sound-onboarding-quiz');
  audioStartQuiz.play();
}

function soundCountdown() {
  let audioCountdown = document.getElementById('js_sound-countdown');
  setTimeout(() => {
    audioCountdown.play();
    audioCountdown.loop = true;
  }, 1500);
}

function soundQuiz() {
  let audioQuiz = document.getElementById('js_sound-quiz');
  audioQuiz.play();
  audioQuiz.loop = true;
}

function soundCountdownQuiz(type) {
  let audioCountdown = document.getElementById('js_sound-countdown-quiz');
  audioCountdown.loop = true;
  if (type == 'play') {
    audioCountdown.play();
  } else {
    audioCountdown.pause();
    setTimeout(() => {
      audioCountdown.currentTime = 0;
    }, 1105);
  }
}

function soundChooseAnswer() {
  let audioChooseAnswer = document.getElementById('js_sound-choose');
  audioChooseAnswer.play();
}

function soundCorrectAnswer() {
  let audioCorrectAnswer = document.getElementById('js_sound-correct');
  audioCorrectAnswer.play();
}

function soundWrongAnswer() {
  let audioWrongAnswer = document.getElementById('js_sound-wrong');
  audioWrongAnswer.play();
  audioWrongAnswer.volume = 0.6;
}

function soundScore(type) {
  let audioScore = document.getElementById('js_sound-score');
  if (type == 'play') {
    audioScore.play();
    audioScore.loop = true;
  } else {
    audioScore.pause();
  }
}
