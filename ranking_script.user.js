// ==UserScript==
// @name        AtCoderCustomStandings
// @namespace   koyumeishi_scripts_AtCoderCustomStandings
// @include     http://*.contest.atcoder.jp/standings*
// @downloadURL https://koyumeishi.github.io/atcoder_script/ranking_script.user.js
// @version     0.20
// @author      koyumeishi
// @grant       GM_setValue
// @grant       GM_getValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @description https://github.com/koyumeishi/atcoder_script
// ==/UserScript==

// 更新履歴
// v0.20 2016.07.18
//  new.atcoder.jp に対応(仮)
// v0.19 2016.07.10
//  ARC057のレート更新
// v0.18 2016.06.27
//  ARC056のレート更新
// v0.17 2016.06.04
//  ARC055のレート更新
// v0.16 2016.05.22
//  ARC054のレート更新
// v0.15 2016.05.14
//  ARC053のレート更新
// v0.14 2016.05.01
//  ARC052のレート更新
// v0.13 2016.04.16
//  ARC051のレート更新
// v0.12 2016.04.03
//  ARC050のレート更新
// v0.11 2016.03.19
//  ARC049のレート更新
// v0.10 2016.03.05
//  ARC048のレート更新
// v0.09 2016.02.29
//  ユーザー名 / AtCoderID, AtCoderID / ユーザー名 の表示方式を追加
//  friend listに登録された人を強調表示する機能の ON/OFF を追加
// v0.08 2016.02.13
//  順位表上部の問題名のリンク先を変更したとき、target="_blank"に変更
//  ページ下部にAtCoderCustomStandings/ratingのバージョンを表示
// v0.07 2016.01.17
//  ARC047のレート更新
//  手動で"順位更新"をクリックしたときに自分の順位が正しく表示されない不具合を修正
//  順位表上部の問題名のリンク先を変更する機能を実装
// v0.06 2016.01.12
//  非同期通信を理解していなかったので修正
// v0.05 2016.01.10
//  順位表の凍結に対応(仮)
//  現在順位の表示、自分の位置までスクロールする機能を追加
//  ページ再読み込みなしでの順位表更新機能追加(ajaxでstandingsのページを取得してるので実質的には再読み込みしてる)
//  順位表自動更新機能追加
//  1ページ当たりの表示件数に"500件表示"を追加
//  rating色付け周りでコードがおかしかったのを修正
// v0.04 2015.12.14
//  星のemojiは環境次第で着色不可っぽいのでFriend Listに入っていないときはiconを表示するように戻した
// v0.03 2015.12.14
//  ARC046のレート更新
//  「Friend Listに登録/解除」オンマウス時のマウスカーソル変更、星のiconをemojiに変更
//  ユーザー名にhtmlコードを使っているとjQueryが拾ってしまう脆弱性を解消
//  ドロップダウンメニューにレーティング情報追加
// v0.02 2015.11.09
//  正の得点をしていない提出の提出時間が 00:00 になっていたのを修正(時間を非表示に)

//greasemonkey用  ----------------------------------ここから

exportFunction(function(key, val) {
  try{
    return GM_setValue(key, val);
  }catch(err){
    console.log(err);
  }
}, unsafeWindow, {defineAs: 'GM_setValue'});

exportFunction(function(key, val) {
  try{
    return GM_getValue(key, val);
  }catch(err){
    console.log(err);
  }
}, unsafeWindow, {defineAs: 'GM_getValue'});


//greasemonkey用  ----------------------------------ここまで


function contentInjector(source) {
  // script要素を生成する
  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");
  script.textContent = source.toString().slice(16,-1);

  document.body.appendChild(script);
}


