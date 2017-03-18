export default class AppSettings{
  constructor( load ){
    //options
    this.highlightFriends   = true;
    this.disableRatingColor = false;
    this.displayNameStyle   = "user_screen_name";
    this.pageSize           = 50;
    this.showNationalFlag   = true;

    this.filterCountry    = null;
    this.filterRating     = new Set([1,2,3,4,5,6,7,8,9]);

    if(load === true) this.load();

    //reset temporary options
    this.filterByFriends = false;
    this.filterByCountry = false;
    this.filterByRating  = false;
    this.filterByName    = false;
    this.filterName      = "";

    this.sortingEnabled = false;
    // "rank", "user_screen_name", "rating", "country", "competitions", "task{i}"
    this.sortingKey     = "rank";
    this.sortingOrder   = "ascending";

    this.load.bind(this);
    this.save.bind(this);
  }

  load(){
    //load
    try{
        const settings = JSON.parse( GM_getValue('settings', '{}') );
        Object.assign( this, settings);
        if( this.filterRating === undefined) this.filterRating = new Set([1,2,3,4,5,6,7,8,9]);
        else this.filterRating = new Set(this.filterRating);

        console.log("loaded : settings");
        console.log(this);
    }catch(e){
        console.log("faild to load settings");
        console.log(e);
    }
  }
  save(){
    //save
    this.filterRating = [...this.filterRating];

    const settings = Object.assign({}, this);
    const str = JSON.stringify( settings );

    this.filterRating = new Set(this.filterRating);

    GM_setValue('settings', str);

    console.log("saved : settings");
    console.log(str);
  }

  isFiltersEnabled(){
    return this.filterByFriends || this.filterByCountry || this.filterByRating || this.filterByName;
  }
}