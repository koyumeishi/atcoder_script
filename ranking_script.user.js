// ==UserScript==
// @name        AtCoderCustomStandings
// @namespace   koyumeishi_scripts_AtCoderCustomStandings
// @include     http://*.contest.atcoder.jp/standings*
// @downloadURL https://koyumeishi.github.io/atcoder_script/ranking_script.user.js
// @version     0.15
// @author      koyumeishi
// @grant       GM_setValue
// @grant       GM_getValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @description https://github.com/koyumeishi/atcoder_script
// ==/UserScript==

// 更新履歴
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

//user rating 情報(手動更新) last update : ARC051 (2016/04/16)
//5級まで
var rating_map = {"kmjp":3060,"yutaka1999":3037,"LayCurse":3030,"anta":2973,"snuke":2962,"sugim48":2911,"kawatea":2911,"uwi":2871,"climpet":2762,"Komaki":2650,"zerokugi":2634,"k8n":2604,"yokozuna57":2562,"IH19980412":2562,"evima":2539,"cgy4ever":2479,"kcm1700":2420,"math":2341,"ainu7":2334,"mamekin":2332,"logicmachine":2295,"DEGwer":2290,"iwiwi":2281,"sky58":2254,"sune2":2244,"tomerun":2234,"EmK":2203,"yosupo":2197,"hamadu":2196,"atetubou":2191,"august14":2186,"hogloid":2134,"Miip":2093,"latte0119":2084,"rankugai":2075,"yukim":2050,"asi1024":2014,"tanzaku":1998,"yuusti":1983,"takahashikun":1982,"natsugiri":1964,"kohyatoh":1921,"navi":1913,"sigma425":1897,"Lepton":1887,"dohatsutsu":1882,"tanakh":1875,"semiexp":1874,"ryoissy":1872,"takapt":1863,"cos":1862,"tokoharu":1862,"MiSawa":1861,"drafear":1858,"piroz95":1856,"hirosegolf":1852,"reew2n":1842,"ichyo":1838,"nodchip":1827,"Darsein":1825,"tozangezan":1817,"camypaper":1815,"cafelier":1800,"yaoshimax":1800,"ush":1796,"xumpei":1786,"pes":1770,"fura2":1756,"kyuridenamida":1750,"hs484":1740,"nadeko":1736,"fuqinho":1734,"tmt514":1733,"not":1723,"satashun":1718,"satos":1712,"kusano":1709,"watashi":1709,"namonakiacc":1707,"anta0":1707,"catupper":1701,"kyulidenamida":1692,"Kmcode":1682,"torimal":1673,"Nekosyndrome":1671,"tsukuno":1664,"Huziwara":1659,"y3eadgbe":1646,"mkotha":1644,"rickytheta":1628,"gasin":1627,"koyumeishi":1605,"hasi":1603,"zukky":1590,"mayoko":1589,"maroonrk":1582,"lyoz":1580,"omeometo":1569,"dollar":1568,"jellies":1558,"mikecat":1554,"Sakurako":1550,"Kazami":1528,"blue0620":1521,"autotaker":1520,"amylase":1519,"chaemon":1508,"inuhiroshi":1505,"rantd":1499,"okaduki":1498,"urutom":1496,"a2stnk":1475,"j_gui0121":1466,"tkt29":1464,"eha":1445,"roiti":1441,"leafmoon":1440,"kuno4n":1440,"wisterik":1424,"izuru":1412,"ktrumpet":1392,"yaketake08":1388,"b_inary":1384,"wo01":1384,"riantkb":1377,"Tan90909090":1377,"Ryosuke839":1371,"SSJJ":1370,"kinodjnz":1367,"startcpp":1367,"ei1333":1365,"dai1741":1352,"kzyKT":1351,"arosh":1350,"kojingharang":1347,"btk15049":1342,"NegiMagnet":1335,"shindannin":1331,"hyksm":1323,"cympfh":1321,"nhirokinet":1321,"nakari_1124":1319,"ixxa":1313,"garasubo":1311,"Hec":1309,"machy":1277,"mondatto":1274,"Glacier1423":1270,"kuuso":1264,"odan":1257,"noriok":1254,"shioshiota":1253,"yasuand":1252,"TakaakiUmedu":1247,"hiromu":1247,"abc3141":1246,"sate3saku3":1241,"no15_renne":1237,"TowersofHanoi":1233,"tsukasa_diary":1233,"Hachimori":1231,"kobae964":1230,"Div9851":1221,"minus9d":1206,"gotto":1194,"tatsy":1194,"saltcandy123":1193,"s1221149":1186,"hirokazu1020":1184,"eomole":1183,"okura":1182,"mugenen":1180,"phi16":1178,"konjo":1177,"WinField95":1174,"over80":1172,"iwashisnake":1168,"cojna":1168,"methane":1161,"kmatsunaga":1159,"Respect2D":1155,"tatuyan":1147,"nel215":1139,"roxion1377":1139,"gamelove765":1133,"rabbit_TR":1132,"majiang":1128,"nyama":1128,"garnacha":1125,"flour4445":1125,"ishikado":1123,"numa":1123,"hiro116s":1111,"nanikaka":1109,"Vetteru":1108,"hoshi524":1108,"purple928":1108,"UminchuR":1107,"passcut2000":1103,"sekiye":1103,"technetium28":1098,"cls0001011":1095,"phyllo":1095,"iwashi31":1092,"tkmhsy":1092,"na_o_s":1091,"tomoya":1091,"yuta1024":1089,"jasy":1088,"Glen_S":1088,"jimon":1081,"lawliet3110":1079,"atukiomura":1076,"chronotable":1075,"igaxx":1075,"hogeover30":1074,"calc":1073,"togatoga":1068,"lay20114":1067,"otaks21":1065,"aizu1210062":1062,"goryudyuma":1061,"eitaho":1060,"yokit9":1060,"kei":1060,"xenophobia":1060,"Hagentern":1059,"mitsuchie":1058,"dussel":1058,"osak":1056,"a5ua":1051,"mkiken":1051,"hakomo":1051,"suigingin":1046,"kkk":1043,"hotpepsi":1043,"Johniel":1040,"yuki2006":1039,"colun":1039,"s1200008":1038,"spica314":1036,"solorab":1035,"takuk":1031,"sh19910711":1031,"nwin":1029,"donkey":1029,"nisshy":1029,"damekamo":1028,"capythm":1028,"sasa0824":1024,"mukku":1021,"mas":1021,"mizo0203":1021,"Cubic":1018,"tkzw_21":1017,"Fuh":1013,"biochemfan":1012,"warm4C0":1011,"moc":-100,"yaz":-100,"Rainin":-100,"okumin":-100,"xhae":-100,"ioryz":-100,"kituneonechan":-100,"Yazaten":-100,"udondon":-100,"komiya":-100,"winjii":-100,"nikollson":-100,"notogawa":-100,"Juyi":-100,"yuxxxx":-100,"nolimbre":-100,"mino":-100,"mayumini":-100,"kitayuta":-100,"almizaar":-100,"kinkin":-100,"rkx1209":-100,"kamitsutoshi":-100,"yoshikyoto":-100,"SGI":-100,"cormoran":-100,"liniku":-100,"acguy":-100,"paruki":-100,"trpkt1001":-100,"sessoh":-100,"tibakf27":-100,"nankotsu230":-100,"nox":-100,"threepipes_s":-100,"median0816":-100,"dreamoon":-100,"ctyl":-100,"simanman":-100,"tnoda":-100,"kakira":-100,"fujiyama":-100,"papepi":-100,"kenkoooo":-100,"Isurugieri":-100,"cloxe365":-100,"naoki":-100,"hetare09":-100,"rabbitfoot":-100,"ynq1242":-100,"amano":-100,"n_knuu":-100,"kagamiz":-100,"scor":-100,"ZUK":-100,"ryunosuke":-100,"shimomire":-100,"bugtori":-100,"kenimo":-100,"tomoki":-100,"shisyamo1192":-100,"orisano":-100,"uoo38":-100,"tshita":-100,"material":-100,"airis":-100,"spade630":-100,"ttsuki":-100,"fujisu":-100,"hiking":-100,"taktah":-100,"rikku":-100,"tainohimono":-100,"raven38":-100,"zakuro9715":-100,"peria":-100,"dolphinigle":-100,"BGSC":-100,"ne210064":-100,"wshunn":-100,"imulan":-100,"tokusin":-100,"nota":-100,"ogiekako":-100,"dismob":-100,"ainta":-100,"chir":-100,"dragonex":-100,"queue":-100,"kazh98":-100,"nyon":-100,"takoshi":-100,"knowl":-100,"ytwtnb":-100,"uzuki008":-100,"yappy":-100,"Allen":-100,"zeosutt":-100,"agekutar":-100,"rmn_31415":-200,"pekoong":-200,"hanazuki":-200,"kaiy":-200,"lune":-200,"ixmel_rd":-200,"phero":-200,"sumoooru":-200,"takepan":-200,"goto":-200,"rabot":-200,"junonon":-200,"ik11235":-200,"gahou":-200,"treeone":-200,"haraduka":-200,"minorin":-200,"flowlight":-200,"yasuyuky":-200,"fetburner":-200,"tanunu":-200,"zero0yumechi":-200,"cecet":-200,"sndtkrh":-200,"a3636tako":-200,"Gobi":-200,"mo2mo268":-200,"kiki33":-200,"hyas":-200,"selpo":-200,"ddshigure":-200,"escale_kobe":-200,"taksz":-200,"patahene":-200,"xrekkusu":-200,"wotsushi":-200,"emon":-200,"natrium":-200,"T1610":-200,"TangentDay":-200,"base64":-200,"hogekura":-200,"Ktya_59":-200,"itchyny":-200,"lambdataro":-200,"oigami":-200,"battamon":-200,"tah":-200,"novemura":-200,"square1001":-200,"takopoppo":-200,"lrmystp":-200,"yone64":-200,"drken":-200,"daiota":-200,"vain0":-200,"tnkt37":-200,"wanimaru47":-200,"reanisz":-200,"yakk512":-200,"cryspharos":-200,"ikeha":-200,"puyopop":-200,"natsuru":-200,"natsuki":-200,"Doju":-200,"tanutarou":-200,"k3kaimu":-200,"eagletmt":-200,"kohei0418":-200,"maatakamii228":-200,"touyou":-200,"omochana2":-200,"iseekautos":-200,"hitting1024":-200,"tochukaso":-200,"gecko655":-200,"nickle":-200,"wass80":-200,"plat":-200,"t8m8":-200,"murooka":-200,"zaiko":-200,"chuka231":-200,"shinshin":-200,"brly":-200,"palpal":-200,"shouyu":-200,"deflat":-200,"siotouto":-200,"tsuburin":-200,"m0ch12uk1_dango":-200,"maro":-200,"femto16":-200,"oyas":-200,"nyama859":-200,"yuiop":-200,"uji52":-200,"cherry7kurai24":-200,"Iselix":-200,"tetsuma":-200,"Ashurnasirpal":-200,"uriku":-200,"akouryy":-200,"WahrGrowth":-200,"berlysia":-200,"naoya_t":-200,"lan":-200,"saharan":-200,"purp1e928":-200,"chigichan24":-200,"yabuuuuu":-200,"KeiyaSakabe":-200,"kyos1704":-200,"peradfn1126":-300,"lanuvas":-300,"katakata":-300,"ameolp":-300,"diginatu":-300,"vict":-300,"matatabity":-300,"kouki1223":-300,"renkonuma":-300,"rydotyosh":-300,"jango":-300,"prpr":-300,"Lindan":-300,"cony0328":-300,"kiseichu":-300,"hamayan":-300,"longbiau":-300,"komogkomog":-300,"b158b":-300,"nisenabe":-300,"elzzup":-300,"soupe":-300,"khibino":-300,"amaryllis":-300,"koten_under":-300,"org2501":-300,"primenumber":-300,"thinca":-300,"ty70":-300,"kielnow":-300,"kikeroga":-300,"kagemiku":-300,"akahana":-300,"uranus":-300,"doysid":-300,"ophelia":-300,"johnnyhibiki":-300,"matsu7874":-300,"thorikawa":-300,"poxoq":-300,"m_buyoh":-300,"MOBIUSi":-300,"ir5":-300,"NSTomoS":-300,"yukitohj":-300,"keitaro9ml":-300,"shiratty8":-300,"yu3mars":-300,"sorao":-300,"smallgate":-300,"mephy":-300,"poppo":-300,"C01L":-300,"Azathoth":-300,"shinike":-300,"qrrakakh":-300,"ykl08":-300,"LazyMii":-300,"erukiti2":-300,"s1180161":-300,"shouta":-300,"negativeb":-300,"wakamoly":-300,"toshif":-300,"sota":-300,"gyuuto":-300,"ganatcs":-300,"winger":-300,"afterCmidday":-300,"Kevinrobot34":-300,"define0314":-300,"ksla":-300,"fmhr":-300,"hiromi_ayase":-300,"tookunn":-300,"tom_of_death":-300,"joisino":-300,"ebamasa":-300,"yuma000":-300,"HeK7wnhs0":-300,"fof":-300,"atton":-300,"Min_25":-300,"stone725":-300,"Iceman0":-300,"nahcnuj":-300,"puyokawa":-300,"staka":-300,"miya":-300,"piyoko212":-300,"cookies":-300,"sugi2358":-300,"QtaroKujo":-300,"otama_jaccy":-300,"takatano":-300,"hotoku":-300,"pocarist":-300,"yokabb":-300,"akino":-300,"monman53":-300,"musharna000":-300,"kjfakjfks":-300,"alotofwe":-300,"nkmrtmnr":-300,"holyakolonu":-300,"Tenpa0201":-300,"wapiko":-300,"kaneda":-300,"lanevok":-300,"takamoto":-300,"orpheus":-300,"keny30827":-300,"Tatsuno":-300,"taketake0609":-300,"konipu":-300,"bobuhiro11":-300,"kyontan":-300,"matsu4512":-300,"Nekomimimi":-300,"nearwisteria":-300,"tarako":-300,"altema":-300,"brown2nvb":-300,"koyahi":-300,"moheiji":-300,"ustimaw":-300,"jin_matakich":-300,"waidotto":-300,"KUBO":-300,"naru":-300,"walkre":-300,"tsuneo":-300,"qnighy":-400,"todo314":-400,"utisam":-400,"MurATa25":-400,"kid_ut":-400,"kakkun61":-400,"arrows":-400,"otofu":-400,"skeletont":-400,"nogami":-400,"exKAZUu":-400,"aosuka":-400,"misolmiso":-400,"shogo82148":-400,"nekonyaso_":-400,"lovablepleiad":-400,"y331":-400,"kriii":-400,"tm8st":-400,"ukikagi":-400,"R2D2S2":-400,"hozum":-400,"mimizu":-400,"yingtai":-400,"stoikheia":-400,"ryohei":-400,"asterism":-400,"Marimoiro":-400,"smiken":-400,"jxuaqxwd":-400,"Arctic_Panther":-400,"yosss":-400,"tsujino":-400,"fucktheworld":-400,"yu_i9":-400,"ytsiden":-400,"Sei":-400,"muupan":-400,"hayashiya_ten":-400,"admjgptw1357":-400,"t_hrhs":-400,"nullmineral":-400,"hota":-400,"saku":-400,"okaoka":-400,"Tia9996":-400,"mamonbo":-400,"kobori":-400,"lubyna":-400,"kivantium":-400,"mds_boy":-400,"lethe2211":-400,"ryogo108":-400,"tibimosu":-400,"polequoll":-400,"tokichie":-400,"tom94826":-400,"taruta0811":-400,"apple_juice":-400,"Kuni88":-400,"tayama0324":-400,"ysd":-400,"tomoasleep":-400,"zhangbjb":-400,"fuzuiR":-400,"yuki681":-400,"zaapainfoz":-400,"swingby":-400,"kou":-400,"mikemike":-400,"fine":-400,"Ueddy":-400,"commy":-400,"tokoromaru":-400,"miki1123":-400,"ryo_kun":-400,"garugoru45":-400,"tatt61880":-400,"tsuzu":-400,"amyu47":-400,"deka0106":-400,"ponkotuy":-400,"kotamanegi":-400,"frkw":-400,"yupotown":-400,"iica":-400,"yurahuna":-400,"accelation":-400,"haru":-400,"sigma":-400,"tatsuyafw":-400,"gmanipulator":-400,"tekito":-400,"ark012345":-400,"takisekazuki":-400,"crakac":-400,"kyubuns":-400,"romk":-400,"spin13":-400,"sujin2010":-400,"tea_leaf":-400,"goading":-400,"jack":-400,"yousack728":-400,"eulerdora":-400,"gavotte":-400,"spinical":-400,"xelmeph":-400,"iraytno":-400,"ish_774":-400,"ymduu":-400,"TobiasGSmollett":-400,"miki16g":-400,"unsre":-400,"k_mizuto":-400,"hanada009":-400,"parroty":-400,"Leko":-400,"npz35":-400,"abesy8688":-400,"kazunetakahashi":-400,"dango_colonel":-400,"raii":-400,"YujiSoftware":-400,"kurikazu":-400,"nonamea774":-400,"cafelate911":-400,"sako0384":-400,"akovski":-400,"pedish":-400,"seagull_kamome":-400,"seiyab":-400,"creatorstree":-400,"y42sora":-400,"arukuka":-400,"frederica":-400,"gamera416":-400,"surusuto":-400,"isa_rentacs":-400,"i4da":-400,"xyz":-400,"hongrock":-400,"pkMZ75105":-400,"tazoe":-400,"ee07030":-400,"Nakamine":-400,"oduk":-400,"wfalps":-400,"nyanp":-400,"themoai34":-400,"nida_001":-400,"ha1f":-400,"sabottenda":-400,"nagana":-400,"yuhoyo":-400,"Flandrome":-400,"sters":-400,"hak7a3":-400,"rigibun":-400,"re4k":-400,"michisu":-400,"at_kanon":-400,"TeamCraftworks":-400,"sotetsuk":-400,"nocorupe_ast":-400,"tomtan":-400,"kurisutankun":-400,"sntea":-400,"sash":-400,"M_Saito":-400,"tama":-400,"Ry0u_":-400,"domyojikarin":-400,"Etoile_VI":-400,"mellotron":-400,"haruki57":-400,"masu0912":-400,"lttaltta":-400,"nojima":-400,"rhx":-400,"hakoai":-400,"cocodrips":-400,"StoneDot":-400,"takeru_m":-400,"paralleltree":-400,"rubberyuzu":-400,"moratorium08":-400,"tsubu":-400,"itiut":-400,"iehn":-400,"tsmasa":-400,"chiguri":-400,"zephyr":-400,"omochibuster":-400,"aika_djmax":-400,"codek":-400,"yusui":-400,"DUS":-500,"xr0038":-500,"kuzumin":-500,"kazsw":-500,"Ryui":-500,"cminus2":-500,"wtnk0812":-500,"dolpen":-500,"whitebell":-500,"hawksin":-500,"syamn":-500,"Suichi":-500,"uv_cut":-500,"N11001001":-500,"norahiko":-500,"hamko":-500,"andriod_kazu":-500,"uduki845":-500,"motxx":-500,"bowwowforeach":-500,"dorpi":-500,"wataken44":-500,"teru0016":-500,"ugwis":-500,"mcq":-500,"elkurin":-500,"Nariyoshi_Chida":-500,"harumeki":-500,"mak_ac":-500,"ngswt":-500,"himkt":-500,"lambdasawa":-500,"iakasT":-500,"at_akada":-500,"dokan":-500,"cucmberium":-500,"Toro":-500,"yus_iri":-500,"zepp":-500,"hayamari":-500,"taskie":-500,"daimatz":-500,"rook0809":-500,"tsuday":-500,"nishimura1980":-500,"takkaw":-500,"kazuyayasuda":-500,"kokih":-500,"akisute3":-500,"haruneko24":-500,"kroton":-500,"Nokotan":-500,"E869120":-500,"facehospitality":-500,"hunbaba":-500,"rexpit":-500,"yinuh":-500,"atsuhira":-500,"ahen":-500,"k_coffee":-500,"aramaki":-500,"kazu19":-500,"destroist":-500,"nejiko96":-500,"sakai":-500,"Tom1031":-500,"asdf1234":-500,"rysk":-500,"tspcx":-500,"yak_ex":-500,"shnya":-500,"pasta":-500,"n2_":-500,"amiq":-500,"atgw":-500,"kutsutama":-500,"mkjiro":-500,"existy":-500,"jkojm23":-500,"universato":-500,"ray45422":-500,"subarukun":-500,"osakanasan":-500,"canon4444":-500,"coricozizi":-500,"taijin":-500,"shuhei23":-500,"kosakkun0918":-500,"ringoh72":-500,"Suibaka":-500,"tekk":-500,"ryo_kun101":-500,"yana87":-500,"yugamiakira":-500,"airwalker00":-500,"jprekz":-500,"toshihoge":-500,"yomosi":-500,"kkaneko":-500,"kasimatatomoya":-500,"kurenaif":-500,"CrazyBBB":-500,"qwefgnm":-500,"IJMP320":-500,"sigwin":-500,"amusan":-500,"godai0519":-500,"s5412039":-500,"tak":-500,"theoldmoon0602":-500,"well_defined":-500,"achax0511":-500,"parfait":-500,"Soultama":-500,"urasa":-500,"kkrtjnj3829":-500,"tanitanin":-500,"ymis":-500,"sat0da":-500,"sejimhp":-500,"c2de6320":-500,"tkw_tech":-500,"hbk":-500,"linoal13f":-500,"momen06":-500,"saytakaPC":-500,"syanatan":-500,"nogitsune413":-500,"rhenium":-500,"maze1230":-500,"fushime2":-500,"hnagamin":-500,"soimort":-500,"meg73":-500,"suga":-500,"Bnkaki":-500,"comocomo":-500,"ngsw_taro":-500,"Akeru":-500,"alnicomag":-500,"NekoMiMi":-500,"D_Rascal":-500,"kiripon":-500,"miyajiro":-500,"data9824":-500,"rollman":-500,"cainekanak":-500,"ottu":-500,"userid22113":-500,"laco0416":-500,"spark6251":-500,"consent27":-500,"grayzer":-500,"gere":-500,"Beln":-500,"purple_jwl":-500,"kyave3":-500,"nemupm":-500,"akino2012":-500,"nerimadaikon":-500,"aizukikoh":-500,"conchan_akita":-500,"choro3":-500,"mahsan84":-500,"wkwk":-500,"PIandS":-500,"enoz_jp":-500,"okashoi":-500,"s171047":-500,"primrose":-500,"okamada":-500,"rev84":-500,"makruk2000":-500,"pura":-500,"batchunag":-500,"assy":-500,"Kt_Sz":-500,"soiya":-500,"yyi90":-500,"nes_in_it":-500,"warahiko":-500,"sonnabakana":-500,"plasmaeffect":-500,"fiyle":-500,"peryaudo":-500,"koki8514":-500,"xyz600":-500,"charcoal_man":-500,"tattii":-500,"kurome":-500,"yuuki3655":-500,"river_sider":-500,"aaa":-500,"cp0n":-500,"quiye":-500,"s_miyoshi":-500,"XzA_2123":-500,"Andrew":-500,"Tachiken":-500,"nised":-500,"mecha_g3":-500,"kagasan":-500,"tyochiai":-500,"daijiken":-500,"sanretu":-500,"tanukitune":-500,"Hoi_koro":-500,"hiyakashi":-500,"kametaso":-500,"yasu89":-500,"adf2015_short7":-500,"redoily":-500,"shokupan":-500,"nikeeshi":-500,"cond":-500,"sasaki":-500,"eigh8_t":-500,"aitti":-500,"holeguma":-500,"makkumax":-500,"darselle":-500,"Hiromi_Kai":-500,};

