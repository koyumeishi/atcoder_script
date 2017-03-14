export default class FriendsList{
  constructor(){
    this.friends = new Set();
    this.load();
  }

  load(){
    //load
    //friend list object (old version)
    let friends_old = JSON.parse( GM_getValue('GM_friend_list', 'null') );
    if(friends_old !== null){
      for(let handle in friends_old){
        this.friends.add(handle);
      }
      GM_deleteValue( 'GM_friend_list' );
      this.save();
    }
    
    //friend list array (new version)
    let friends = JSON.parse( GM_getValue('friends_list', 'null') );
    if(friends !== null){
      friends.forEach( handle => this.friends.add(handle) );
    }
  }

  save(){
    let friends_list = new Array();
    this.friends.forEach( handle => friends_list.push(handle) );
    let str = JSON.stringify(this.friends_list);

    //save
    GM_setValue('friends_list', str);
  }

  add(handle){
    this.friends.add( handle );
    this.save();
  }

  remove(handle){
    this.friends.delete( handle );
    this.save();
  }

  is_friend(handle){
    return this.friends.has( handle );
  }
}