//main関数でwrappingしたscript群をhtmlにinjectする
contentInjector( function main(){

var updated_date = "2016.07.18";
var atcoder_custom_standings_version = "0.20";

//自分のuser_id
var my_user_id = 0;

//自分の順位(0-index)
var my_rank = 0;

//1ページの表示人数
var page_size = 50;

//今いるページ
var page_pos = 0;

//ユーザー名をAtCoder IDで表示するか
//var show_user_screen_name = false;
// 0 : ユーザー名
// 1 : AtCoder ID
// 2 : ユーザー名 / AtCoder ID
// 3 : AtCoder ID / ユーザー名
var user_name_display_type = 0;

//ユーザー名をRatingで色分けするか
var enable_rating_color = true;

//順位表上部の問題名のリンク先を問題ページに変更(元々は"その問題の得点で降順/昇順ソート")
var enable_modify_table_header = false;

//トモダチィ
var friend_list = {};
var show_friend_standing = false;
//friend を強調表示
var emphasize_friend = true;

function add_friend(user_name){
  friend_list[user_name] = 1;
  GM_setValue('GM_friend_list', JSON.stringify(friend_list));
}

function remove_friend(user_name){
  delete friend_list[user_name];
  GM_setValue('GM_friend_list', JSON.stringify(friend_list));
}

function escapeHTML(html){
  return $('<div>').text(html).html();
}


//各ユーザーのテーブル (行 <tr> ... </tr>) を作る
function generate_tr_object(item){
  var obj_tr = $('<tr></tr>');

  //自分 or firend
  if(item.user_id === my_user_id){
    obj_tr.addClass("standings-me");
  }else if(emphasize_friend && item.user_screen_name in friend_list){
    obj_tr.addClass("standings-friend");
  }

  //順位
  obj_tr.append( $('<td class="standings-rank">' + item.rank +'</td>') );
  
  //ユーザー名
  obj_tr.append(
    (function(){
      var obj_td = $('<td class="standings-username dropdown"></td>');
      var my_user_name = item.user_screen_name;
      if(user_name_display_type === 0) my_user_name = escapeHTML(item.user_name);
      if(user_name_display_type === 1) my_user_name = item.user_screen_name;
      if(user_name_display_type === 2) my_user_name = escapeHTML(item.user_name) + "<br><span style='color : grey !important; font-weight : lighter !important;'>" + item.user_screen_name + "</span>";
      if(user_name_display_type === 3) my_user_name = item.user_screen_name + "<br><span style='color : grey !important; font-weight : lighter !important;'>" + escapeHTML(item.user_name) + "</span>";

      obj_td.append(
        $(
          '<a class="dropdown-toggle" data-toggle="dropdown" style="display:block;" href="#"> ' +
            '<span ' + (enable_rating_color ? 'class="' + get_color(item.rating) : "") + '">' + 
              //(show_user_screen_name ? item.user_screen_name : escapeHTML(item.user_name)) + 
              my_user_name +
            '</span> ' +
          '</a>'
        )
      );

      //ドロップダウンメニュー
      var obj_dd_list = $( '<ul class="dropdown-menu"></ul>' );


      obj_dd_list.append(
        '<li>' +
          '<a href="http://new.atcoder.jp/user/'+ item.user_screen_name + '" target="_blank">' + 
            '<i class="icon-user"></i> ' + 
            //'ユーザーページ' +
            escapeHTML(item.user_name) + " / " + item.user_screen_name + 
          '</a>' +
        '</li>'
      );
      obj_dd_list.append(
        '<li>' +
          '<a href="/submissions/all?user_screen_name=' + item.user_screen_name + '"> ' + 
            '<i class="icon-search"></i> ' + 
            'Submissions' +
          '</a>' +
        '</li>'
      );

      obj_dd_list.append(
        '<li>' +
          '<a ' + (enable_rating_color ? 'class="' + get_color(item.rating) + '"': "") + '>' + 
            'Rating : ' + item.rating.toString() +
          '</a>' +
        '</li>'
      );

      if(item.twitter_id !== ""){
        obj_dd_list.append(
          '<li>' +
            '<a href="https://twitter.com/' + item.twitter_id + '" target="_blank">' + 
              'twitter : @' + item.twitter_id +
            '</a>' +
          '</li>'
        );
      }
      
      var obj_not_friend = $(
        '<li><a style="cursor: pointer;">' +
        '<i class="icon icon-star-empty"></i> ' + 
        'Add to Friends List' +
        '</a></li>'
      );
      var obj_friend = $(
        '<li><a style="cursor: pointer;">' +
        '<span style="color:orange !important;">🌟</span> ' + 
        'Remove from Friends List' +
        '</a></li>'
      );
      
      obj_not_friend.click( (function(){
        add_friend(item.user_screen_name);
        obj_tr.addClass("standings-friend");
        obj_not_friend.toggle();
        obj_friend.toggle();
      }) );
      
      obj_friend.click( (function(){
        remove_friend(item.user_screen_name);
        obj_tr.removeClass("standings-friend");
        obj_not_friend.toggle();
        obj_friend.toggle();
      }) );
      
      if(item.user_id === my_user_id){
        obj_friend.hide();
        obj_not_friend.hide();
      }else if(item.user_screen_name in friend_list){
        obj_not_friend.hide();
      }else{
        obj_friend.hide();
      }
      
      obj_dd_list.append('<li class="divider"></li>');
      
      obj_dd_list.append(obj_not_friend);
      obj_dd_list.append(obj_friend);
      
      obj_td.append(obj_dd_list);
      return obj_td;
    })()
  );

  //問題数分<td> 得点(ペナルティ)/時間 </td> を作る
  $.each(item.tasks, function(index, task){
    var obj_task_td = $('<td class="center"></td>');
    if( task.extras === true ){ //凍結
      obj_task_td.addClass("standings-frozen");
    }else{
      var submited = ('score' in task);
      if( submited === false ){ //未提出
        obj_task_td.text('-');
      }else{  //提出済み
        //点数
        if(task.score !== 0){
          obj_task_td.append(
            '<span class=\"standings-ac\">' +
            (task.score/100) +
            '</span>'
          );
        }
        obj_task_td.append(
          $(
            '<span class=\"standings-wa\">' +
            (Number(task.failure)!==0?(" ("+task.failure+") "):"") + //ペナルティ
            '</span>'
          )
        );

        //時間
        if(task.score !== 0){
          obj_task_td.append(
            $(
              '<span style="color:grey; display:block">' + 
              (Math.floor(task.elapsed_time/60)<10?"0":"") + 
              Math.floor(task.elapsed_time/60) + ":" + 
              (Math.floor(task.elapsed_time%60)<10?"0":"") + 
              (task.elapsed_time%60) +
              '</span>'
             )
          );
        }
      }
    }


    obj_tr.append(obj_task_td);
  });

  //合計得点
  var obj_total_score_td = $('<td class=\"center\"></td>');
  if( Number(item.score)/100 === 0 ){
    obj_total_score_td.text("-");
  }else{
    obj_total_score_td.append(
      $(
        '<span class=\"standings-score\">' + Number(item.score)/100 + '</span>' +
        '<span class="standings-wa"> ' + (Number(item.failure)>0  ? "(" + item.failure + ")" : "") + '</span>' +
        '<span style="color:grey; display:block">' +
        (Math.floor( Number(item.penalty)/60 )<10?"0":"") + Math.floor( Number(item.penalty)/60 ) +
        ":" + (Math.floor( Number(item.penalty)%60 )<10?"0":"") + Number(item.penalty)%60 +
        '</span>'
      )
    );
  }
  obj_tr.append( obj_total_score_td );
  return obj_tr;
}

//順位表テーブルを作成
//begin+1 位 から begin+num 位まで
//<tbody>を返す
function generate_standings(begin, num){
  var ret = $('<tbody></tbody>');
  for(var i = begin; i<begin+num && i<ATCODER.standings.data.length; i++){
    var item = ATCODER.standings.data[i];
    var obj = generate_tr_object(item);
    ret.append(obj);
  }
  return ret;
}

//friend_list + 自分のみの順位表テーブルを作成
//<tbody>を返す
function generate_friend_standings(){
  var ret = $('<tbody></tbody>');
  for(var i = 0; i<ATCODER.standings.data.length; i++){
    var item = ATCODER.standings.data[i];
    if(item.user_id === my_user_id || item.user_screen_name in friend_list){
      var obj = generate_tr_object(item);
      ret.append(obj);
    }
  }
  return ret;
}

//各種変数を初期化
function initialize_variables(){
  //保存された値を取得
  try{
    friend_list = JSON.parse(GM_getValue('GM_friend_list', '{}'));
    page_size = Number(GM_getValue('GM_page_size', 50));
    if(page_size < 1 || isNaN(page_size)){
      console.log('保存された page_size の値が不正です。 page_size = 50 に初期化します。');
      page_size = 50;
      GM_setValue('GM_page_size', 50);
    }
    //show_user_screen_name = GM_getValue('GM_show_user_screen_name', false);
    user_name_display_type = GM_getValue('GM_user_name_display_type', 0);
    enable_rating_color = GM_getValue('GM_enable_rating_color', true);
    enable_modify_table_header = GM_getValue('GM_enable_modify_table_header', false);
    emphasize_friend = GM_getValue('GM_emphasize_friend', true);
  }
  catch(e){
    console.log("保存された値の取得失敗");
    console.log(e);
  }
  
  if( 'me' in ATCODER.standings === true ){
    my_user_id = ATCODER.standings.me.user_id;  //自分のユーザーID
    
    //自分の順位取得
    for(var i = 0; i<ATCODER.standings.data.length; i++){
      if(ATCODER.standings.data[i].user_id === my_user_id){
        my_rank = i;
        break;
      }
    }
    page_pos = Math.floor(my_rank/page_size);   //自分のいるページ
  }
}

//(begin,begin+num]までの順位表を作る
function update_ranking(begin, num){
  var tbl = $('table#contest-standings');
  tbl.children('tbody').replaceWith( generate_standings(begin, num) );
}

function update_friend_ranking(){
  var tbl = $('table#contest-standings');
  tbl.children('tbody').replaceWith( generate_friend_standings() );
}
  
function refresh_rank_table(){
  if(show_friend_standing){
    update_friend_ranking();
  }else{
    update_ranking(page_pos*page_size, page_size);
  }
}

  
//ユーザーの色指定css(埋め込み用)
// ret,yellow,violet,orange,blue,cyan,green,grey,black
function append_user_color_css(){
  var style_tag = $('<style type="text/css" id="user_color"></style>');
  var color_css = '<!--' +
    // official color
    // '.user-red     {color:#FF0000 !important; font-weight: bold;}' +
    // '.user-orange  {color:#FF8000 !important; font-weight: bold;}' +
    // '.user-yellow  {color:#C0C000 !important; font-weight: bold;}' +
    // '.user-blue    {color:#0000FF !important; font-weight: bold;}' +
    // '.user-cyan    {color:#00C0C0 !important; font-weight: bold;}' +
    // '.user-green   {color:#008000 !important; font-weight: bold;}' +
    // '.user-brown   {color:#804000 !important; font-weight: bold;}' +
    // '.user-gray    {color:#808080 !important; font-weight: bold;}' +
    // '.user-unrated {color:#000000 !important; font-weight: bold;}' +
    // '.user-admin   {color:#C000C0 !important; font-weight: bold;}' +
    // original color
    '.user-red    {color: #cc0000 !important; font-weight: bold;}' +
    '.user-orange {color: #cc9933 !important; font-weight: bold;}' +
    '.user-yellow {color: #bb0 !important;    font-weight: bold;}' +
    '.user-blue   {color: #3333cc !important; font-weight: bold;}' +
    '.user-cyan   {color: #03A89E !important; font-weight: bold;}' +
    '.user-green  {color: #339900 !important; font-weight: bold;}' +
    '.user-brown  {color: #804000 !important; font-weight: bold;}' +
    '.user-gray   {color: gray !important;    font-weight: bold;}' +
    '.user-unrated {color:#000000 !important;}' +
    '.user-admin   {color:#C000C0 !important; font-weight: bold;}' +
    '.standings-friend td {background-color: rgba(0, 150, 100, 0.09) !important;}' +
    '.standings-friend:hover td {background-color: rgba(0, 200, 150, 0.09) !important;}' +
    
    //'.table-striped tbody tr:nth-child(odd).standings-friend td {background-color: rgba(0, 100, 80, 0.09) !important;}' + 
    //'.table-striped tbody tr:nth-child(odd).standings-friend:hover td {background-color: rgba(0, 150, 120, 0.09) !important;}' + 
    
    '.table-striped tbody tr:nth-child(odd) td, .table-striped tbody tr:nth-child(odd) th {background-color: #fefefe;}' + //順位表のしましまがウザいので無効化
    '.table tbody tr:hover td, .table tbody tr:hover th {background-color: #fefefe;}' +  //オンマウスで色が変わるのがウザいので無効化
    '//-->';
  style_tag.html(color_css);
  $('head').append(style_tag);
}

//ratingに基づき色を決定する
//色分けは基準は特に何も考えていない
function get_color(rating){
  if(rating === null) rating = 0;
  // -100*K は K級
  // 0以上はレート付き

  if(rating >= 2800) return "user-red";
  if(rating >= 2400) return "user-orange";
  if(rating >= 2000) return "user-yellow";
  if(rating >= 1600) return "user-blue";
  if(rating >= 1200) return "user-cyan";
  if(rating >=  800) return "user-green";
  if(rating >=  400) return "user-brown";
  if(rating >     0) return "user-gray";
  if(rating ==    0) return "user-unrated";
  else return "user-admin";
}

//ナビゲーションツールチップ
function generate_navi(){
  var navi = $('<div style="display:table-row !important;"></div>');
  
  //friends standings
  var tooltip_friend_standings = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_showing_friends_standings">Friends Standings</label></div>');
    var chbox = div_obj.find('#enable_showing_friends_standings');
    if(show_friend_standing) chbox.prop('checked', true);
    chbox.change(function(){
      show_friend_standing = chbox.prop('checked');
      refresh_rank_table();
    });
    return div_obj;
  })();
  
  /*
  //screen name
  var tooltip_screen_name = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_showing_atcoder_id">ユーザ名表示をAtCoderIDにする</label></div>');
    var chbox = div_obj.find('#enable_showing_atcoder_id');
    if(show_user_screen_name) chbox.prop('checked', true);
    chbox.change(function(){
      show_user_screen_name = chbox.prop('checked');
      GM_setValue('GM_show_user_screen_name', show_user_screen_name);
      refresh_rank_table();
    });
    return div_obj;
  })();
  */

  //display name
  var tooltip_display_name = (function(){
    var selecter = $(
      '<div style="display:table-cell !important; padding:5px;">' +
      '<label style="display:inline !important;">' + 
      'User Name' + 
      '</label>' +
      '<select class="form-control " id="selbox_display_name" style="width:170px">' + 
      '<option value=0 id="display_type_0">User Name</option>' +
      '<option value=1 id="display_type_1">AtCoderID</option>' +
      '<option value=2 id="display_type_2">User Name / AtCoderID</option>' +
      '<option value=3 id="display_type_3">AtCoderID / User Name</option>' +
      '</select>' +
      '</div>'
    );
    selecter.find('option[value=' + user_name_display_type + ']').prop('selected', true);

    selecter.find('#selbox_display_name').change( function(){
      user_name_display_type = Number( $('#selbox_display_name option:selected').val() );
      GM_setValue('GM_user_name_display_type', user_name_display_type);
      refresh_rank_table();
    });
    return selecter;
  })();
  
  //rating color
  var tooltip_rating_color = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_showing_rating_color">Rating Color</label></div>');
    var chbox = div_obj.find('#enable_showing_rating_color');
    if(enable_rating_color) chbox.prop('checked', true);
    chbox.change(function(){
      enable_rating_color = chbox.prop('checked');
      GM_setValue('GM_enable_rating_color', enable_rating_color);
      refresh_rank_table();
    });
    return div_obj;
  })();
  
  //page
  var tooltip_pagesize = (function(){
    var selecter = $(
      '<div class="form-horizontal"  style="display:table-cell !important;  padding:10px;">' +
      '<label  style="display:inline !important;  padding:10px;">' + 
      'Page Size' + 
      '</label>' +
      '<select class="form-control " id="selbox_pagesize" style="width:100px">' + 
      '<option value=20    id="pgsz_20" >20 </option>' +
      '<option value=50    id="pgsz_50" >50 </option>'  +
      '<option value=100   id="pgsz_100">100</option>'  +
      '<option value=200   id="pgsz_200">200</option>'  +
      '<option value=500   id="pgsz_500">500</option>'  +
      '<option value=10000 id="pgsz_all">All</option>' +
      '</select>' +
      '</div>'
    );
    selecter.find('option[value=' + page_size + ']').prop('selected', true);

    selecter.find('#selbox_pagesize').change( function(){
      page_size = Number( $('#selbox_pagesize option:selected').val() );
      GM_setValue('GM_page_size', page_size);
      location.reload();
    });
    return selecter;
  })();
  
  //my standing and scroll link
  var tooltip_scroll_to_my_standing = (function(){
    var div_obj = $('<div style="display:table-cell !important; padding:10px; padding-left:10px;"></div>');
    div_obj.append( $('<a id="rank_navi" style="cursor: pointer;">Your Rank : ' + $(".standings-me > td.standings-rank").text() + '</a>').click(scroll_to_my_standing) );
    return div_obj;
  })();

  //reloading button
  var tooltip_reload_standings = (function(){
    var div_obj = $('<div style="display:table-cell !important; padding:10px; padding-left:10px;"></div>');
    div_obj.append( $('<a id="reload_standings_navi" style="cursor: pointer;">🔃Update Standings</a>').click(reload_standings) );
    return div_obj;
  })();
  
  //auto reloading
  var tooltip_auto_reloading = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_auto_reload">Auto Update (1 min)</label></div>');
    var chbox = div_obj.find('#enable_auto_reload');
    chbox.change(function(){
      if(chbox.prop('checked') === true){
        auto_reload_event_id = setInterval(reload_standings, 60000);

      }else{
        clearInterval(auto_reload_event_id);
      }
    });
    return div_obj;
  })();
  
  var tooltip_modify_table_header = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_modify_table_header">Switch table\'s link to problem page</label></div>');
    var chbox = div_obj.find('#enable_modify_table_header');
    
    if(enable_modify_table_header) chbox.prop('checked', true);
    
    chbox.change(function(){
      enable_modify_table_header = chbox.prop('checked');
      GM_setValue('GM_enable_modify_table_header', enable_modify_table_header);
      location.reload();
    });
    return div_obj;
  })();
  
  var tooltip_emphasize_friend = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="emphasize_friend">Highlight Friends</label></div>');
    var chbox = div_obj.find('#emphasize_friend');
    
    if(emphasize_friend) chbox.prop('checked', true);
    
    chbox.change(function(){
      emphasize_friend = chbox.prop('checked');
      GM_setValue('GM_emphasize_friend', emphasize_friend);
      refresh_rank_table();
    });
    return div_obj;
  })();
  

  //navi.append(btn);
  if(my_user_id !== 0){
    navi.append(tooltip_scroll_to_my_standing);
  }
  navi.append(tooltip_reload_standings);
  navi.append(tooltip_auto_reloading);

  navi.append(tooltip_friend_standings);
  navi.append(tooltip_emphasize_friend);
  //navi.append(tooltip_screen_name);
  navi.append(tooltip_display_name);
  navi.append(tooltip_rating_color);
  navi.append(tooltip_modify_table_header);
  navi.append(tooltip_pagesize);
  
  $('h2').after(navi);
}

