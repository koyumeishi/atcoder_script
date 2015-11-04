// ==UserScript==
// @name         AtCoderModalMoudarui
// @namespace    koyumeishi_scripts_AtCoderModalMoudarui
// @version      0.1
// @description  disable modals
// @author       koyumeishi
// @match        http://*.contest.atcoder.jp/*
// @match        https://*.contest.atcoder.jp/*
// @grant        none
// ==/UserScript==

(function(){
  window.addEventListener("load", function(){
    document.getElementById('modal-contest-begin').setAttribute('id', 'modal-contest-begin-disabled');
    document.getElementById('modal-contest-end').setAttribute('id', 'modal-contest-end-disabled');
  }, false);
})();