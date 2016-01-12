// ==UserScript==
// @name        AtCoderCustomStandings
// @namespace   koyumeishi_scripts_AtCoderCustomStandings
// @include     http://*.contest.atcoder.jp/standings*
// @downloadURL https://koyumeishi.github.io/atcoder_script/ranking_script.user.js
// @version     0.06
// @author      koyumeishi
// @grant       GM_setValue
// @grant       GM_getValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

// 更新履歴
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

//user rating 情報(手動更新) last updat : ARC046 (2015/12/13)
//5級まで
var rating_map = {"yutaka1999":3007,"LayCurse":3007,"snuke":2878,"uwi":2863,"kawatea":2849,"anta":2841,"kmjp":2722,"Komaki":2650,"k8n":2604,"zerokugi":2600,"cgy4ever":2579,"climpet":2556,"evima":2539,"sky58":2480,"math":2442,"mamekin":2419,"ainu7":2382,"yokozuna57":2346,"kcm1700":2320,"IH19980412":2288,"Miip":2285,"iwiwi":2281,"sugim48":2267,"sune2":2244,"tomerun":2234,"logicmachine":2216,"EmK":2203,"atetubou":2191,"yosupo":2147,"sigma425":2097,"DEGwer":2082,"rankugai":2075,"yukim":2058,"tanzaku":1998,"yuusti":1983,"takahashikun":1982,"kusano":1947,"hamadu":1937,"ichyo":1935,"Lepton":1927,"kohyatoh":1921,"navi":1913,"takapt":1913,"dohatsutsu":1906,"ryoissy":1872,"Kmcode":1869,"cos":1862,"MiSawa":1861,"hirosegolf":1852,"nodchip":1827,"august14":1825,"Darsein":1825,"tozangezan":1817,"Nekosyndrome":1812,"natsugiri":1800,"cafelier":1800,"tokoharu":1800,"ush":1796,"satashun":1791,"hs484":1784,"pes":1770,"fura2":1756,"catupper":1750,"nadeko":1736,"fuqinho":1734,"tmt514":1733,"piroz95":1730,"watashi":1709,"reew2n":1707,"namonakiacc":1707,"anta0":1707,"kyulidenamida":1692,"semiexp":1690,"not":1674,"torimal":1673,"latte0119":1672,"tsukuno":1664,"Huziwara":1659,"hasi":1649,"y3eadgbe":1646,"mkotha":1644,"tanakh":1642,"kyuridenamida":1638,"satos":1634,"lyoz":1626,"xumpei":1612,"asi1024":1595,"dollar":1568,"jellies":1558,"inuhiroshi":1555,"mikecat":1554,"Sakurako":1550,"camypaper":1533,"autotaker":1520,"amylase":1519,"chaemon":1508,"Hec":1507,"ktrumpet":1495,"mayoko":1486,"ei1333":1483,"hogloid":1471,"tkt29":1464,"drafear":1453,"kuno4n":1440,"leafmoon":1440,"koyumeishi":1435,"arosh":1429,"kobae964":1429,"wisterik":1424,"eha":1418,"izuru":1412,"kzyKT":1411,"yaoshimax":1395,"zukky":1386,"wo01":1384,"Tan90909090":1384,"b_inary":1384,"shindannin":1379,"Ryosuke839":1371,"SSJJ":1370,"kinodjnz":1367,"odan":1360,"nakari_1124":1359,"dai1741":1352,"a2stnk":1349,"kojingharang":1347,"j_gui0121":1336,"NegiMagnet":1329,"mondatto":1328,"rantd":1324,"hyksm":1323,"nhirokinet":1321,"hirokazu1020":1318,"ixxa":1310,"yaketake08":1297,"shioshiota":1290,"kuuso":1285,"okaduki":1277,"rabbit_TR":1274,"garasubo":1271,"tsukasa_diary":1268,"WinField95":1265,"yasuand":1252,"TakaakiUmedu":1247,"hiromu":1247,"Hachimori":1242,"minus9d":1234,"TowersofHanoi":1233,"sate3saku3":1232,"abc3141":1229,"Div9851":1221,"gasin":1214,"hoshi524":1200,"s1221149":1194,"tatsy":1194,"gotto":1191,"phyllo":1186,"eomole":1183,"okura":1182,"mugenen":1180,"cympfh":1179,"over80":1172,"iwashisnake":1168,"methane":1161,"machy":1159,"kmatsunaga":1159,"Respect2D":1155,"nwin":1142,"roxion1377":1139,"nel215":1139,"roiti":1135,"riantkb":1135,"dussel":1135,"eitaho":1133,"nyama":1128,"majiang":1128,"flour4445":1125,"ishikado":1123,"numa":1123,"no15_renne":1119,"hiro116s":1111,"nanikaka":1109,"cojna":1108,"Vetteru":1108,"purple928":1108,"UminchuR":1107,"gamelove765":1104,"nisshy":1102,"sekiye":1100,"cls0001011":1095,"tkmhsy":1092,"togatoga":1092,"na_o_s":1091,"tomoya":1091,"solorab":1089,"yuta1024":1089,"Glen_S":1088,"jasy":1088,"blue0620":1087,"hotpepsi":1084,"konjo":1084,"jimon":1081,"suigingin":1081,"chronotable":1075,"igaxx":1075,"calc":1073,"Johniel":1072,"lay20114":1070,"garnacha":1069,"otaks21":1065,"aizu1210062":1062,"startcpp":1062,"yokit9":1060,"xenophobia":1060,"kei":1060,"atukiomura":1059,"Hagentern":1059,"mitsuchie":1058,"mkiken":1058,"osak":1056,"yuki2006":1055,"takuk":1052,"hakomo":1051,"technetium28":1045,"kkk":1043,"lawliet3110":1039,"colun":1039,"s1200008":1038,"phi16":1038,"hogeover30":1036,"damekamo":1034,"mukku":1034,"sh19910711":1031,"tatuyan":1030,"capythm":1024,"sasa0824":1024,"mizo0203":1021,"saltcandy123":1021,"mas":1021,"Cubic":1018,"a5ua":1015,"biochemfan":1012,"Glacier1423":1009,"Fuh":1009,"donkey":1005,"mayumini":-100,"zakuro9715":-100,"yuxxxx":-100,"okumin":-100,"shimomire":-100,"yappy":-100,"rkx1209":-100,"dolphinigle":-100,"simanman":-100,"yaz":-100,"cloxe365":-100,"spica314":-100,"goryudyuma":-100,"iwashi31":-100,"papepi":-100,"tainohimono":-100,"chir":-100,"spade630":-100,"kituneonechan":-100,"ainta":-100,"ioryz":-100,"ytwtnb":-100,"almizaar":-100,"rickytheta":-100,"tomoki":-100,"Juyi":-100,"acguy":-100,"tkzw_21":-100,"queue":-100,"BGSC":-100,"kamitsutoshi":-100,"nankotsu230":-100,"hetare09":-100,"threepipes_s":-100,"kakira":-100,"yoshikyoto":-100,"urutom":-100,"ne210064":-100,"hiking":-100,"ynq1242":-100,"ryunosuke":-100,"dismob":-100,"tokusin":-100,"orisano":-100,"dreamoon":-100,"uzuki008":-100,"kenimo":-100,"nolimbre":-100,"ZUK":-100,"tnoda":-100,"fujiyama":-100,"ogiekako":-100,"winjii":-100,"xhae":-100,"kinkin":-100,"komiya":-100,"Rainin":-100,"udondon":-100,"sessoh":-100,"moc":-100,"noriok":-100,"tibakf27":-100,"naoki":-100,"tshita":-100,"agekutar":-100,"material":-100,"nox":-100,"liniku":-100,"knowl":-100,"dragonex":-100,"wshunn":-100,"btk15049":-100,"kagamiz":-100,"trpkt1001":-100,"nota":-100,"kitayuta":-100,"warm4C0":-100,"nikollson":-100,"fujisu":-100,"notogawa":-100,"peria":-100,"rikku":-100,"median0816":-100,"amano":-100,"Iselix":-200,"tsuburin":-200,"hyas":-200,"ttsuki":-200,"maatakamii228":-200,"deflat":-200,"wotsushi":-200,"tnkt37":-200,"mo2mo268":-200,"shisyamo1192":-200,"passcut2000":-200,"battamon":-200,"Doju":-200,"kazh98":-200,"kohei0418":-200,"emon":-200,"flowlight":-200,"hitting1024":-200,"tanutarou":-200,"imulan":-200,"vain0":-200,"natsuru":-200,"ik11235":-200,"airis":-200,"maro":-200,"tanunu":-200,"reanisz":-200,"WahrGrowth":-200,"k3kaimu":-200,"lambdataro":-200,"gecko655":-200,"tah":-200,"brly":-200,"murooka":-200,"natrium":-200,"tetsuma":-200,"nyama859":-200,"rabbitfoot":-200,"pekoong":-200,"chigichan24":-200,"hogekura":-200,"fetburner":-200,"purp1e928":-200,"goto":-200,"takopoppo":-200,"eagletmt":-200,"n_knuu":-200,"yakk512":-200,"lrmystp":-200,"taktah":-200,"berlysia":-200,"naoya_t":-200,"taksz":-200,"nyon":-200,"xrekkusu":-200,"ddshigure":-200,"kaiy":-200,"haraduka":-200,"minorin":-200,"saharan":-200,"Isurugieri":-200,"omochana2":-200,"iseekautos":-200,"yone64":-200,"uoo38":-200,"raven38":-200,"junonon":-200,"cormoran":-200,"escale_kobe":-200,"sndtkrh":-200,"SGI":-200,"zeosutt":-200,"kyos1704":-200,"patahene":-200,"takoshi":-200,"uji52":-200,"Allen":-200,"kenkoooo":-200,"rmn_31415":-200,"itchyny":-200,"yabuuuuu":-200,"natsuki":-200,"lan":-200,"mino":-200,"shinshin":-200,"oyas":-200,"shouyu":-200,"nickle":-200,"m0ch12uk1_dango":-200,"Ashurnasirpal":-200,"zaiko":-200,"drken":-200,"tochukaso":-200,"hanazuki":-200,"cecet":-200,"lune":-200,"touyou":-200,"oigami":-300,"ustimaw":-300,"koten_under":-300,"Min_25":-300,"kaneda":-300,"scor":-300,"vict":-300,"define0314":-300,"chuka231":-300,"lanevok":-300,"bobuhiro11":-300,"khibino":-300,"johnnyhibiki":-300,"gyuuto":-300,"joisino":-300,"nkmrtmnr":-300,"MOBIUSi":-300,"daiota":-300,"Yazaten":-300,"jango":-300,"nahcnuj":-300,"puyopop":-300,"moheiji":-300,"kagemiku":-300,"uriku":-300,"kiseichu":-300,"cookies":-300,"femto16":-300,"ykl08":-300,"nisenabe":-300,"amaryllis":-300,"stone725":-300,"thinca":-300,"puyokawa":-300,"atton":-300,"ikeha":-300,"thorikawa":-300,"Lindan":-300,"ir5":-300,"ameolp":-300,"novemura":-300,"kielnow":-300,"piyoko212":-300,"afterCmidday":-300,"cherry7kurai24":-300,"konipu":-300,"staka":-300,"rydotyosh":-300,"kikeroga":-300,"kjfakjfks":-300,"erukiti2":-300,"maroonrk":-300,"miya":-300,"takepan":-300,"LazyMii":-300,"yasuyuky":-300,"keny30827":-300,"wanimaru47":-300,"brown2nvb":-300,"diginatu":-300,"sorao":-300,"kiki33":-300,"wass80":-300,"QtaroKujo":-300,"mephy":-300,"matatabity":-300,"shouta":-300,"uranus":-300,"gahou":-300,"tom_of_death":-300,"poxoq":-300,"orpheus":-300,"longbiau":-300,"kyontan":-300,"yuiop":-300,"fof":-300,"wakamoly":-300,"prpr":-300,"taketake0609":-300,"akino":-300,"hotoku":-300,"poppo":-300,"pocarist":-300,"alotofwe":-300,"toshif":-300,"HeK7wnhs0":-300,"Kevinrobot34":-300,"Azathoth":-300,"C01L":-300,"wapiko":-300,"phero":-300,"ganatcs":-300,"matsu4512":-300,"sota":-300,"altema":-300,"T1610":-300,"cryspharos":-300,"qrrakakh":-300,"katakata":-300,"yokabb":-300,"s1180161":-300,"primenumber":-300,"winger":-300,"otama_jaccy":-300,"KUBO":-300,"smallgate":-300,"yukitohj":-300,"doysid":-300,"monman53":-300,"sugi2358":-300,"lanuvas":-300,"bugtori":-300,"org2501":-300,"waidotto":-300,"shinike":-300,"ty70":-300,"renkonuma":-300,"b158b":-300,"kakkun61":-400,"ophelia":-400,"michisu":-400,"romk":-400,"tsmasa":-400,"kazunetakahashi":-400,"zhangbjb":-400,"eulerdora":-400,"spinical":-400,"lovablepleiad":-400,"dango_colonel":-400,"polequoll":-400,"sters":-400,"rubberyuzu":-400,"zephyr":-400,"peradfn1126":-400,"yu_i9":-400,"tsujino":-400,"ish_774":-400,"naru":-400,"hanada009":-400,"takeru_m":-400,"jxuaqxwd":-400,"fucktheworld":-400,"muupan":-400,"nekonyaso_":-400,"skeletont":-400,"parroty":-400,"tokichie":-400,"tayama0324":-400,"at_kanon":-400,"takisekazuki":-400,"goading":-400,"re4k":-400,"stoikheia":-400,"miki16g":-400,"itiut":-400,"swingby":-400,"otofu":-400,"tomoasleep":-400,"holyakolonu":-400,"k_mizuto":-400,"garugoru45":-400,"ymduu":-400,"gavotte":-400,"frederica":-400,"kriii":-400,"tsubu":-400,"tokoromaru":-400,"ponkotuy":-400,"hakoai":-400,"accelation":-400,"yousack728":-400,"y42sora":-400,"surusuto":-400,"crakac":-400,"siotouto":-400,"sigma":-400,"spin13":-400,"xyz":-400,"zero0yumechi":-400,"Leko":-400,"rhx":-400,"qnighy":-400,"arrows":-400,"tsuneo":-400,"walkre":-400,"Marimoiro":-400,"fmhr":-400,"nojima":-400,"admjgptw1357":-400,"akovski":-400,"palpal":-400,"lttaltta":-400,"kurikazu":-400,"yusui":-400,"seagull_kamome":-400,"exKAZUu":-400,"nullmineral":-400,"iraytno":-400,"nagana":-400,"fuzuiR":-400,"iehn":-400,"okaoka":-400,"aika_djmax":-400,"rigibun":-400,"abesy8688":-400,"ksla":-400,"koyahi":-400,"R2D2S2":-400,"hozum":-400,"tama":-400,"tazoe":-400,"hota":-400,"ee07030":-400,"ryohei":-400,"asterism":-400,"oduk":-400,"Iceman0":-400,"nearwisteria":-400,"yosss":-400,"nida_001":-400,"tatsuyafw":-400,"ha1f":-400,"soupe":-400,"saku":-400,"sotetsuk":-400,"mamonbo":-400,"nyanp":-400,"tekito":-400,"akouryy":-400,"utisam":-400,"keitaro9ml":-400,"tomtan":-400,"MurATa25":-400,"lubyna":-400,"komogkomog":-400,"ytsiden":-400,"cony0328":-400,"isa_rentacs":-400,"Sei":-400,"Ktya_59":-400,"kobori":-400,"tm8st":-400,"mimizu":-400,"TeamCraftworks":-400,"haruki57":-400,"Kuni88":-400,"yingtai":-400,"i4da":-400,"tarako":-400,"domyojikarin":-400,"kyubuns":-400,"sash":-400,"yu3mars":-400,"t_hrhs":-400,"hayashiya_ten":-400,"Flandrome":-400,"nonamea774":-400,"takamoto":-400,"Ueddy":-400,"raii":-400,"apple_juice":-400,"aosuka":-400,"gamera416":-400,"taruta0811":-400,"tom94826":-400,"hak7a3":-400,"arukuka":-400,"sabottenda":-400,"Etoile_VI":-400,"ryo_kun":-400,"y331":-400,"shogo82148":-400,"miki1123":-400,"nogami":-400,"akahana":-400,"kivantium":-400,"kid_ut":-400,"haru":-400,"todo314":-400,"cocodrips":-400,"ebamasa":-400,"t8m8":-400,"frkw":-400,"KeiyaSakabe":-400,"Nakamine":-400,"paralleltree":-400,"ryogo108":-400,"a3636tako":-400,"zaapainfoz":-400,"moratorium08":-400,"yuhoyo":-400,"codek":-400,"TobiasGSmollett":-400,"elzzup":-400,"kou":-400,"lethe2211":-400,"misolmiso":-400,"creatorstree":-500,"haruneko24":-500,"akisute3":-500,"qwefgnm":-500,"takkaw":-500,"Akeru":-500,"gmanipulator":-500,"Soultama":-500,"rook0809":-500,"jkojm23":-500,"NSTomoS":-500,"consent27":-500,"destroist":-500,"D_Rascal":-500,"andriod_kazu":-500,"Andrew":-500,"wfalps":-500,"parfait":-500,"uv_cut":-500,"osakanasan":-500,"tea_leaf":-500,"tak":-500,"kroton":-500,"godai0519":-500,"sanretu":-500,"norahiko":-500,"primrose":-500,"kouki1223":-500,"ottu":-500,"tattii":-500,"yyi90":-500,"coricozizi":-500,"n2_":-500,"masu0912":-500,"ctyl":-500,"hayamari":-500,"XzA_2123":-500,"StoneDot":-500,"jprekz":-500,"dorpi":-500,"IJMP320":-500,"Toro":-500,"Nariyoshi_Chida":-500,"Nokotan":-500,"at_akada":-500,"sonnabakana":-500,"YujiSoftware":-500,"kurisutankun":-500,"choro3":-500,"Hiromi_Kai":-500,"okashoi":-500,"Suichi":-500,"kametaso":-500,"grayzer":-500,"cminus2":-500,"jin_matakich":-500,"achax0511":-500,"sigwin":-500,"okamada":-500,"tyochiai":-500,"s5412039":-500,"ukikagi":-500,"kuzumin":-500,"Nekomimimi":-500,"charcoal_man":-500,"kagasan":-500,"ray45422":-500,"bowwowforeach":-500,"shuhei23":-500,"Ryui":-500,"nocorupe_ast":-500,"uduki845":-500,"urasa":-500,"soimort":-500,"hawksin":-500,"yuuki3655":-500,"soiya":-500,"tekk":-500,"akino2012":-500,"xr0038":-500,"mds_boy":-500,"s_miyoshi":-500,"ahen":-500,"mkjiro":-500,"Ry0u_":-500,"Tachiken":-500,"harumeki":-500,"hiyakashi":-500,"M_Saito":-500,"lambdasawa":-500,"mecha_g3":-500,"kazu19":-500,"wkwk":-500,"yus_iri":-500,"atgw":-500,"Beln":-500,"sat0da":-500,"cainekanak":-500,"redoily":-500,"kokih":-500,"yomosi":-500,"dokan":-500,"universato":-500,"data9824":-500,"zepp":-500,"sako0384":-500,"aitti":-500,"NekoMiMi":-500,"shiratty8":-500,"c2de6320":-500,"yinuh":-500,"saytakaPC":-500,"assy":-500,"sasaki":-500,"enoz_jp":-500,"ngsw_taro":-500,"dolpen":-500,"k_coffee":-500,"well_defined":-500,"ryo_kun101":-500,"existy":-500,"makruk2000":-500,"rollman":-500,"hbk":-500,"airwalker00":-500,"nised":-500,"makkumax":-500,"cucmberium":-500,"pkMZ75105":-500,"mcq":-500,"darselle":-500,"rysk":-500,"kasimatatomoya":-500,"mahsan84":-500,"suga":-500,"kkaneko":-500,"spark6251":-500,"aizukikoh":-500,"nikeeshi":-500,"theoldmoon0602":-500,"tibimosu":-500,"Kt_Sz":-500,"laco0416":-500,"batchunag":-500,"rhenium":-500,"conchan_akita":-500,"jack":-500,"xyz600":-500,"DUS":-500,"atsuhira":-500,"kazuyayasuda":-500,"comocomo":-500,"amiq":-500,"kiripon":-500,"nogitsune413":-500,"Tia9996":-500,"teru0016":-500,"taskie":-500,"Bnkaki":-500,"unsre":-500,"river_sider":-500,"kyave3":-500,"kutsutama":-500,"daimatz":-500,"rexpit":-500,"amusan":-500,"matsu7874":-500,"sakai":-500,"aaa":-500,"syamn":-500,"Tom1031":-500,"daijiken":-500,"gere":-500,"asdf1234":-500,"yak_ex":-500,"shnya":-500,"wataken44":-500,"N11001001":-500,"nejiko96":-500,"nishimura1980":-500,"pura":-500,"tookunn":-500,"aramaki":-500,"subarukun":-500,"whitebell":-500,"hunbaba":-500,"rev84":-500,"alnicomag":-500,"adf2015_short7":-500,"nemupm":-500,"takatano":-500,"omochibuster":-500,"ymis":-500,"cond":-500,"syanatan":-500,"mak_ac":-500,"shokupan":-500,"s171047":-500,"linoal13f":-500,"toshihoge":-500,"purple_jwl":-500,"tanukitune":-500,"iakasT":-500,"pasta":-500,"facehospitality":-500,"meg73":-500,"ngswt":-500,"momen06":-500,};