//ページ切り替え用footerを生成
function generate_page_footer(){

  var wrapper = $('<div class="pagination pagination-centered" id="pagination-standings"></div>');
  var outer = $('<ul></ul>');
  var num_participants = ATCODER.standings.data.length;
  var num_pages = Math.ceil(num_participants / page_size);
  for(var i=0; i<num_pages; i++){
    (function(){
      var p = i;
      var tmp = $(
        '<li class="li-pagination">' +
        '<a href="#">' + 
        (i+1) +
        '</a>' +
        '</li>'
      );
      if(p === page_pos){
        tmp.addClass('active');
      }
      tmp.click ( function(){
        $('div#pagination-standings > ul > li.active').removeClass('active');
        $(this).addClass('active');
        page_pos = p;

        show_friend_standing = false;
        $('#enable_showing_friends_standings').prop('checked', false);
        refresh_rank_table();
        
      } );
      outer.append(tmp);
    })();
  }
  wrapper.append(outer);
  $('#pagination-standings').replaceWith(wrapper);
}

  //順位更新
function reload_standings(){

  $('a#reload_standings_navi').text('Getting...');
  console.log('getting standings');

  //ajaxで順位表データを取得
  $.ajax({
    url: "./standings",
  }).done(function(html) {
    new_standings_text = $(html).filter('script[type="text/JavaScript"]').text();
    new_standings_text = new_standings_text.replace(/\s*var\s*ATCODER\s*=\s*\{\};/m, "");
    Function(new_standings_text)();
    
    console.log("successfully got standings");
    
    $('a#reload_standings_navi').text('Updating...');
    
    //自分の順位取得
    if(my_user_id !== 0){
      //自分の順位を取得
      for(var i = 0; i<ATCODER.standings.data.length; i++){
        if(ATCODER.standings.data[i].user_id === my_user_id){
          my_rank = i;
          break;
        }
      }
      page_pos = Math.floor(my_rank/page_size);   //自分のいるページ
      generate_page_footer();
    }

    //順位表を更新
    refresh_rank_table();
    
    if(my_user_id !== 0){
      $('a#rank_navi').text( 'Your Rank : ' + $(".standings-me > td.standings-rank").text() );
    }
    
    $('a#reload_standings_navi').text('Updated');
    
  }).fail(function(xhr, status, error) {
    $('a#reload_standings_navi').text('Failed to update');
    console.log('failed to update');
  }).always(function(){
    setTimeout(function(){
      $('a#reload_standings_navi').text('🔃Update Standings');
  },2000);
  });

}

