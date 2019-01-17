const dataRanking = [
  {
    ranking: '1',
    name: 'Ichsan Indra Wahyudi',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '999999',
  },
  {
    ranking: '2',
    name: 'Irwanto',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '41604',
  },
  {
    ranking: '3',
    name: 'Rendi Christian Rendi Christian',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '19904',
  },
  {
    ranking: '4',
    name: 'Fajar',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '999999',
  },
  {
    ranking: '5',
    name: 'Ryan aja',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '6',
    name: 'Mbo Dharmi',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '7',
    name: 'Leonardy oleoleo oleoleo',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '8',
    name: 'Shinta Tamara',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '9',
    name: 'Zarrah',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10',
    name: 'Adek Tresno',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/thor.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
];

window.onBack = onBack;

function onBack(page) {
  renderHome();
}

$(document).ready(function() {
  renderHome();
});

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

// Home

window.renderHome = renderHome;
function renderHome() {
  // <p class="landing-page__desc">Kuis akan dimulai pada 12.00 - 13.00</p>;

  const html = `
    <div class="landing-page">
      <div class="landing-page__wrapper">
        <div class="landing-page__info">
          <p class="landing-page__info-text">Ichsan Indra mendapatkan skor 999.999</p>
          <span class="landing-page__info-num">999.999</span>
        </div>
        
        <div class="landing-page__container content">
          <div class="landing-page__menu menu">
            <a href="" class="menu__action menu__action--back"></a>
            <div class="landing-page__menu-right">
              <span class="menu__action menu__action--leaderboard" onclick="renderLeaderboard()"></span>
              <span class="menu__action menu__action--share"></span>
            </div>
          </div>
          
          <div class="landing-page__action">
            <img class="landing-page__logo" src="./assets/img/logo_marvel.png" alt="" srcset="">
            <div class="landing-page__title">
              <span>Quiz</span>
              <div class="landing-page__title-spark"></div>
            </div>
            <p class="landing-page__desc">Kuis akan segera dimulai.</p>
            <button onclick="startQuiz()" class="btn btn--primary">
              <div class="btn__inner">
                <span>Mulai Main</span>
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

      <audio id="js_sound-home" src="../assets/music/bg.mp3"></audio>

    </div>
  `;

  renderPage(html);
  soundsHome();
}

function soundsHome() {
  let audioHome = document.getElementById('js_sound-home');
  audioHome.play();
}

// Leaderboard

window.renderLeaderboard = renderLeaderboard;
function renderLeaderboard(page = 'home') {
  const html = `
    <div class="leaderboard">
      <div class="leaderboard__menu menu">
        <span onClick="renderHome()" class="menu__action menu__action--back"></span>
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

  renderPage(html);

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

window.startQuiz = startQuiz;
function startQuiz() {
  renderStartQuiz(
    'Bantu misi Captain Marvel dengan jawab 5 pertanyaan berikut ini'
  );
}

window.renderStartQuiz = renderStartQuiz;
function renderStartQuiz(text) {
  const html = `
  <div class="quiz">
    <div class="quiz__wrapper">
      <div class="quiz__start start">
        <div class="start__txt">${text}</div>
        <div class="start__timer countdown">
          <h1 class="start__timer-num countdown__num"></h1>
        </div>
      </div>
    </div>
    <div class="overlay"></div>
    <div class="dialog dialog--custom dialog--back">
      <div class="dialog__container">
        <div class="dialog__close" onclick="handleCloseDialog()"></div>
        <div class="dialog__content">
          <div class="dialog__inner">
            <h3 class="dialog__title">Kembali ke Home Captain Marvel Quiz?</h3>
            <p class="dialog__desc">Skor akan hangus dan Anda tidak dapat melanjutkan kuis hari ini apabila telah keluar.</p>
            <button class="btn btn--exit">
              <div class="btn__inner">
                <span>Ya, Keluar</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  renderPage(html);
  handleTimeStart(3);
}

function handleTimeStart(time) {
  $('.countdown__num').text(time);
  let timeStart = setInterval(() => {
    $('.countdown__num').text(time--);
    $('.countdown').addClass('countdown--animate');
    setTimeout(() => {
      $('.countdown').removeClass('countdown--animate');
    }, 500);
    if (time < 0) {
      clearInterval(timeStart);
      renderQuiz();
    }
  }, 1000);
}

window.renderQuiz = renderQuiz;
function renderQuiz() {
  const menu = `
    <div class="quiz__menu menu">
      <span class="menu__action menu__action--back" onclick="handleOpenDialog()"></span>
      <div id="js_quiz-time" class="countdown quiz__time">
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
      <div class="menu__score">
        <span>0</span>
      </div>
    </div>
  `;

  $('.quiz__wrapper').empty();
  $('.quiz__wrapper').append(menu);
  initQuiz();
}

function initQuiz() {
  const questions = `
    <div class="quiz__content quiz__content--text">

      <div class="quiz__question">
        <div class="quiz__question-inner">
          <span>Siapa pemeran utama pada film Kuch-Kuch Hota Hai?</span>
        </div>
      </div>
      
      <div class="quiz__answer">
        <div class="quiz__answer-btn">
          <div class="answer-btn" onclick="handleBtnAnswerTxt(this)">
            <div class="answer-btn__inner">
              <div class="answer-btn__val">
                <span>Ichsan Wahyudi</span>
              </div>
            </div>
          </div>
        </div>
        <div class="quiz__answer-btn">
          <div class="answer-btn" onclick="handleBtnAnswerTxt(this)">
            <div class="answer-btn__inner">
              <div class="answer-btn__val">
                <span>Ichsan Wahyudi</span>
              </div>
            </div>
          </div>
        </div>
        <div class="quiz__answer-btn">
          <div class="answer-btn" onclick="handleBtnAnswerTxt(this)">
            <div class="answer-btn__inner">
              <div class="answer-btn__val">
                <span>Ichsan Wahyudi</span>
              </div>
            </div>
          </div>
        </div>
        <div class="quiz__answer-btn">
          <div class="answer-btn" onclick="handleBtnAnswerTxt(this)">
            <div class="answer-btn__inner">
              <div class="answer-btn__val">
                <span>Ichsan Wahyudi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  const numberQuiz = `
    <h6 class="quiz__of">1 dari 5 pertanyaan</h6>
  `;

  $('.quiz__wrapper').append(questions);
  $('.quiz__content').append(numberQuiz);
  handleTimeQuiz(5);
}

function handleTimeQuiz(start) {
  $('.countdown__num').text(start);
  var bar = 500;
  var timeOut = setInterval(() => {
    $('.countdown__num').text(start--);
    $('.countdown').addClass('countdown--animate');
    bar = bar - 26;
    $('.countdown__progress-bar');
    $('.countdown__progress-bar').css({
      'stroke-dashoffset': bar,
    });
    setTimeout(() => {
      $('.countdown').removeClass('countdown--animate');
    }, 500);
    if (start < 0) {
      clearInterval(timeOut);
      handleCheckAnswer();
    }
  }, 1000);
}

function handleCheckAnswer() {
  let $answer = $('.answer-btn--active');
  // console.log($answer);
  $answer.removeClass('answer-btn--active').addClass('answer-btn--correct');
  // soundsCorrectAnswer();
  setTimeout(() => {
    renderComplete();
    // renderStartQuiz('Siap jawab pertanyaan kedua');
  }, 1000);
}

window.handleBtnAnswerTxt = handleBtnAnswerTxt;
function handleBtnAnswerTxt(e) {
  focusAnswer('text');
  $(e).addClass('answer-btn--active');
}

window.handleBtnAnswerImg = handleBtnAnswerImg;
function handleBtnAnswerImg(e) {
  focusAnswer('img');
  $(e).removeClass('answer-btn--disabled');
  $(e).addClass('answer-btn--active');
}

function soundsCorrectAnswer() {
  let audio = document.getElementById('js_sound-lock');
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 800);
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

function renderComplete() {
  const html = `
    <div class="game-over">
    <div class="game-over__menu menu">
      <span class="menu__action menu__action--back"></span>
      <span onclick="renderLeaderboard()" class="menu__action menu__action--leaderboard"></span>
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
      <button class="btn btn--primary">
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

    <audio id="js_sound-score" src="./assets/music/score.mp3"></audio>

  </div>
  `;

  renderPage(html);
  soundsScore(true);
  countUp(2000);
}

function renderAds() {
  const html = `
    <div class="ads">
      
    </div>
  `;

  $('.game-over').append(html)
}

function soundsScore(play) {
  let audioScore = document.getElementById('js_sound-score');
  if (play) {
    audioScore.play();
  } else {
    audioScore.pause();
  }
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
      soundsScore(false);
    }
  }, int_speed);
}
