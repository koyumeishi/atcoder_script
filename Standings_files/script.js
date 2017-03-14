// -----------------------------
//
// jQuery Plugin
//
// -----------------------------

// parseQueryString
jQuery.extend({
  parseQueryString: function(){
    var nvpair = {};
    var qs = window.location.search.replace('?', '');
    var pairs = qs.split('&');
    $.each(pairs, function(i, v){
      var pair = v.split('=');
      nvpair[pair[0]] = pair[1];
    });
    return nvpair;
  }
});

// cookie plugin
(function($) {

   $.cookie = function(key, value, options) {

    // key and at least value given, set cookie...
     if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
       options = $.extend({}, options);

       if (value === null || value === undefined) {
         options.expires = -1;
       }

       if (typeof options.expires === 'number') {
         var days = options.expires, t = options.expires = new Date();
         t.setDate(t.getDate() + days);
       }

       value = String(value);

       return (document.cookie = [
         encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
         options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
         options.path    ? '; path=' + options.path : '',
         options.domain  ? '; domain=' + options.domain : '',
         options.secure  ? '; secure' : ''
       ].join(''));
     }

     // key and possibly options given, get cookie...
     options = value || {};
     var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

     var pairs = document.cookie.split('; ');
     for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
         if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
     }
     return null;
  };

})(jQuery);