//自分の順位までスクロール
function scroll_to_my_standing(){
  //自分のいるページへ移動
  if(page_pos !== Math.floor(my_rank/page_size)){
    page_pos = Math.floor(my_rank/page_size);   //自分のいるページ

    $('div#pagination-standings > ul > li.active').removeClass('active');
    $('div#pagination-standings > ul > li:nth-child(' + (page_pos+1) + ')').addClass('active');

    refresh_rank_table();
  }

  //スクロール
  $('body,html').animate({scrollTop:$('.standings-me').offset().top-200}, 200, 'swing');
}

//テーブルの問題のリンク先を変更
function modify_thead(){
  if(enable_modify_table_header === false) return;
  
  var th = $('#contest-standings > thead > tr > th:gt(1)');
  var num_tasks = th.length - 1;
  $.ajax({
    url: "./assignments",
  }).done(function(html) {
    var assignments_table = $(html).find('table > tbody > tr');
    function get_task_url(task, task_name){
      var tmp = assignments_table.eq(task).find('td:eq(1) > a');
      return tmp.attr('href');
    }
    for(var i = 0; i<num_tasks; i++){
      var url = get_task_url(i, th.eq(i).text());
      th.eq(i).children('a').attr('href', url).attr('target','_blank');
    }
  }).fail(function(xhr, status, error){
  }).always(function(){
  });
}

//ページ下部にバージョン情報を表示
function generate_version_info(){
  var acs_link = $('<a></a>').css('font-style','italic').css('color','grey').attr('href', 'https://github.com/koyumeishi/atcoder_script').attr('target', '_blank').text("AtCoderCustomStandings");
  var ver_info = $('<span></span>').css('font-style','italic').css('color','grey').text( "ver : " + atcoder_custom_standings_version + " ( " + updated_date + " )" );

  var obj = $('<div id="AtCoderCustomStandings_info"></div>').append(acs_link).append('<br>').append(ver_info).append('<br>');
  $('#pagination-standings').after(obj);
}

//ロード時に実行
$(function(){
  initialize_variables();
  append_user_color_css();
  update_ranking(page_pos*page_size, page_size);
  generate_page_footer();
  generate_version_info();
  generate_navi();
  modify_thead();
});


});
