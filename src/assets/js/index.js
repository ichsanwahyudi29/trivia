import dataQuiz from './quiz.json';
import dataRanking from './ranking.json';

const quizReady = ['satu', 'dua', 'tiga', 'empat', 'lima'];
const totalQUiz = dataQuiz.questions.length;

let quizCount = 1;
let userScore = 0;
let participant = 378653;
let isLoad = true;
let loadAmount = 0;

let username = 'Peter';
let isViewAds = false;
let isPlayBtn = true;
let isLeaderboardOnAds = false;
let getCoupon = true;

// page
var loadPage = $('#load-page').text();
var blockerPage = $('#blocker-page').text();
var homePage = $('#home-page').text();
var leaderPage = $('#leader-page').text();
var quizPage = $('#quiz-page').text();
var overPage = $('#over-page').text();

//container
var listRankContainer = $('#list-rank-container').text();
var loaderContainer = $('#loader-container').text();
var quizMenuContainer = $('#quiz-menu-container').text();

//templater
var topRankTemp = $('#top-rank-template').text();
var listRankTemp = $('#list-rank-template').text();
var loaderTopRankTemp = $('#loader-top-rank-template').text();
var loaderListRankTemp = $('#loader-list-rank-template').text();
var quizCountdownTemp = $('#quiz-countdown-template').text();
var quizTimerTemp = $('#quiz-timer-template').text();
var adsTemp = $('#ads-template').text();
// var bottomSheetTemp = $('#bottom-sheet-template').text();