// message plugin
(function($) {
  $.message = {

    init: function() {
      var message_hash = $.cookie("__message_hash");
      if (message_hash !== null) {
        location.hash = message_hash;
      }
    },

    set: function (type, heading, content) {
      var message_key = parseInt(Math.random() * 10000);
      $.cookie("__message_" + message_key, JSON.stringify({t: type, h: heading, c: content}));
      return message_key;
    },

    _delete: function (message_key) {
      $.cookie("__message_" + message_key, null, {expires:-1, path:'/'});
    },

    _pop: function () {
      if (!location.hash.match(/^#[0-9]+$/)) {
        return null;
      }

      var message_key = location.hash.replace(/^#/, '');
      location.hash = "";
      var message = $.cookie("__message_" + message_key);

      if (message !== null) {
        message = JSON.parse(message);
      }

      $.message._delete(message_key);
      return message;
    },

    alert: function () {
      var message = $.message._pop();
      if (message !== null) {
        var alert_cls = "alert", alert_box = $("#alert_box");

        var reg = /\+/g;
        if (message.t) {
          alert_box.addClass("alert-" + message.t);
        }

        if (message.h) {
          $("#alert_box_heading").html(message.h.replace(reg, " ")).css("display", "");
        }

        $("#alert_box_content").html(message.c.replace(reg, " "));
        alert_box.css("display", "");
      }
    }
  };

})(jQuery);

// -- end plugin --

(function($) {

  // -- pre exec --

  $('time:not(.timezone-fixed)').each(function() {
    $(this).addClass('timezone-fixed');
    /*
    var date_text = $(this).text().split(' ');
    date_text[0] = date_text[0].split(/[\/\-]/);
    date_text[1] = date_text[1].split(':');
    var date = new Date(Date.UTC(
        date_text[0][0] - 0, date_text[0][1] - 1, date_text[0][2] - 0,
        date_text[1][0] - 0, date_text[1][1] - 0, date_text[1][2] - 0));
    */
    var date = new Date($(this).text());
    var y = date.getFullYear();
    var m = (date.getMonth() + 101 + "").substr(1);
    var d = (date.getDate() + 100 + "").substr(1);
    var h = (date.getHours() + 100 + "").substr(1);
    var i = (date.getMinutes() + 100 + "").substr(1);
    var s = (date.getSeconds() + 100 + "").substr(1);
    $(this).text(y + "/" + m + "/" + d + " " + h + ":" + i + ":" + s);
  });
  // -- 変数 --

  var languages = new Array('ja', 'en', 'ko');

  var current_selected_language_id =  $('#submit-language-selector-' + $('#submit-task-selector option:selected').val() + ' option:selected').val();

  // ----------

  // -- functions --

  $.escapeHTML = function(val) {
    return $("<div/>").text(val).html();
  };

  function escapeAttrValue(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }


  function browserLanguage() {
    if (navigator.browserLanguage !== undefined) {
      return navigator.browserLanguage.substr(0, 2);
    }

    if (navigator.language !== undefined) {
      return navigator.language.substr(0, 2);
    }

    if (navigator.userLanguage !== undefined) {
      return navigator.userLanguage.substr(0, 2);
    }
  }

  function isValidLanguage(language) {
    var ret = false;
    for (var i = 0, length = languages.length; i < length; i++) {
      if (language === languages[i]) {
        ret = true;
        break;
      }
    }
    return ret;
  }

  function selectLanguage(language) {

    //$('.lang-child').css('display', 'none');
    //$('.lang .lang-child:first-child').css('display', '');
    //$('.lang:has(.lang-' + language + ') .lang-child').css('display', 'none');
    //$('.lang .lang-' + language).css('display', '');
    $('.lang-selected').removeClass('lang-selected');
    $('.lang:has(.lang-' + language + ')').addClass('lang-selected');
    $('.lang-child').addClass('hidden-lang');
    $('.lang-' + language).removeClass('hidden-lang');

    $('.static-nav-language-selector-dropdown').each(function() {
      var style = ($(this).attr('lang') === language) ? '' : 'none';
      $(this).css('display', style);
    });
  }

  function AdjustTime() {
    var time_offset = 0;
    var xmlreq = $.ajax({url: '/datetime', complete: function() {
      if (!xmlreq) return;
      var server_time = new Date(xmlreq.getResponseHeader('Date'));
      var local_time = new Date();
      time_offset = server_time.getTime() - local_time.getTime();
    }});

    return time_offset;
  }

  function o2s(num) {
    return (num < 10) ? "0" + num : num;
  }

  var initStandings = function()
  {
    var me = $.cookie('_user_id'), found = false;
    //console.log($.cookie('_user_screen_name'));
    //me = 5296;
    //me = 5185;
    //me = 5772;
    if (me != null && ATCODER.standings.data) {
      for(var i = 0, len = ATCODER.standings.data.length; i < len; i++) {
        if (me == ATCODER.standings.data[i].user_id) {
          ATCODER.standings.me = ATCODER.standings.data[i];
          ATCODER.standings.me.page = Math.floor(i / ATCODER.standings.pagination.per_page) + 1;
          // location.hash = "page_" + ATCODER.standings.me.page;
          // ATCODER.standings.pagination.page  = ATCODER.standings.me.page;
          break;
        }
      }
    }
  }

  var setStandingPage = function()
  {
    if (location.hash.match(/^#page_[0-9]+$/)) {
      var page_ = parseInt(location.hash.replace(/^#page_/, ''));
      if (!isNaN(page_) && page_ >= 1 && page_ <= ATCODER.standings.pagination.end_page) {
        ATCODER.standings.pagination.page = page_;
        ATCODER.standings.pagination.set_page = true;
      }
    }
  }

  var getRatingClass = function(competitions, rating)
  {
      if(typeof competitions === "undefined" || typeof rating === "undefined") {
          return "";
      }
      if(competitions == 0) {
          return "user-unrated";
      }
      var rating_table = [
          {"rating":  400, "name": "user-gray"},
          {"rating":  800, "name": "user-brown"},
          {"rating": 1200, "name": "user-green"},
          {"rating": 1600, "name": "user-cyan"},
          {"rating": 2000, "name": "user-blue"},
          {"rating": 2400, "name": "user-yellow"},
          {"rating": 2800, "name": "user-orange"}
      ];
      for(var i = 0 ; i < rating_table.length ; i++) {
          if(rating < rating_table[i]["rating"]) {
              return rating_table[i]["name"];
          }
      }
      return "user-red";
  }

  var getStandingRow = function(row, is_top)
  {
    var tr = $('<tr/>');
    var self_row = false;
    if (typeof ATCODER.standings != "undefined" &&
        typeof ATCODER.standings.me != "undefined" &&
        row.user_id == ATCODER.standings.me.user_id) {
      tr.addClass('standings-me');
      self_row = true;
    }

    // ranking
    if (self_row && is_top) {
      //　tr.append($('<td/>').addClass('standings-rank').html('<a href="/standings#page_' + ATCODER.standings.me.page + '">' + row.rank + '</a>'));
      tr.append($('<td/>').addClass('standings-rank').text(row.rank));
    } else {
      tr.append($('<td/>').addClass('standings-rank').text(row.rank));
    }

    // modified time
    if (row.modified != null) {
      tr.append($('<td/>').addClass('standings-modified').text(row.modified));
    }

    // contest name
    if (row.contest_name != null) {
      tr.append($('<td/>').addClass('standings-contest-name').append(
        $('<a/>').attr('href', 'http://' + row.contest_screen_name).text(row.contest_name))
      );
    }

    // username
    var td_username = $('<td/>').addClass('standings-username');
    if (ATCODER.standings.show_flag) {
      td_username.append($('<img/>').attr('src', '/img/flag/' + row.country + '.png').css('vertical-align', 'middle'));
      td_username.append(' ');
    }
    var legend = false;
    if (row.rating >= 3200) {
      rounded_rating = row.rating - row.rating%400;
      td_username.append($('<img/>').attr('src', '/img/icon/crown' + rounded_rating + '.gif').css('vertical-align', 'middle'));
      td_username.append(' ');
      legend = true;
      legend_color = "";
      switch (row.user_screen_name) {
        case "semiexp":
          legend_color = '92D050';
          break;
        case "Um_nik":
          legend_color = '08E8DE';
          break;
        case "sugim48":
          legend_color = 'C06000';
          break;
        default:
          legend = false;
      }
      if (legend) {
        td_username.append('<a class="username" style="color:#'+legend_color+';" href="https://atcoder.jp/user/'+row.user_screen_name+'">'+escapeAttrValue(ATCODER.standings.hidden_name ? row.user_screen_name : row.user_name)+'</a>');
      }
    }
    if (!legend) {
      td_username.append(
        $('<a/>').addClass('username').addClass(getRatingClass(row.competitions, row.rating)).attr('href', 'https://atcoder.jp/user/' + encodeURIComponent(row.user_screen_name)).text(ATCODER.standings.hidden_name ? row.user_screen_name : row.user_name)
      );
    }
    var lang;
    if (typeof current_selected_language != 'undefined') {
      lang = current_selected_language;
    }
    var view_submission = "";
    var username = escapeAttrValue(escapeAttrValue(row.user_name));
    if (ATCODER.standings.hidden_name) username = escapeAttrValue(escapeAttrValue(row.user_screen_name));
    if (lang === "ja") {
      view_submission = username + 'の提出を確認';
    } else {
      view_submission = 'View ' + username + '\'s submissions';
    }
    if (row.contest_screen_name != null) {
      td_username.append(
        $('<a/>').attr('href', 'http://' + row.contest_screen_name + '/submissions/all?user_screen_name=' + encodeURIComponent(row.user_screen_name))
        .html(' <i class="icon-search tooltip-label" rel="tooltip" data-title="' + view_submission + '" data-original-title=""></i>')
      );
    } else {
      td_username.append(
        $('<a/>').attr('href', '/submissions/all?user_screen_name=' + encodeURIComponent(row.user_screen_name))
        .html(' <i class="icon-search tooltip-label" rel="tooltip" data-title="' + view_submission + '" data-original-title=""></i>')
      );
    }

    tr.append(td_username);

    // tasks
    for (var j = 0, len = row.tasks.length; j < len; j++) {
      var t = row.tasks[j];
      var td = $('<td/>');
      if (t.extras) {
        td.addClass('center standings-frozen');
      } else {
        td.addClass('center');
        if (t.penalty > 0) {
          var p = $('<p/>');
          p.append($('<span/>').addClass('standings-ac').text(t.score / 100));
          if (t.failure > 0) {
            p.append($('<span/>').addClass('standings-wa').text(' (' + t.failure +')'));
          }
          td.append(p);
          td.append($('<p/>').text(elapsed_time(t.elapsed_time)));

        } else if (t.failure > 0) {
          td.append('<p/>').addClass('standings-wa').text('(' + t.failure +')');
        } else {
          td.append('<p/>').text('-');
        }

      }
      tr.append(td);
    }

    // total / score
    var td = $('<td/>');
    if (row.extras) {
      td.addClass('center standings-frozen');
    } else {
      td.addClass('center');
    }

    if (row.penalty > 0) {
      var p = $('<p/>');
      p.append($('<span/>').addClass('standings-score').text(row.score / 100));
      if (row.failure > 0) {
        p.append($('<span/>').addClass('standings-wa').text(' (' + row.failure +')'));
      }
      td.append(p);
      td.append($('<p/>').text(elapsed_time(row.penalty)));
    } else {
      if (row.failure != "0") {
        td.html('<p>- <span class="standings-wa">(' + row.failure + ')</span></p>');
      } else {
        td.html('<p>-</p>');
      }
    }

    tr.append(td);

    return tr;
  }

  var resetStandings = function()
  {
    clearStandings();
    setStandingPage();

    if (!ATCODER.standings.pagination.set_page && typeof ATCODER.standings.me != "undefined") {
      location.hash = "page_" + ATCODER.standings.me.page;
      ATCODER.standings.pagination.page  = ATCODER.standings.me.page;
    }

    var limit = ATCODER.standings.pagination.per_page;
    var offset = (ATCODER.standings.pagination.page - 1) * limit;
    var el = $('table#contest-standings tbody');

    el.attr('style', 'display:none');

    if (ATCODER.standings.data) {
      for (var i = 0; i < limit; i++) {
        if ((offset + i) >= ATCODER.standings.data.length) break;
        var row = ATCODER.standings.data[i + offset];
        el.append(getStandingRow(row, false));
      }
    }

    if (typeof ATCODER.standings.me != "undefined" && $('.standings-me').length == 0) {
      el.prepend(getStandingRow(ATCODER.standings.me, true));
      /*
      if (ATCODER.standings.me.rank > ATCODER.standings.data[offset].rank) {
        el.append(getStandingRow(ATCODER.standings.me, true));
      } else {

      }
      */
    }

    el.fadeIn("slow");
    resetPagination('pagination-standings');
    $('.tooltip-label').tooltip({placement:'top'});
  }

  var elapsed_time = function(str)
  {
    min = Math.floor(parseInt(str) / 60);
    sec = Math.floor(parseInt(str) % 60);
    return o2s(min) + ':' + o2s(sec);
  }

  var clearStandings = function()
  {
    $('#contest-standings > tbody').empty();
  }

  var clearPagination = function(element_id)
  {
    $('#' + element_id + ' > ul').empty();
  }

  var resetPagination = function(element_id)
  {
    clearPagination('pagination-standings');
    var el = $('#' + element_id), page_info = ATCODER.standings.pagination;
    var start = ((page_info.page - page_info.num_prev) > 0) ? (page_info.page - page_info.num_prev) : 1;
    var end   = ((page_info.page + page_info.num_prev) > page_info.end_page) ? page_info.end_page : (page_info.page + page_info.num_prev);
    var prev  = ((page_info.page - 1) > 0) ? (page_info.page - 1) : 1;
    var next  = ((page_info.page + 1) > page_info.end_page) ? page_info.end_page : (page_info.page + 1);

    var ul = $('<ul/>');

    // prev
    if (page_info.page > 1) {
      ul.append($('<li/>').addClass('li-pagination').html('<a href="' + page_info.url + '#page_' + prev + '">' + page_info.left  + '</a>'));
    }

    if (start == 2) {
      ul.append($('<li/>').addClass('li-pagination').html('<a href="' + page_info.url + '#page_1">1</a>'));
    } else if (start > 2) {
      ul.append($('<li/>').addClass('li-pagination').html('<a href="' + page_info.url + '#page_1">1</a>'));
      ul.append($('<li/>').addClass('li-pagination disabled').html('<a href="">...</a>'));
    }

    for (var page = start; page <= end; page++) {
      var li = $('<li/>').addClass('li-pagination');
      if (page == page_info.page) {
        li.addClass('active');
      }

      li.html('<a href="' + page_info.url + '#page_' + page + '">' + page  + '</a>');
      ul.append(li);
    }

    if (end == (page_info.end_page - 1)) {
      ul.append($('<li/>').addClass('li-pagination').html('<a href="' + page_info.url + '#page_' + page_info.end_page + '">' + page_info.end_page + '</a>'));
    } else if (end < (page_info.end_page - 1)) {
      ul.append($('<li/>').addClass('li-pagination disabled').html('<a href="">...</a>'));
      ul.append($('<li/>').addClass('li-pagination').html('<a href="' + page_info.url + '#page_' + page_info.end_page + '">' + page_info.end_page + '</a>'));
    }

    // next
    if (page_info.page < page_info.end_page) {
      ul.append($('<li/>').addClass('li-pagination').html('<a href="' + page_info.url + '#page_' + next + '">' + page_info.right  + '</a>'));
    }

    el.append(ul);

    $('li.li-pagination a').click(function() {
      location.href = $(this).attr('href');
      resetStandings();
      return false;
    });

    $('tr.standings-me-top td.standings-rank a').click(function() {
      location.href = $(this).attr('href');
      resetStandings();
      return false;
    });
  }

  // -- end functions
  $('.static-nav-language-selector').click(function() {
    var lang = $(this).attr('lang');
    var option = {path: "/"};
    if (location.href.match(/^https?:\/\/(|[^\/]*\.)atcoder\.jp\//) != null) option["domain"] = "atcoder.jp";
    $.cookie('language', lang, option);
    selectLanguage(lang);
    current_selected_language = lang;
  });

  $('.tooltip-label').tooltip({placement:'top'});

  $('#submit-task-selector').change(function() {
    var selected_task_id = $('#submit-task-selector option:selected').val();
    $('.submit-language-selector').each(function() {
      if (('language_id_' + selected_task_id) == $(this).attr('name')) {
        $(this).attr('style', '');
      } else {
        $(this).attr('style', 'display:none');
      }
    });

    $('#submit-language-selector-' + selected_task_id).val(current_selected_language_id);
  });

  $('.submit-language-selector').change(function() {
    var selected_task_id = $('#submit-task-selector option:selected').val();
    current_selected_language_id = $('#submit-language-selector-' + selected_task_id + ' option:selected').val();
  });

  // make code pretty
  window.prettyPrint && prettyPrint();

  // Timer
  var time_offset = AdjustTime();
  var server_time        = ($('#server-current-time').length > 0) ? ((new Date($('#server-current-time').html())).getTime() + time_offset) :  Date.now();
  var contest_begin_time = ($('#contest-start-time').length > 0 ) ? ((new Date($('#contest-start-time').html())).getTime()  + time_offset) : (Date.now() - 1000);
  var contest_end_time   = ($('#contest-end-time').length > 0   ) ? ((new Date($('#contest-end-time').html())).getTime()    + time_offset) : (Date.now() - 500);

  var time_diff   = server_time - (new Date()).getTime();
  var contest_begin = (server_time < contest_begin_time) ? false : true;
  var contest_end   = (server_time < contest_end_time) ?   false : true;


  var thisInterval = setInterval( function() {
    var now_time = (new Date()).getTime() + time_diff;
    var now_date = new Date();
    now_date.setTime(now_time);

    var yyyy = 2000 + now_date.getYear() % 100;
    var mm = o2s(now_date.getMonth() + 1);
    var dd = o2s(now_date.getDate());
    var week = new Array('Sun', 'Mon', 'Tue',
     'Wed', 'Thu', 'Fri', 'Sat');
    var ww = week[now_date.getDay()];
    var hh = o2s(now_date.getHours());
    var ii = o2s(now_date.getMinutes());
    var ss = o2s(now_date.getSeconds());

    if (!contest_end && now_time > contest_end_time) {
      var modal = $('#modal-contest-end');
      if (modal.length > 0) {
        $('#modal-contest-end').modal('toggle');
        clearInterval(thisInterval);
      }
    } else if (!contest_begin && now_time > contest_begin_time) {
      var modal = $('#modal-contest-begin');
      if (modal.length > 0) {
        $('#modal-contest-begin').modal('toggle');
        clearInterval(thisInterval);
      }
    } else if (contest_begin && !contest_end && privilege !== null && privilege === "contestant") {
      var remain_sec = Math.floor((contest_end_time - now_date) / 1000);
      var hh = o2s(Math.floor(remain_sec / 3600));
      var mm = o2s(Math.floor((remain_sec % 3600) / 60));
      var ss = o2s(remain_sec % 60);
      var remain_name = {'ja': '残り時間', 'en': 'Remain'};
      if(typeof current_selected_language != 'undefined')
        lang = current_selected_language;
      if(lang in remain_name)
        var display_remain = remain_name[lang];
      else
        var display_remain = remain_name['en'];

      if(hh <= 365 * 24){
        $('#fixed-server-timer').html(display_remain + "<br />" + hh + ":" + mm + ":" + ss);
        return;
      }
    }

    var yyyy = 2000 + now_date.getYear() % 100;
    var mm = o2s(now_date.getMonth() + 1);
    var dd = o2s(now_date.getDate());
    var week = new Array('Sun', 'Mon', 'Tue',
     'Wed', 'Thu', 'Fri', 'Sat');
    var ww = week[now_date.getDay()];
    var hh = o2s(now_date.getHours());
    var ii = o2s(now_date.getMinutes());
    var ss = o2s(now_date.getSeconds());
    var tz = (new Date()).getTimezoneOffset();
    var tz_str = (0 < tz ? "-" : "+") + (parseInt(Math.abs(tz) / 60) + 100 + "").substr(1) + (Math.abs(tz) % 60 + 100 + "").substr(1);
    $('#fixed-server-timer').html(yyyy + "-" + mm + "-" + dd + " (" + ww + ")<br />"
     + hh + ":" + ii + ":" + ss + " " + tz_str);
  }, 1000);

  var showClockInterval = setInterval(function() {
    $('#fixed-server-timer').show();
    clearInterval(showClockInterval);
  }, 2000);

  var user_name = $.cookie('_user_name');
  if (user_name === null) {
    $('#nav-right-not-login').css('display', '');
  } else {
    $('#nav-right-logined').css('display', '');
    var privilege = $.cookie('__privilege');
    if (privilege === null) {
      $('#nav-right-username').text(user_name);
    } else {
      $('#nav-right-username').text(user_name + "(" + privilege + ")");
      if(privilege === "administrator" || privilege === "owner" || privilege === "manager" || privilege === "assistant") {
          $('#standings-csv-link').html('<a href="/standings/csv/">順位表をCSVでダウンロードする</a>').css('display', '');
          $('#group-standings-csv-link').html('<a href="/group_standings/csv/">グループ順位表をCSVでダウンロードする</a>').css('display', '');
          $('#exam-standings-csv-link').html('<a href="/exam_standings/csv/">試験結果表をCSVでダウンロードする</a>').css('display', '');
          $('#exam-group-standings-csv-link').html('<a href="/exam_group_standings/csv/">全ての試験の結果表をCSVでダウンロードする</a>').css('display', '');
      }
    }
  }

  $.message.init();
  $.message.alert();

  var browser_language = browserLanguage(), cookie_language  = $.cookie('language'), lang = '';
  if (cookie_language === null) {
    var default_lang = $('#atcoder-default-lang').data('lang');
    if (default_lang !== undefined && isValidLanguage(default_lang)) {
      lang = default_lang;
    } else {
      if (browser_language === undefined || !isValidLanguage(browser_language)) {
        lang = 'en';
      } else {
        lang = browser_language;
      }
    }
  } else {
    lang = cookie_language;
  }

  for (var i = 0, length = languages.length; i < length; i++) {
    $('.lang-' + languages[i]).addClass('lang-child');
  }

  selectLanguage(lang);

  if (typeof ATCODER != "undefined" && typeof ATCODER.standings != "undefined") {
    // init standings
    initStandings();
    resetStandings();
  }


  $('input[data-require=true]').keyup(function() {
    if ($.trim($(this).attr('value')) == "") {
      $(this).parent("div.controls").parent("div.control-group").addClass('error');
    } else {
      $(this).parent("div.controls").parent("div.control-group").removeClass('error');
    }
  });

  $('form.check-participant_info').submit(function() {
    var do_submit = true;
    $('[data-require=true]').each(function() {
      if ((this.type === "checkbox" && !this.checked) || (this.type !== "checkbox" && $.trim($(this).attr('value')) == "")) {
        $(this).parent("div.controls").parent("div.control-group").addClass('error');
        do_submit = false;
      }
    })

    if (!do_submit) {
      alert("入力内容に不備があります。今一度入力内容をお確かめください。");
    }
    return do_submit;
  });

  $('a.brand .contest-name').each(function() {
    var cut_lenght = '30';
    var suffix = '...';
    var text_length = $(this).text().length;
    var text_trim = $(this).text().substr(0, cut_lenght);
    var text = (cut_lenght < text_length) ? text_trim + suffix : $(this).text();

    $(this).text(text);
  });

   $('.ads-tracking').click(function() {
       _gaq.push(['_trackEvent', location.host + '::' + $(this).data('ads-segment'), 'click', $(this).attr('href')]);
   });
})(jQuery);