//自分のuser_id
var my_user_id = 0;

//自分の順位(0-index)
var my_rank = 0;

//1ページの表示人数
var page_size = 50;

//今いるページ
var page_pos = 0;

//ユーザー名をAtCoder IDで表示するか
var show_user_screen_name = false;
//ユーザー名をRatingで色分けするか
var enable_rating_color = true;

//トモダチィ
var friend_list = {};
var show_friend_standing = false;

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
  if(item.user_id == my_user_id){
    obj_tr.addClass("standings-me");
  }else if(item.user_screen_name in friend_list){
    obj_tr.addClass("standings-friend");
  }

  //順位
  obj_tr.append( $('<td class="standings-rank">' + item.rank +'</td>') );
  
  //ユーザー名
  obj_tr.append(
    (function(){
      var obj_td = $('<td class="standings-username dropdown"></td>');
      obj_td.append(
        $(
          '<a class="dropdown-toggle" data-toggle="dropdown" style="display:block;" href="#"> ' +
            '<span ' + (enable_rating_color ? 'class="' + get_color(item.user_screen_name) : "") + '">' + 
              (show_user_screen_name ? item.user_screen_name : escapeHTML(item.user_name)) + 
            '</span> ' +
          '</a>'
        )
      );
      //ドロップダウンメニュー
      var obj_dd_list = $( '<ul class="dropdown-menu"></ul>' );


      obj_dd_list.append(
        '<li>' +
          '<a href="/users/'+ item.user_screen_name + '">' + 
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
            '提出を確認' +
          '</a>' +
        '</li>'
      );

      if(item.user_screen_name in rating_map){
        var rating = rating_map[item.user_screen_name];
        obj_dd_list.append(
          '<li>' +
            '<a ' + (enable_rating_color ? 'class="' + get_color(item.user_screen_name) + '"': "") + '>' + 
              'Rating(β) : ' + 
              (rating<0 ? (rating/-100).toString() + '級' : rating.toString()) +
            '</a>' +
          '</li>'
        );
      }
      
      var obj_not_friend = $(
        '<li><a style="cursor: pointer;">' +
        '<i class="icon icon-star-empty"></i> ' + 
        'Friend List に登録' +
        '</a></li>'
      );
      var obj_friend = $(
        '<li><a style="cursor: pointer;">' +
        '<span style="color:orange !important;">🌟</span> ' + 
        'Friend List から登録解除' +
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
    show_user_screen_name = GM_getValue('GM_show_user_screen_name', false);
    enable_rating_color = GM_getValue('GM_enable_rating_color', true);
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
      '.user-red    {color: #cc0000 !important; font-weight: bold;}' +
      '.user-orange {color: #cc9933 !important; font-weight: bold;}' +
      '.user-yellow {color: #bb0 !important;    font-weight: bold;}' +
      '.user-violet {color: #a0a !important;    font-weight: bold;}' +
      '.user-blue   {color: #3333cc !important; font-weight: bold;}' +
      '.user-cyan   {color: #03A89E !important; font-weight: bold;}' +
      '.user-green  {color: #339900 !important; font-weight: bold;}' +
      '.user-gray   {color: gray !important;    font-weight: bold;}' +
      '.user-black  {color: black !important;}' +
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
function get_color(user){
  if(user in rating_map){
    var rating = rating_map[user];
    // -100*K は K級
    // 0以上はレート付き

    if      (rating < -500)   return "user-black";  //6級以下
    //else if (rating < -200)   return "user-green";  //3-5級
    else if (rating < 0)      return "user-green";   //1-2級
    //else if (rating < 1200)   return "user-cyan";   //0-1199
    else if (rating < 1500)   return "user-blue"; //1200-1499
    else if (rating < 2000)   return "user-orange"; //1500-1999
    else                      return "user-red"; //2000-INF

  }else{
    return "user-black";
  }
}

//ナビゲーションツールチップ
function generate_navi(){
  var navi = $('<div style="display:table-row !important;"></div>');
  
  var tooltip_friend_standings = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_showing_friends_standings">Friend Standings</label></div>');
    var chbox = div_obj.find('#enable_showing_friends_standings');
    if(show_friend_standing) chbox.prop('checked', true);
    chbox.change(function(){
      show_friend_standing = chbox.prop('checked');
      refresh_rank_table();
    });
    return div_obj;
  })();
  
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
  
  var tooltip_rating_color = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_showing_rating_color">ratingで色分け</label></div>');
    var chbox = div_obj.find('#enable_showing_rating_color');
    if(enable_rating_color) chbox.prop('checked', true);
    chbox.change(function(){
      enable_rating_color = chbox.prop('checked');
      GM_setValue('GM_enable_rating_color', enable_rating_color);
      refresh_rank_table();
    });
    return div_obj;
  })();
  
  var tooltip_pagesize = (function(){
    var selecter = $(
      '<div class="form-horizontal"  style="display:table-cell !important;  padding:10px;">' +
      '<label  style="display:inline !important;  padding:10px;">' + 
      '表示件数' + 
      '</label>' +
      '<select class="form-control " id="selbox_pagesize" style="width:100px">' + 
      '<option value=20    id="pgsz_20" >20 </option>' +
      '<option value=50    id="pgsz_50" >50 </option>'  +
      '<option value=100   id="pgsz_100">100</option>'  +
      '<option value=200   id="pgsz_200">200</option>'  +
      '<option value=500   id="pgsz_500">500</option>'  +
      '<option value=10000 id="pgsz_all">全件表示</option>' +
      '</select>' +
      '</div>'
    );
    selecter.find('option[value=' + page_size + ']').prop('selected', true);

    selecter.find('#selbox_pagesize').change( function(){
      page_size = $(':selected').val();
      GM_setValue('GM_page_size', page_size);

      location.reload();
    });
    return selecter;
  })();

  var tooltip_scroll_to_my_standing = (function(){
    var div_obj = $('<div style="display:table-cell !important; padding:10px; padding-left:10px;"></div>');
    div_obj.append( $('<a id="rank_navi" style="cursor: pointer;">現在順位 : ' + $(".standings-me > td.standings-rank").text() + '位</a>').click(scroll_to_my_standing) );
    return div_obj;
  })();

  var tooltip_reload_standings = (function(){
    var div_obj = $('<div style="display:table-cell !important; padding:10px; padding-left:10px;"></div>');
    div_obj.append( $('<a id="reload_standings_navi" style="cursor: pointer;">🔃順位表を更新</a>').click(reload_standings) );
    return div_obj;
  })();
  
  var tooltip_auto_reloading = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_auto_reload">自動更新(1分毎)</label></div>');
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
  

  //navi.append(btn);
  if(my_user_id !== 0){
    navi.append(tooltip_scroll_to_my_standing);
  }
  navi.append(tooltip_reload_standings);
  navi.append(tooltip_auto_reloading);

  navi.append(tooltip_friend_standings);
  navi.append(tooltip_screen_name);
  navi.append(tooltip_rating_color);
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


//ロード時に実行
$(function(){
  initialize_variables();
  append_user_color_css();
  update_ranking(page_pos*page_size, page_size);
  generate_page_footer();
  generate_navi();
});

//順位更新
function reload_standings(){

  $('a#reload_standings_navi').text('取得中...');
  console.log('順位表取得中');

  //ajaxで順位表データを取得
  $.ajax({
    url: "./standings",
  }).done(function(html) {
    new_standings_text = $(html).filter('script[type="text/JavaScript"]').text();
    new_standings_text = new_standings_text.replace(/\s*var\s*ATCODER\s*=\s*\{\};/m, "");
    Function(new_standings_text)();
    
    console.log("取得成功");
    
    $('a#reload_standings_navi').text('更新中...');
    
    //自分の順位取得
    if(my_user_id !== 0){
      //自分の順位を取得
      for(var i = 0; i<ATCODER.standings.data.length; i++){
        if(ATCODER.standings.data[i].user_id === my_user_id){
          my_rank = i;
          break;
        }
      }
      $('a#rank_navi').text( '現在順位 : ' + $(".standings-me > td.standings-rank").text() + '位' );

      page_pos = Math.floor(my_rank/page_size);   //自分のいるページ
      generate_page_footer();
    }

    //順位表を更新
    refresh_rank_table();
    $('a#reload_standings_navi').text('更新完了');
    
  }).fail(function(xhr, status, error) {
    $('a#reload_standings_navi').text('取得失敗');
    console.log('取得失敗');
  }).always(function(){
    setTimeout(function(){
      $('a#reload_standings_navi').text('🔃順位表を更新');
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

});