$(document).ready(function() {
  // renderHome();
  // renderGameOver()
  renderLeaderboard()
  // checkDesktop();
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

// Blocker Page

function renderBlocker() {
  var html = blockerPage;
  renderPage(html);
}

// Loading

function loading(percent = false) {
  const loading = loadPage;

  // console.log(!!percent);

  if (isLoad) {
    $('body').append(loading);
    $('.overlay').addClass('overlay--show');

    let num = 0;
    let numInterval = setInterval(() => {
      num++;
      $('#js_loading-percent').text(`${num}%`);
      if (num == 75) {
        num = 100;
      }

      if (num >= 100) {
        clearInterval(numInterval);
        $('.overlay').removeClass('overlay--show');
        $('.loading').remove();
      }
    }, 30);
    isLoad = false;
  }
}

// function loading(percent = '') {
//   const loading = `
//   <div class="loading">
//     <div class="loading__container">
//       <div class="loading__loader">
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     </div>
//   </div>
//   `;

//   const loadingPercent = `
//     <span id="js_loading-percent" class="loading__percent">0%</span>
//   `;

//   $('body').append(loading);
//   $('.overlay').addClass('overlay--show');
//   if (percent != '') {
//     let num = 0;
//     if (percent != '') {
//       $('.loading__container').append(loadingPercent);
//     }
//     let numInterval = setInterval(() => {
//       num++;
//       $('#js_loading-percent').text(`${num}%`);
//       if (num == 75) {
//         clearInterval(numInterval);
//         $('.overlay').removeClass('overlay--show');
//         $('.loading').remove();
//       }
//     }, 150);
//   }
// }

// General

$(function globalCloseDialog() {
  $('body').on({
    click: function() {
      if (
        $(event.target).hasClass('dialog--show') ||
        $(event.target).hasClass('overlay--show')
      ) {
        handleCloseDialog();
        handleCloseBottomSheet();
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

function handleOpenBottomSheet() {
  $('.bottom-sheet').addClass('bottom-sheet--show');
  $('.overlay').addClass('overlay--show');
}

window.handleCloseBottomSheet = handleCloseBottomSheet;
function handleCloseBottomSheet() {
  $('.bottom-sheet').removeClass('bottom-sheet--show');
  $('.overlay').removeClass('overlay--show');
  setTimeout(() => {
    $('.bottom-sheet').remove();
  }, 300);
}

function renderPage(html) {
  $('#wrapper').empty();
  $('#wrapper').append(html);
}

function renderWrapper(html) {
  $('#wrapper').empty();
  $('#wrapper').append(html);
}

// Home

window.renderHome = renderHome;
function renderHome() {
  let html = homePage
    .replace('$otherPlayersInfo', '')
    .replace('$participant', convertScore(participant));

  renderPage(html);
  soundOpening('play');
  renderPlayBtn();

  loading(loadAmount);
  // loading();
  dummyInfo();
  dummyParticipant();
}

function renderPlayBtn() {
  var target = '#js_main-btn';
  if (isPlayBtn) {
    $(target)
      .attr('onclick', 'renderStartQuiz()')
      .find('.btn__inner')
      .text('Mulai Main')
      .end()
      .prev()
      .text('Kuis akan segera dimulai..');
  } else {
    $(target)
      .attr('onclick', 'handleBtnReminder(this)')
      .find('.btn__inner')
      .text('Ingatkan Saya')
      .end()
      .prev()
      .text('Kuis akan dimulai pada 12.00 - 13.00');
  }
}

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

var dummyInfoInterval, dummyParticipantInterval;

function dummyInfo() {
  var data = dataRanking[Math.floor(Math.random() * dataRanking.length)];
  $('.landing-page__info')
    .find('div:first-child')
    .html(
      `<div>${data.name}</div>
            <div>mendapatkan skor ${convertScore(data.skor)}</div>`
    )
    .end()
    .addClass('landing-page__info--show');

  dummyHideInfo();
}

function dummyHideInfo() {
  dummyInfoInterval = setInterval(function() {
    var num = Math.ceil(Math.random() * 20);
    if (num > 17) {
      clearInterval(dummyInfoInterval);
      $('.landing-page__info').removeClass('landing-page__info--show');
      setTimeout(() => {
        dummyInfo();
      }, 150);
    }
  }, 1000);
}

function dummyParticipant() {
  dummyParticipantInterval = setInterval(function() {
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
  //clear dummy interval
  if (prevPage == 'home') {
    clearInterval(dummyInfoInterval);
    clearInterval(dummyParticipantInterval);
  }

  var back;
  switch (prevPage) {
    case 'home':
      back = 'renderHome()';
      break;

    case 'complete':
      back = 'renderComplete()';
      break;

    default:
      break;
  }
  var html = leaderPage.replace('$back', back);
  renderPage(html);

  handleLoaderResult();
  handleLoaderOwnRank();
  handleLeaderBoardAction();

  setTimeout(() => {
    initDataRanking();
    topRanking(dataRanking);
  }, 1000);
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
    var topRank = topRankTemp
      .replace('$ranking', key.ranking)
      .replace('$image', key.image)
      .replace('$name', key.name)
      .replace('$phone', key.phone)
      .replace('$skor', key.skor);

    if (key.ranking != 2) {
      $('#js_top-ranking').append(topRank);
    } else {
      $('#js_top-ranking').prepend(topRank);
    }
  }
}

function resultsRanking(obj, search) {
  var listContainer = listRankContainer;
  appendRankingElem(listContainer);

  var filteredObj = obj.filter(function(value, index, arr) {
    return (value.ranking > 3) & (value.ranking <= 10);
  });

  var changeObj = !search ? filteredObj : obj;
  for (var key of changeObj) {
    var ranking = key.ranking;
    if (ranking > 999) {
      ranking = '999+';
    }
    var listRank = listRankTemp
      .replace('$ranking', ranking)
      .replace('$name', key.name)
      .replace('$phone', key.phone)
      .replace('$skor', key.skor);
    $('#js_ranking-list').append(listRank);
  }
  var checkOwnObj = !search ? obj.filter(value => value.ranking <= 10) : obj;
  checkOwnRank(checkOwnObj, search);
  shadowRankList($('#js_ranking'));
  resizeRankHeight($('#js_ranking'));
}

function handleLoaderResult(search) {
  const loader = loaderContainer;

  appendRankingElem(loader);
  if (!search) {
    for (var i = 1; i <= 3; i++) {
      var loadRank = loaderTopRankTemp.replace('$id', i);

      if (i != 2) {
        $('#js_top-ranking').append(loadRank);
      } else {
        $('#js_top-ranking').prepend(loadRank);
      }
    }
  }
  const listLoader = loaderListRankTemp;

  for (let i = 0; i < 3; i++) {
    $('#js_ranking-loader').append(listLoader);
  }

  resizeRankHeight($('#js_ranking'));
  $('#js_leader-container').addClass('border-radius-12');
}

function handleLoaderOwnRank() {
  const listLoader = loaderListRankTemp;
  var html = listRankTemp
    .replace('$ranking', 35)
    .replace('$name', username)
    .replace('$phone', '08743xxx872')
    .replace('$skor', 8000);

  $('#js_own-rank').html(html);
  $('#js_leader-container').addClass('own-rank--hide');
  setTimeout(() => {
    $('#js_own-rank').html(html);
  }, 1000);
}

function checkOwnRank(obj, search) {
  for (var i in obj) {
    if (obj[i].name === username) {
      $('#js_ranking').css({
        'max-height': $(window).height() - 338,
      });
      return;

    } else {
      if(search){
        $('#js_leader-container').addClass('own-rank--hide');
        $('#js_ranking').css({
          'max-height': $(window).height() - 338,
        });
        console.log(i, search)
      }
      else{
        $('#js_leader-container').removeClass('own-rank--hide');
        $('#js_ranking').removeAttr('style');
      }
    }
  }
}

function resizeRankHeight(e) {
  let scroll = e.scrollTop();
  if (scroll + e.height() < e[0].scrollHeight) {
    $('#js_leader-container').removeClass('border-radius-12');
  } else {
    $('#js_leader-container').addClass('border-radius-12');
  }
}

function shadowRankList(e) {
  let scroll = e.scrollTop();

  if (scroll > 0) {
    $('#js_search').addClass('search--shadow');
  } else {
    $('#js_search').removeClass('search--shadow');
  }

  if (scroll + e.height() < e[0].scrollHeight) {
    $('#js_own-rank').addClass('search-down--shadow');
  } else {
    $('#js_own-rank').removeClass('search-down--shadow');
  }
}

function handleLeaderBoardAction() {
  //rank scroll effect
  $('#js_ranking').on({
    scroll: function() {
      shadowRankList($(this));
    },
  });

  //ranking
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
      var data = dataRanking;
      var results = [];
      let val = $(this).val();
      if (val) {
        if (e.which == 13) {
          $('#js_ranking').removeClass('ranking--not-found');
          $(this).blur();
          results = data.filter(item =>
            item.name.toLowerCase().includes(val.toLowerCase())
          );

          handleLoaderResult(true);
          $('#js_leader-container').addClass('own-rank--hide');
          setTimeout(() => {
            if (results != 0) {
              resultsRanking(results, true);
            } else {
              resultsRanking(results, true);
              $('#js_ranking')
                .addClass('ranking--not-found')
                .text('Nama tidak ditemukan');
            }
          }, 3000);
        }
      } else {
        if (e.which == 13) {
          $('#js_ranking').removeClass('ranking--not-found');
          $(this).blur();
          handleLoaderResult(true);
          setTimeout(() => {
            initDataRanking();
          }, 3000);
        }
      }
    },
  });

  //reset
  $('#js_reset-search-ranking').on({
    click: function() {
      let input = $('#js_search-ranking');
      input.val('');
      input.siblings().removeClass('unf-searchbar__close--show');
      initDataRanking();
      $('#js_ranking').removeClass('ranking--not-found');
      setTimeout(() => {
        shadowRankList($('#js_ranking'));
        resizeRankHeight($('#js_ranking'));
      }, 100);
    },
  });
}

// Quiz

window.renderStartQuiz = renderStartQuiz;
function renderStartQuiz() {
  const html = quizPage;

  renderPage(html);
  soundOpening('stop');
  soundOnboardingQuiz('play');
  getReady(false, dataQuiz.config.onboarding_message);
}

function getReady(next, text) {
  const countDown = quizCountdownTemp.replace('$text', text);
  $('.quiz__wrapper-start').prepend(countDown);
  soundCountdownGetReady('play');
  handleTimeStart(next, 3);
  // if (next) {
  //   $('.quiz__time').remove();
  // }
}

let timeStart;
function handleTimeStart(next, time) {
  $('.start .countdown__num').text(time);
  $('.start .countdown').addClass('countdown--animate');
  setTimeout(() => {
    $('.start .countdown').removeClass('countdown--animate');
  }, 500);

  timeStart = setInterval(() => {
    time -= 1;
    $('.start .countdown__num').text(time);
    $('.start .countdown').addClass('countdown--animate');
    setTimeout(() => {
      $('.start .countdown').removeClass('countdown--animate');
    }, 500);
    if (time <= 0) {
      clearInterval(timeStart);
      $('.quiz__wrapper-start').empty();
      if (!next) {
        renderMenuQuiz();
        initQuiz();
      } else {
        initQuiz();
        $('.quiz__time').removeClass('quiz__time--hide');
      }
    }
  }, 1000);
}

function renderMenuQuiz() {
  const menu = quizMenuContainer.replace('$score', userScore);
  $('.quiz__wrapper-menu').html(menu);
}

function renderTimeQuiz() {
  const time = quizTimerTemp;

  $('.quiz__menu')
    .find('.quiz__time')
    .remove()
    .end()
    .append(time);
  handleTimeQuiz(10);
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

  // data.answers.map(key => {
  //   var type, val;

  //   if (key.config.img_url === '') {
  //     type = 'text';
  //     val = `<span>${key.answer_title}</span>`;
  //     $('.quiz__content').addClass('quiz__content--text')
  //   } else {
  //     $('.quiz__content').addClass('quiz__content--img');
  //     type = 'img';
  //     val = `<img src="${key.config.img_url}" alt="${key.answer_title}"><span>${key.answer_title}</span>`;
  //   }

  //   let answer = `
  //           <div class="quiz__answer-btn">
  //               <div class="answer-btn" onclick="handleBtnAnswer(this, '${type}')">
  //                   <div class="answer-btn__inner">
  //                       <div class="answer-btn__val">
  //                           ${val}
  //                       </div>
  //                   </div>
  //               </div>
  //           </div>`;
  //   $('.quiz__answer').append(answer);
  // });

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

function renderScore(score) {
  $('.quiz__score')
    .removeClass('quiz__score--hide quiz__score--wrong')
    .addClass('quiz__score--show')
    .find('.quiz__score-inner')
    .html(`<span>+${convertScore(score)}</span>Skor`);

  setTimeout(() => {
    $('.quiz__score')
      .removeClass('quiz__score--show')
      .addClass('quiz__score--hide');
  }, 3000);
}

function renderTimesup() {
  $('.quiz__score')
    .removeClass('quiz__score--hide')
    .addClass('quiz__score--wrong quiz__score--show')
    .find('.quiz__score-inner')
    .text('TIME IS UP')
    .end();

  setTimeout(() => {
    $('.quiz__score')
      .removeClass('quiz__score--show')
      .addClass('quiz__score--hide');
  }, 3000);
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
  const html = overPage.replace('$score', convertScore(userScore));

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

  const ads = adsTemp.replace('$url', 'https://www.tokopedia.com/')
                      .replace('$img', 'https://cdn.tokopedia.net/play-groupchat/assets/img/dummy-ads.jpg');

  $('.game-over').append(ads);
  handleTimeAds(5);
}

function handleTimeAds(start) {
  var newStart = start;
  var bar = 82;

  $('.ads .countdown__num').text(start);
  setTimeout(function() {
    $('.ads .countdown__progress-bar').css({
      'stroke-dashoffset': ((newStart - 1) / start) * bar,
      'transition': 'stroke-dashoffset 1s linear',
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

function soundOnboardingQuiz(type) {
  let audioStartQuiz = document.getElementById('js_sound-get-ready');
  if (type == 'play') {
    audioStartQuiz.play();
  } else {
    audioStartQuiz.pause();
  }
}

function soundCountdownGetReady(type) {
  let audioCountdownGetReady = document.getElementById(
    'js_sound-countdown-get-ready'
  );
  if (type == 'play') {
    setTimeout(() => {
      audioCountdownGetReady.play();
      audioCountdownGetReady.loop = true;
    }, 1500);
  } else {
    audioCountdownGetReady.pause();
    audioCountdownGetReady.currentTime = 0;
  }
}

function soundQuiz(type) {
  let audioQuiz = document.getElementById('js_sound-quiz');
  if (type == 'play') {
    audioQuiz.play();
    audioQuiz.loop = true;
  } else {
    audioQuiz.pause();
    audioQuiz.currentTime = 0;
  }
}

function soundCountdownQuiz(type) {
  let audioCountdownQuiz = document.getElementById('js_sound-countdown-quiz');
  audioCountdownQuiz.loop = true;
  if (type == 'play') {
    audioCountdownQuiz.play();
  } else {
    audioCountdownQuiz.pause();
    setTimeout(() => {
      audioCountdownQuiz.currentTime = 0;
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
