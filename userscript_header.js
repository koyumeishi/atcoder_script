// ==UserScript==
// @name        AtCoderCustomStandings
// @namespace   koyumeishi_scripts_AtCoderCustomStandings
// @description customize your standings on atcoder
// @author      koyumeishi
// @include     http://*.contest.atcoder.jp/standings*
// @include     https://*.contest.atcoder.jp/standings*
// @downloadURL https://koyumeishi.github.io/atcoder_script/atcoder_custom_standings.user.js
// @version     __version__
// @run-at      document-idle
// @require     https://unpkg.com/react@15/dist/react.js
// @require     https://unpkg.com/react-dom@15/dist/react-dom.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js
// @resource    materialIcons https://fonts.googleapis.com/icon?family=Material+Icons
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue 
// @grant       GM_getResourceText
// @grant       GM_addStyle 
// ==/UserScript==

// LICENSE
// MIT

const accsVersion = "__version__";

console.log( "AtCoderCustomStandings ver.", accsVersion);
GM_listValues().forEach( (v) => {console.log( v, GM_getValue(v) );} );

GM_addStyle( GM_getResourceText('materialIcons') );

