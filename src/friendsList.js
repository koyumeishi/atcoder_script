export default class FriendsList{
  constructor( load ){
    this.friends = new Set();
    if(load === true) this.load();

    //this.add("camypaper");
  }

  load(){
    //load
    //friend list object (old version)
    let friendsOld = JSON.parse( GM_getValue('GM_friend_list', 'null') );
    if(friendsOld !== null){
      this.friends = new Set( Object.keys(friendsOld) );
      GM_deleteValue( 'GM_friend_list' );
      this.save();
    }
    
    //friend list array (new version)
    this.friends = new Set(JSON.parse( GM_getValue('friendsList', '[]') ));

    console.log("loaded : friends list");
    console.log(this.friends);
  }

  save(){
    let str = JSON.stringify([...this.friends]);
    //save
    GM_setValue('friendsList', str);

    console.log("saved : friends list");
    console.log(str);
  }

  //[names...]
  add(handle){
    handle.forEach( (name) => this.friends.add(name) );
    this.save();
  }

  remove(handle){
    handle.forEach( (name) => this.friends.delete(name) );
    this.save();
  }


  isFriend(handle){
    return this.friends.has( handle );
  }

  getList(){
    return [...this.friends];
  }
}