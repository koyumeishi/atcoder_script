# AtCoder Scripts
[@koyumeishi_](https://twitter.com/koyumeishi_) の AtCoder用 UserScript置き場  

##目録
* [AtCoderCustomStandings](#AtCoderCustomStandings)
* [AtCoderModalMoudarui](#AtCoderModalMoudarui)

## AtCoderCustomStandings <a id="AtCoderCustomStandings"></a>
[https://koyumeishi.github.io/atcoder_script/ranking_script.user.js](https://koyumeishi.github.io/atcoder_script/ranking_script.user.js)

* [Introduction](#introduction)
* [Installation](#install)
* [Usage](#usage)
* [Update](#update)

---

### Introduction<a id="introduction"></a>
AtCoderの順位表をカスタマイズして表示する非公式UserScriptです。 FirefoxのGreasemonkeyとGoogleChromeのTampermonkeyで動作確認しています。 javascript素人が書いたので予期せぬバグや、AtCoder側の仕様変更により使えなくなる場合があるかも知れません。 大切なコンテストでの使用は自己責任でお願いします。  
他の順位表のページをいじる拡張機能やuserscriptとは競合する場合があります。  

主な機能

* friendだけの順位表を表示
* 1ページ当たりの表示件数変更(大量に表示すると重いです)
* 順位表自動更新
* 国、レーティング、名前によるフィルター
* 統計情報の表示（順位表から読み取れる分だけなので公式のstatsとは差異が生じます）

### Installation<a id="install"></a>

 1. Greasemonkey(Firefox)やTampermonkey(GoogleChrome)やらをブラウザにインストールしておく
 2. 次のリンクを開くとインストールするか尋ねられると思います  
     [https://koyumeishi.github.io/atcoder_script/ranking_script.user.js](https://koyumeishi.github.io/atcoder_script/ranking_script.user.js)

### Usage<a id="usage"></a>
    http://*.contest.atcoder.jp/standings*
にアクセスすると、カスタマイズされた順位表が表示されます。  

> ![image1](img/img1.png)  

---
Stats  
> ![image2](img/img2.png)  

friendの登録/解除は、順位表のユーザー名をクリックして出てきたメニュー、または Settings から設定可能です。  
friends list等の設定はブラウザに保存されます。

### Update<a id="update"></a>

##### v1.0.0 2017.06.16
-  React.js に書き換え。 フィルタ機能、統計機能等の追加。

##### v0.25 2016.10.10
-  coutry filter の先頭に表示する国を自国 -> 二番目に表示するよう変更

##### v0.24 2016.10.10
-  Your Rank の表示がリロード時に壊れてたのを修正

##### v0.23 2016.10.02
-  country filter の先頭に表示する国を自国へ変更
-  country filter ON時に自分の順位へ移動できなかったバグを解消

##### v0.22 2016.09.17
-  country filter に表示するを参加者のいる国に限定

##### v0.21 2016.09.15
-  atcoderの仕様変更に伴う改善他
    1. user_id のみ表示されるようになったのでユーザー名表示オプションは廃止  
    1. 順位表更新時に自分の順位の位置にページ切り替えする仕様廃止  
    1. national flag に対応  
    1. 公式にテーブルヘッダのリンク先が問題ページになったのでこれの切り替えも廃止  
    1. 順位表更新時に取得したjson文字列を邪悪な方法で更新してたのでちゃんとjsonとしてパースするよう変更  
    1. コンテスト終了後、各問題/各ユーザーのsubmissionを確認できるリンクを追加  
    1. 国別フィルターの実装  

##### v0.20 2016.07.18
-  new.atcoder.jp に対応  

##### v0.19 2016.07.10
-  ARC057のレート更新  

##### v0.18 2016.06.27
-  ARC056のレート更新  

##### v0.17 2016.06.04
-  ARC055のレート更新  

##### v0.16 2016.05.22
-  ARC054のレート更新  

##### v0.15 2016.05.14
-  ARC053のレート更新  

##### v0.14 2016.05.01
-  ARC052のレート更新  

##### v0.13 2016.04.16
-  ARC051のレート更新  

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



## AtCoderModalMoudarui <a id="AtCoderModalMoudarui"></a>
[https://koyumeishi.github.io/atcoder_script/modal.user.js](https://koyumeishi.github.io/atcoder_script/modal.user.js)  

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">☆AtCoder社に一言お願いします！ — モーダル閉じるの、もーだるい！ <a href="http://t.co/22Y32U6dQd">http://t.co/22Y32U6dQd</a></p>&mdash; nico_shindannin (@nico_shindannin) <a href="https://twitter.com/nico_shindannin/status/514078969080344576">2014, 9月 22</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

って人向けにAtCoderのコンテスト開始時/終了時に表示されるモーダルを非表示にするscriptも書いてみました。 
~~実際のコンテスト時に非表示になるか未確認ですが。~~  
確認しましたが、コンテストの開始・終了がハッキリしないので使用感微妙だと思います。個人的には非推奨です。  

  
