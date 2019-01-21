import dataQuiz from './quiz.json';
import dataRanking from './ranking.json';

const quizReady = ['satu', 'dua', 'tiga', 'empat', 'lima'];
let quizCount = 0;
const totalQUiz = dataQuiz.questions.length;

$(document).ready(function() {
  initHome();
  // loading('%');
});

// Loading

// let numInterval = null;

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
    $('.loading__container').append(loadingPercent);
    let numInterval = setInterval(() => {
      num++;
      $('#js_loading-percent').text(`${num}%`);
      if (num == 20) {
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

  // $('#js_sound-quiz').remove();
  // $('body').prepend(soundBg);
  // soundOpening();

  $('body').empty();
  $('body').prepend(wrapper);
  $('body').prepend(sound);
  soundOpening();
  renderHome();
}

window.renderHome = renderHome;
function renderHome() {
  const html = `
    <div class="landing-page">
      <div class="landing-page__wrapper">
        <div class="landing-page__info">
          <p class="landing-page__info-text">Ichsan Indra mendapatkan skor 999.999</p>
          <span class="landing-page__info-num">999.999</span>
        </div>
        
        <div class="landing-page__container content">
          <div class="landing-page__action">
            <img class="landing-page__logo" src="./assets/img/logo_marvel.png" alt="" srcset="">
            <div class="landing-page__title">
              <span>Quiz</span>
              <div class="landing-page__title-spark"></div>
            </div>
            <div class="landing-page__content">
              <p class="landing-page__desc">Kuis akan dimulai pada 12.00 - 13.00</p>
              <button id="js_btn-landing" onclick="handleRemindMe(this)" class="btn btn--primary">
                <div class="btn__inner">
                  <div class="btn__inner-shine">
                    <span>Ingatkan Saya</span>
                  </div>
                </div>
              </button>
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
}

window.renderStatePlay = renderStatePlay;
function renderStatePlay() {
  $('.landing-page__desc').text('Kuis akan segera dimulai.');
  $('#js_btn-landing').removeAttr('onclick');
  $('#js_btn-landing').attr('onclick', 'renderStartQuiz()');
  $('#js_btn-landing')
    .find('span')
    .text('Mulai Main');
}

window.handleRemindMe = handleRemindMe;
function handleRemindMe(e) {
  if ($(e).hasClass('btn--transparent')) {
    $(e).removeClass('btn--transparent');
    $(e)
      .find('span')
      .text('Ingatkan Saya');
  } else {
    $(e).addClass('btn--transparent');
    $(e)
      .find('span')
      .text('Hapus Pengingat');
  }
}

function renderMenuHome() {
  const menu = `
    <div class="landing-page__menu menu">
      <a href="" class="menu__action menu__action--back"></a>
      <div class="landing-page__menu-right">
        <span class="menu__action menu__action--leaderboard" onclick="renderLeaderboard('home')"></span>
        <span class="menu__action menu__action--share"></span>
      </div>
    </div>
  `;

  $('.landing-page__container').prepend(menu);
}

// Leaderboard

window.renderLeaderboard = renderLeaderboard;
function renderLeaderboard(page) {
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
          <div id="js_ranking" class="ranking"></div>
        </div>

      </div>
    </div>
  `;

  renderWrapper(html);

  if (page == 'home') {
    $('.menu__action--back').attr('onclick', 'renderHome()');
  } else {
    $('.menu__action--back').attr('onclick', 'renderComplete()');
  }

  handleLoaderResult();
  topRanking(dataRanking);
  setTimeout(() => {
    initDataRanking();
  }, 2000);
}

function appendRankingElem(el) {
  $('#js_ranking').empty();
  $('#js_ranking').append(el);
}

function initDataRanking() {
  resultsRanking(dataRanking);
}

$(function handleScrollRanking() {
  $('#js_ranking').on({
    scroll: function() {
      let scroll = $(this).scrollTop();

      if (scroll > 0) {
        $('#js_search').addClass('search--shadow');
      } else {
        $('#js_search').removeClass('search--shadow');
      }
    },
  });
});

function topRanking(obj) {
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

$(function handleSearchRanking() {
  $('#js_search-ranking').on({
    input: function(e) {
      let _self = $(this);

      if (_self.val()) {
        _self.siblings().addClass('unf-searchbar__close--show');
      } else {
        _self.siblings().removeClass('unf-searchbar__close--show');
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
              // handleEmptyResult();
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
});

$(function handleResetSearchRanking() {
  $('#js_reset-search-ranking').on({
    click: function() {
      let input = $('#js_search-ranking');
      input.val('');
      input.siblings().removeClass('unf-searchbar__close--show');
      initDataRanking();
    },
  });
});

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
        <span>0</span>
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

function renderScore() {
  const score = `
    <div class="quiz__score">
      <div class="quiz__score-inner"><span>+14.230</span>Skor</div>
      <div class="quiz__score-background"><div></div></div>
    </div>
  `;

  $('.quiz').append(score);
}

function renderTimesup() {
  const score = `
    <div class="quiz__score quiz__score--wrong">
      <div class="quiz__score-inner">TIME IS UP</div>
      <div class="quiz__score-background"><div></div></div>
    </div>
  `;

  $('.quiz').append(score);
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
    if ($answer.length == 0) {
      handleCorrectAnswer();
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

// Complete

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
  soundOpening();
  soundGameOver();
  renderComplete();
}

function renderComplete() {
  const html = `
    <div class="game-over">
      <div class="game-over__menu menu">
        <span class="menu__action menu__action--back"></span>
        <span onclick="renderLeaderboard('complete')" class="menu__action menu__action--leaderboard"></span>
      </div>

      <div class="game-over__container">
        <div class="game-over__content">
          <h1 class="game-over__title">MISSION COMPLETE</h1>
          <h3 class="game-over__score">Total Skor : <span id="js_result-score">0</span></h3>
          <button class="btn btn--score">
            <div class="btn__inner">
              <span>Pamerkan Skor</span>
            </div>
          </button>
          <div class="game-over__separator">
            <div class="game-over__separator-inner"></div>
          </div>
        </div>
        <p class="game-over__desc">Lihat konten berikut untuk dapatkan 2x skor</p>
        <button class="btn btn--primary" onclick="renderAds()">
          <div class="btn__inner">
            <span>Gandakan Skor</span>
          </div>
        </button>
      </div>

      <div class="overlay"></div>
      <div class="dialog dialog--reward">
        <div class="dialog__container">
          <div id="js_close-dialog" class="dialog__close"></div>
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

      <div class="ads">
        <img class="ads__image" src="./assets/img/ads1.jpg" alt=""/>
      </div>

    </div>
  `;

  renderWrapper(html);
  // soundScore(true);
  countUp(457);
}

window.renderAds = renderAds;
function renderAds() {
  $('.ads').addClass('ads--show');
}

function countUp(count) {
  var div_by = 100,
    speed = Math.round(count / div_by),
    $display = $('#js_result-score'),
    run_count = 1,
    int_speed = 24;

  var int = setInterval(function() {
    if (run_count < div_by) {
      $display.text(speed * run_count);
      run_count++;
    } else if (parseInt($display.text()) < count) {
      var curr_count = parseInt($display.text()) + 1;
      $display.text(curr_count);
    } else {
      clearInterval(int);
      // soundScore(false);
    }
  }, int_speed);
}

// Audio

function soundOpening() {
  let audioHome = document.getElementById('js_sound-opening');
  audioHome.play();
  audioHome.loop = true;
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
  audioCountdown.loop = true;
  setTimeout(() => {
    audioCountdown.play();
  }, 1500);
}

function soundQuiz() {
  let audioQuiz = document.getElementById('js_sound-quiz');
  audioQuiz.volume = 0.2;
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
    }, 1200);
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
