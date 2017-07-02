# AtCoder Scripts
[@koyumeishi_](https://twitter.com/koyumeishi_) の AtCoder用 UserScript置き場  


##目録
* [AtCoderCustomStandings](#AtCoderCustomStandings)
* [AtCoderModalMoudarui](#AtCoderModalMoudarui)

## AtCoderCustomStandings <a id="AtCoderCustomStandings"></a>
[https://koyumeishi.github.io/atcoder_script/atcoder_custom_standings.user.js](https://koyumeishi.github.io/atcoder_script/atcoder_custom_standings.user.js)  
#### English version is [here](readme_eng.md)

* [Introduction](#introduction)
* [Installation](#install)
* [Usage](#usage)
* [Release Notes](release_notes.md)
* [License](#license)

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
     [https://koyumeishi.github.io/atcoder_script/atcoder_custom_standings.user.js](https://koyumeishi.github.io/atcoder_script/atcoder_custom_standings.user.js)

### Usage<a id="usage"></a>
    http://*.contest.atcoder.jp/standings*
にアクセスすると、カスタマイズされた順位表が表示されます。  

> ![image1](img/img1.png)  

---
Stats  
> ![image2](img/img2.png)  

friendの登録/解除は、順位表のユーザー名をクリックして出てきたメニュー、または Settings から設定可能です。  
friends list等の設定はブラウザに保存されます。

### License<a id="license"></a>
MIT


## AtCoderModalMoudarui <a id="AtCoderModalMoudarui"></a>
[https://koyumeishi.github.io/atcoder_script/modal.user.js](https://koyumeishi.github.io/atcoder_script/modal.user.js)  

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">☆AtCoder社に一言お願いします！ — モーダル閉じるの、もーだるい！ <a href="http://t.co/22Y32U6dQd">http://t.co/22Y32U6dQd</a></p>&mdash; nico_shindannin (@nico_shindannin) <a href="https://twitter.com/nico_shindannin/status/514078969080344576">2014, 9月 22</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

って人向けにAtCoderのコンテスト開始時/終了時に表示されるモーダルを非表示にするscriptも書いてみました。 
~~実際のコンテスト時に非表示になるか未確認ですが。~~  
確認しましたが、コンテストの開始・終了がハッキリしないので使用感微妙だと思います。個人的には非推奨です。  

  
