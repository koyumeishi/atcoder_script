// ==UserScript==
// @name         AtCoderModalMoudarui
// @namespace    koyumeishi_scripts_AtCoderModalMoudarui
// @downloadURL  https://koyumeishi.github.io/atcoder_script/modal.user.js
// @version      0.02
// @description  modal moudarui
// @author       koyumeishi
// @match        http://*.contest.atcoder.jp/*
// @match        https://*.contest.atcoder.jp/*
// @grant        none
// ==/UserScript==

(function(){
    document.getElementById('modal-contest-begin').setAttribute('id', 'modal-contest-begin-disabled');
    document.getElementById('modal-contest-end').setAttribute('id', 'modal-contest-end-disabled');
})();