var rating_version = "ARC053";
var updated_date = "2016.05.14";
var atcoder_custom_standings_version = "0.15";

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
            '<span ' + (enable_rating_color ? 'class="' + get_color(item.user_screen_name) : "") + '">' + 
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
    if(page_size < 1 || isNaN(page_size)){
      console.log('保存された page_size の値が不正です。 page_size = 50 に初期化します。')
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
      'ユーザ名表示方式' + 
      '</label>' +
      '<select class="form-control " id="selbox_display_name" style="width:170px">' + 
      '<option value=0 id="display_type_0">ユーザ名</option>' +
      '<option value=1 id="display_type_1">AtCoderID</option>' +
      '<option value=2 id="display_type_2">ユーザ名 / AtCoderID</option>' +
      '<option value=3 id="display_type_3">AtCoderID / ユーザ名</option>' +
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
  
  //page
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
      page_size = Number( $('#selbox_pagesize option:selected').val() );
      GM_setValue('GM_page_size', page_size);
      location.reload();
    });
    return selecter;
  })();
  
  //my standing and scroll link
  var tooltip_scroll_to_my_standing = (function(){
    var div_obj = $('<div style="display:table-cell !important; padding:10px; padding-left:10px;"></div>');
    div_obj.append( $('<a id="rank_navi" style="cursor: pointer;">現在順位 : ' + $(".standings-me > td.standings-rank").text() + '位</a>').click(scroll_to_my_standing) );
    return div_obj;
  })();

  //reloading button
  var tooltip_reload_standings = (function(){
    var div_obj = $('<div style="display:table-cell !important; padding:10px; padding-left:10px;"></div>');
    div_obj.append( $('<a id="reload_standings_navi" style="cursor: pointer;">🔃順位表を更新</a>').click(reload_standings) );
    return div_obj;
  })();
  
  //auto reloading
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
  
  var tooltip_modify_table_header = (function(){
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="enable_modify_table_header">問題名のリンク先を問題ページへ</label></div>');
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
    var div_obj = $('<div class="checkbox" style="display:table-cell !important; padding:10px; padding-left:30px;"><label><input type="checkbox" id="emphasize_friend">Friendを強調表示</label></div>');
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
      page_pos = Math.floor(my_rank/page_size);   //自分のいるページ
      generate_page_footer();
    }

    //順位表を更新
    refresh_rank_table();
    
    if(my_user_id !== 0){
      $('a#rank_navi').text( '現在順位 : ' + $(".standings-me > td.standings-rank").text() + '位' );
    }
    
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
	var rating_text = $('<span></span>').css('font-style','italic').css('color','grey').text("rating : " + rating_version);

	var obj = $('<div id="AtCoderCustomStandings_info"></div>').append(acs_link).append('<br>').append(ver_info).append('<br>').append(rating_text);
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
