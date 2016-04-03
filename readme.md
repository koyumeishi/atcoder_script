# Atcoder scripts
[@koyumeishi_](https://twitter.com/koyumeishi_) の UserScript置き場  
Github Pagesで公開しています。 githubは[こちら](https://github.com/koyumeishi/atcoder_script)

##目録
* [AtCoderCustomStandings](#AtCoderCustomStandings)
* [AtCoderModalMoudarui](#AtCoderModalMoudarui)

## AtCoderCustomStandings <a id="AtCoderCustomStandings"></a>
[https://koyumeishi.github.io/atcoder_script/ranking_script.user.js](https://koyumeishi.github.io/atcoder_script/ranking_script.user.js)

* [はじめに](#hajimeni)
* [更新履歴](#update)
* [インストールとか](#install)
* [使用方法](#usage)
* [その他](#other)

---

### はじめに<a id="hajimeni"></a>
AtCoderの順位表をカスタマイズして表示する非公式UserScriptです。 FirefoxのGreasemonkeyとGoogleChromeのTampermonkeyで動作確認しています。 javascript素人が書いたので予期せぬバグや、AtCoder側の仕様変更により使えなくなる場合があるかも知れません。 大切なコンテストでの使用は自己責任でお願いします。  
zerokugiさんのchrome拡張機能 [Atcoder Friend Standings](https://chrome.google.com/webstore/detail/atcoder-friend-standings/apoegnjnclihjjlighifiojbocjnbbgm) とは競合してしまうのでご注意ください。

### 更新履歴<a id="update"></a>
<div style="overflow: scroll; height: 250px;">
##### v0.12 2016.04.03
-  ARC050のレート更新

##### v0.11 2016.03.19
-  ARC049のレート更新

##### v0.10 2016.03.05
-  ARC048のレート更新

##### v0.09 2016.02.29
-  ユーザー名 / AtCoderID, AtCoderID / ユーザー名 の表示方式を追加
-  friend listに登録された人を強調表示する機能の ON/OFF を追加

##### v0.08 2016.02.13
-  順位表上部の問題名のリンク先を変更したとき、target="_blank"に変更
-  ページ下部にAtCoderCustomStandings/ratingのバージョンを表示

##### v0.07 2016.01.17
-  ARC047のレート更新
-  手動で"順位更新"をクリックしたときに自分の順位が正しく表示されない不具合を修正
-  順位表上部の問題名のリンク先を変更する機能を実装

##### v0.06 2016.01.12
-  非同期通信を理解していなかったので修正

##### v0.05 2016.01.10
- 順位表の凍結に対応(仮)
- 現在順位の表示、自分の位置までスクロールする機能を追加
- ページ再読み込みなしでの順位表更新機能追加(ajaxでstandingsのページを取得してるので実質的には再読み込みしてる)
- 順位表自動更新機能追加
- 1ページ当たりの表示件数に"500件表示"を追加
- rating色付け周りでコードがおかしかったのを修正

##### v0.04 2015.12.14
- 星のemojiは環境次第で着色不可っぽいのでFriend Listに入っていないときはiconを表示するように戻した

##### v0.03 2015.12.14
- ARC046のレート更新
- 「Friend Listに登録/解除」オンマウス時のマウスカーソル変更、星のiconをemojiに変更
- ユーザー名にhtmlコードを使っているとjQueryが拾ってしまう脆弱性を解消
- ドロップダウンメニューにレーティング情報追加

##### v0.02 2015.11.09
- 正の得点をしていない提出の提出時間が 00:00 になっていたのを修正(時間を非表示に)
</div>

### インストールとか<a id="install"></a>

 1. Greasemonkey(Firefox)やTampermonkey(GoogleChrome)やらをブラウザにインストールしておく
 2. 次のリンクを開くとインストールするか尋ねられると思います  
     [https://koyumeishi.github.io/atcoder_script/ranking_script.user.js](https://koyumeishi.github.io/atcoder_script/ranking_script.user.js)



### 使用方法<a id="usage"></a>
    http://*.contest.atcoder.jp/standings*
にアクセスすると、カスタマイズされた順位表が表示されます。  
> ![image1](img/img1.png)  
---
> ![image2](img/img2.png)  

1. friendだけの順位表を表示
2. ユーザー名をAtCoderIDで表示
3. Rating(β)に基づきユーザー名を色づけ
4. 1ページ当たりの表示件数(20,50,100,200,500,全件)
5. 順位表自動更新

こんな感じのカスタマイズが出来ます。全件表示は結構重めなので非推奨です。  
friendの登録/解除は、登録/解除したいユーザーをクリックして出てきたメニューから行ってください。  
friend list等の設定はブラウザに保存されます。

### その他<a id="other"></a>
#### レーティングについて
レーティングはARC(月1～月2ぐらい)のときに更新され、また、そもそもレーティング付きの人がそんなにいないので、手動でクローラ走らせて更新し、scriptに埋め込んでいます(5級まで。14KBほど)。 更新が遅かったら [@koyumeishi_](https://twitter.com/koyumeishi_)に催促してください。
クロールして取得したレーティング情報は [csv](https://koyumeishi.github.io/atcoder_script/rating.csv) や [json](https://koyumeishi.github.io/atcoder_script/rating.json) でも公開しています。何かの役に立てられる方はお使いください。

レーティングの色分け基準や配色に関しては特に考えて決めていません。 

>[function append_user_color_css()](https://github.com/koyumeishi/atcoder_script/blob/gh-pages/ranking_script.user.js#L360)  

に配色の設定、 

>[function get_color(user)](https://github.com/koyumeishi/atcoder_script/blob/gh-pages/ranking_script.user.js#L387)

に色分け基準レートの設定があります。

#### friend listについて
Greasemonkey や Tampermonkey が local strage 的なシステムを提供してくれているので、そこに保存しています。(参考: [http://wiki.greasespot.net/GM_getValue](http://wiki.greasespot.net/GM_getValue) )

    {name:1, name:1, ... , name:1}

のような形のjson文字列で保管しています。(値を1にしているのは連想配列で何らかの値を持たせておく必要があったため。評価にはkeyの存在判定しか使っていないのでnull等でも多分大丈夫)  
順位表のページでブラウザのコンソールから

    GM_getValue('GM_friend_list', null)
と叩くと多分見えます。

    GM_setValue('GM_friend_list', json文字列)
で更新できるので、手動でいじろうと思えばいじれます。

## AtCoderModalMoudarui <a id="AtCoderModalMoudarui"></a>
[https://koyumeishi.github.io/atcoder_script/modal.user.js](https://koyumeishi.github.io/atcoder_script/modal.user.js)  

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">☆AtCoder社に一言お願いします！ — モーダル閉じるの、もーだるい！ <a href="http://t.co/22Y32U6dQd">http://t.co/22Y32U6dQd</a></p>&mdash; nico_shindannin (@nico_shindannin) <a href="https://twitter.com/nico_shindannin/status/514078969080344576">2014, 9月 22</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

って人向けにAtCoderのコンテスト開始時/終了時に表示されるモーダルを非表示にするscriptも書いてみました。 
~~実際のコンテスト時に非表示になるか未確認ですが。~~  
確認しましたが、コンテストの開始・終了がハッキリしないので使用感微妙だと思います。個人的には非推奨です。  

  
