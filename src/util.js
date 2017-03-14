function get_standings( callback, initialize ){
  const reg = /\s*data:\s(\[.*\]),/;

  if(initialize){
    const script_text = $("html").find('script[type="text/JavaScript"]').text().split("\n");

    script_text.forEach( (txt) => {
      const res = reg.exec(txt);
      if(res !== null){
        const new_standings = JSON.parse(res[1]);
        callback( new_standings );
      }
    });
  }else{
    $.ajax( {url: "./standings"} ).done( (html) => {
      const script_text = $(html).filter('script[type="text/JavaScript"]').text().split("\n");

      script_text.forEach( (txt) => {
        const res = reg.exec(txt);
        if(res !== null){
          const new_standings = JSON.parse(res[1]);
          callback( new_standings );
        }
      });
    });
  }
}

class Rating{
  constructor(rating){
    this.level = () => {
      if( rating === -1 ) return 0;
      else if( rating === 0 ) return 1;
      else if( rating < 400 ) return 2;
      else if( rating < 800 ) return 3;
      else if( rating < 1200 ) return 4;
      else if( rating < 1600 ) return 5;
      else if( rating < 2000 ) return 6;
      else if( rating < 2400 ) return 7;
      else if( rating < 2800 ) return 8;
      else if( rating < 3200 ) return 9;
      else if( rating < 3600 ) return 10;
      else return 11;
    }();

    this.color = [
      "#C000C0",
      "#000000",
      "#808080",
      "#804000",
      "#008000",
      "#00C0C0",
      "#0000FF",
      "#C0C000",
      "#FF8000",
      "#FF0000",
      "#550000",
      "#FFAAEE"
    ];
  }

  get_color(){

  }
}

export {get_standings};