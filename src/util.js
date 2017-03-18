function getStandings( callback, initialize ){
  const reg = /\s*data:\s(\[.*\]),/;

  if(initialize){
    const scriptText = $("html").find('script[type="text/JavaScript"]').text().split("\n");

    scriptText.forEach( (txt) => {
      const res = reg.exec(txt);
      if(res !== null){
        const newStandings = JSON.parse(res[1]);
        callback( newStandings );
      }
    });
  }else{
    $.ajax( {url: "./standings"} ).done( (html) => {
      const scriptText = $(html).find('script[type="text/JavaScript"]').text().split("\n");
      scriptText.forEach( (txt) => {
        const res = reg.exec(txt);
        if(res !== null){
          console.log( "successfully got new standings : ", res[1] );
          const newStandings = JSON.parse(res[1]);
          callback( newStandings );
        }
      });
    });
  }
}

function getSortingFunction( key ){
  // task{i}
  if( key.slice(0,4) == "task" ){
    let id = Number( key.slice(4) );
    return (l,r) => {
      if( l.tasks[id].score === undefined && r.tasks[id].score === undefined ) return 0;
      if( l.tasks[id].score === undefined ) return -1;
      if( r.tasks[id].score === undefined ) return 1;
      if( l.tasks[id].score !== r.tasks[id].score ){
        return Number(l.tasks[id].score) < Number(r.tasks[id].score) ? -1 : 1;
      }else{
        if( l.tasks[id].penalty !== r.tasks[id].penalty ){
          return Number(l.tasks[id].penalty) > Number(r.tasks[id].penalty) ? -1 : 1;
        }else{
          return 0;
        }
      }
    };
  }
  if( key == "user_screen_name" ){
    return (l,r) =>{
      if( l[key].toLowerCase() !== r[key].toLowerCase() ){
        return l[key].toLowerCase() < r[key].toLowerCase() ? -1 : 1;
      }else{
        return 0;
      }
    };
  }

  if( key == "time" ){
    return (l,r) =>{
      if( l.score !== r.score ) return Number(l.score) > Number(r.score) ? -1 : 1;
      else if(l.elapsed_time !== r.elapsed_time) return Number(l.elapsed_time) < Number(r.elapsed_time) ? -1 : 1;
      return 0;
    };
  }

  return (l,r) => {
    if( l[key] !== r[key] ){
      return (l[key]) < (r[key]) ? -1 : 1;
    }else{
      return 0;
    }
  };
}

class Rating{
  constructor(){
    //[lb, ub)
    this.lb = [
      -1, 0,   1, 400,  800, 1200, 1600, 2000, 2400, 2800
    ];
    this.ub = [
       0, 1, 400, 800, 1200, 1600, 2000, 2400, 2800, 5000
    ];

    this.color = [
      "rgba(192,0,192,   0.5)", // "#C000C0",
      "rgba(0,0,0,       0.5)", // "#000000",
      "rgba(128,128,128, 0.5)", // "#808080",
      "rgba(128,64,0,    0.5)", // "#804000",
      "rgba(0,128,0,     0.5)", // "#008000",
      "rgba(0,192,192,   0.5)", // "#00C0C0",
      "rgba(0,0,255,     0.5)", // "#0000FF",
      "rgba(192,192,0,   0.5)", // "#C0C000",
      "rgba(255,128,0,   0.5)", // "#FF8000",
      "rgba(255,0,0,     0.5)"  // "#FF0000"
    ];

    this.colorOriginal = [
      "#C000C0",
      "#000000",
      "#808080",
      "#804000",
      "#008000",
      "#00C0C0",
      "#0000FF",
      "#C0C000",
      "#FF8000",
      "#FF0000"
    ];

    this.userColor = [
      "user-admin", // "#C000C0",
      "user-unrated", // "#000000",
      "user-gray", // "#808080",
      "user-brown", // "#804000",
      "user-green", // "#008000",
      "user-cyan", // "#00C0C0",
      "user-blue", // "#0000FF",
      "user-yellow", // "#C0C000",
      "user-orange", // "#FF8000",
      "user-red"  // "#FF0000"
    ];
  }

  getLevel(rating){
    for(let level=0; level<this.color.length; level++){
      if( this.lb[level] <= rating && rating < this.ub[level]){
        return level;
      }
    }
    return 0;
  }

  getColor(rating){
    return this.color[ this.getLevel(rating) ];
  }

  getColorOriginal(rating){
    return this.colorOriginal[ this.getLevel(rating) ];
  }

  generateColoredName( user_screen_name, rating ){
    return (<a href={`https://atcoder.jp/user/${user_screen_name}`}
               className={`username ${this.userColor[ this.getLevel(rating) ]}`}
               target="_blank"
               key={`user-${user_screen_name}`}>{user_screen_name}
            </a>);
  }
}

const rating = new Rating();

const countries = {
  "AF":"Afghanistan","AL":"Albania","DZ":"Algeria","AD":"Andorra","AO":"Angola","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BR":"Brazil","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CO":"Colombia","KM":"Comoros","CK":"Cook","CR":"Costa Rica","HR":"Croatia","CU":"Cuba","CY":"Cyprus","CZ":"Czech Republic","CI":"Côte d\'Ivoire","CD":"Democratic Republic of the Congo","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FJ":"Fiji","FI":"Finland","MK":"Former Yugoslav Republic of Macedonia","FR":"France","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GR":"Greece","GD":"Grenada","GT":"Guatemala","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HK":"Hong Kong","HT":"Haiti","HN":"Honduras","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran","IQ":"Iraq","IE":"Ireland","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KW":"Kuwait","KG":"Kyrgyz Republic","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall","MR":"Mauritania","MU":"Mauritius","MX":"Mexico","FM":"Micronesia","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestine","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PL":"Poland","PT":"Portugal","QA":"Qatar","CG":"Republic of Congo","KR":"Republic of Korea","ZA":"Republic of South Africa","RO":"Romania","RU":"Russia","RW":"Rwanda","KN":"Saint Christopher and Nevis","LC":"Saint Lucia","VC":"Saint Vincent","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SK":"Slovakia","SI":"Slovenia","SB":"Solomon","SO":"Somalia","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syria","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States of America","XX":"Unknown","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VA":"Vatican","VE":"Venezuela","VN":"Viet Nam","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"
};

export {getStandings, getSortingFunction, rating, countries};