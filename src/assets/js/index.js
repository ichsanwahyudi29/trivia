const dataRanking = [
  {
    ranking: '1',
    name: 'Ichsan Indra Wahyudi',
    phone: '08743xxx872',
    skor: '999999',
  },
  {
    ranking: '2',
    name: 'Irwanto',
    phone: '08743xxx872',
    skor: '41604',
  },
  {
    ranking: '3',
    name: 'Rendi Christian Rendi Christian',
    phone: '08743xxx872',
    skor: '19904',
  },
  {
    ranking: '4',
    name: 'Fajar',
    phone: '08743xxx872',
    skor: '999999',
  },
  {
    ranking: '5',
    name: 'Ryan aja',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '6',
    name: 'Mbo Dharmi',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '7',
    name: 'Leonardy oleoleo oleoleo',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '8',
    name: 'Shinta Tamara',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '9',
    name: 'Zarrah',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '10',
    name: 'Adek Tresno',
    phone: '08743xxx872',
    skor: '9904',
  },
  {
    ranking: '999+',
    name: 'Erazzzz',
    phone: '08743xxx872',
    skor: '9904',
  },
];

// Leaderboard

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
              <div class="top__img-val" style="background-image: url(../assets/img/img.jpg)">
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
    const listRank = `
      <div class="row">
        <div class="ranking__list-left">
          <div class="ranking__info">
            <div class="info-num">
              <span>${key.ranking}</span>
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
