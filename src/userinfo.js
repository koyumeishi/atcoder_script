class UserInfo{
  constructor(){
    let cookie = {};
    document.cookie.split(/;\s/).forEach( (s) => {
    //"_user_screen_name=koyumeishi; __privilege=contestant; _user_id=11408; _user_name=koyumeishi".split(/;\s/).forEach( (s) => {
      let [key, value] = s.split(/=/);
      cookie[key] = value;
    });

    this.contestant = false;
    if( "__privilege" in cookie && cookie.__privilege === "contestant"){
      this.contestant = true;
      this.user_screen_name = cookie._user_screen_name;
      this.user_id = Number( cookie._user_id );
    }
    console.log(this);
  }
}

const me = new UserInfo();

export default me;
