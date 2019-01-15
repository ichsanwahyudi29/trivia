const dataRanking = [
  {
    ranking: '1',
    name: 'Ichsan Indra Wahyudi',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '999999',
  },
  {
    ranking: '2',
    name: 'Irwanto',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '41604',
  },
  {
    ranking: '3',
    name: 'Rendi Christian Rendi Christian',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '19904',
  },
  {
    ranking: '4',
    name: 'Fajar',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '999999',
  },
  {
    ranking: '5',
    name: 'Ryan aja',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '6',
    name: 'Mbo Dharmi',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '7',
    name: 'Leonardy oleoleo oleoleo',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '8',
    name: 'Shinta Tamara',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '9',
    name: 'Zarrah',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10',
    name: 'Adek Tresno',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10000',
    name: 'Erazzzz',
    image: '../assets/img/avenger.jpg',
    phone: '08743xxx872',
    skor: '9904',
  },
];

window.renderLeaderboard = renderLeaderboard;
window.renderHome = renderHome;
window.onBack = onBack;

function onBack(page) {
  console.log(page);
  renderHome();
  // switch (page) {
  //   case 'home':
  //     renderHome()
  //     break;
  //   case 'leaderboard':
  //     renderLeaderboard()
  //     break;
  // }
}

// Home

function renderHome() {
  // <audio src="./assets/music/bg.mp3" autoplay="true">
  // <p class="landing-page__desc">Kuis akan dimulai pada 12.00 - 13.00</p>;

  const html = `
    <div class="landing-page">
      <div class="landing-page__info">
        <p class="landing-page__info-text">Ichsan Indra mendapatkan skor 999.999</p>
        <span class="landing-page__info-num">999.999</span>
      </div>
      <div class="landing-page__container content">
        <div class="landing-page__menu menu">
          <a href="" class="menu__action menu__action--back"></a>
          <div class="landing-page__menu-right">
            <a class="menu__action menu__action--leaderboard" onclick="renderLeaderboard()"></a>
            <a href="" class="menu__action menu__action--share"></a>
          </div>
        </div>
        <div class="landing-page__action">
          <img class="landing-page__logo" src="./assets/img/logo_marvel.png" alt="" srcset="">
          <div class="landing-page__title">
            <span>Quiz</span>
            <div class="landing-page__title-spark"></div>
          </div>
          <p class="landing-page__desc">Kuis telah dimulai</p>
          <button class="btn btn--primary">
            <div class="btn__inner">
              <span>Mulai Main</span>
            </div>
          </button>
          <button id="js_show-dialog" class="btn btn--small btn--price">
            <div class="btn__inner">
              <span class="icon icon--price">Info Hadiah</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;

  renderPage(html);
}

// Leaderboard

function renderPage(html) {
  $('body').empty();
  $('body').append(html);
}

function renderLeaderboard(page = 'home') {
  const html = `
    <div class="leaderboard">
      <div class="leaderboard__menu menu">
        <a onClick="renderHome()" class="menu__action menu__action--back"></a>
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
}

$(document).ready(function() {
  handleLoaderResult();
  topRanking(dataRanking);
  setTimeout(() => {
    initDataRanking();
  }, 2000);
});

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

// General

// $(document).ready(function() {
// $('body').addClass('lock');
// $('.overlay').addClass('overlay--show');
// $('.dialog').addClass('dialog--show');
// });

$(function handleDialog() {
  $('#js_show-dialog').on({
    click: function() {
      $('body').addClass('lock');
      $('.overlay').addClass('overlay--show');
      $('.dialog').addClass('dialog--show');
    },
  });

  $('#js_close-dialog').on({
    click: function() {
      $('.dialog').addClass('dialog--close');
      setTimeout(() => {
        $('body').removeClass('lock');
        $('.overlay').removeClass('overlay--show');
        $('.dialog').removeClass('dialog--show');
        $('.dialog').removeClass('dialog--close');
      }, 300);
    },
  });
});

window.handleOpenDialog = handleOpenDialog;
window.handleCloseDialog = handleCloseDialog;

let audioScore = document.getElementById('js_sound-score');

$(function globalCloseDialog() {
  $('body').on({
    click: function(e) {
      if ($(event.target).hasClass('dialog--show')) {
        handleCloseDialog();
      }
    },
  });

  // countUp(180);

  // audioScore.play();
  // audioScore.loop = true
});

function handleOpenDialog() {
  $('body').addClass('lock');
  $('.overlay').addClass('overlay--show');
  $('.dialog').addClass('dialog--show');
}

function handleCloseDialog() {
  $('body').removeClass('lock');
  $('.overlay').removeClass('overlay--show');
  $('.dialog').removeClass('dialog--show');
}

// Quiz

window.handleBtnAnswerImg = handleBtnAnswerImg;
window.handleBtnAnswerTxt = handleBtnAnswerTxt;

$(document).ready(function() {
  initQuiz();
});

function initQuiz() {
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
  console.log($answer)
  $answer.removeClass('answer-btn--active').addClass('answer-btn--correct');
  // soundsCorrectAnswer();
}

function handleBtnAnswerTxt(e) {
  focusAnswer('text');
  $(e).addClass('answer-btn--active');
}

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

  $('.answer-btn').removeClass('answer-btn--active');
}

// Complete

function countUp(count) {
  // $display = $('#js_result-score');

  // setInterval(function() {

  // }, 24);
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
      audioScore.pause();
      clearInterval(int);
    }
  }, int_speed);
}
