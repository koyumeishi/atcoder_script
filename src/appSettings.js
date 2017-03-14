export default class AppSettings{
  constructor(){
    //options
    this.highlight_friends = true;
    this.show_rating_color = true;
    this.show_handle_name  = true;
    this.filter_by_friends = false;
    this.filter_by_country = false;
    this.filter_by_rating  = false;
    this.page_size         = 50;

    this.load();
  }

  load(){
    //load
    const settings = JSON.parse( GM_getValue('settings', '{}') );
    if( settings === null ) return;
    if("highlight_friends" in settings) this.highlight_friends = settings.highlight_friends;
    if("show_rating_color" in settings) this.show_rating_color = settings.show_rating_color;
    if("show_handle_name"  in settings) this.show_handle_name  = settings.show_handle_name;
    if("filter_by_friends" in settings) this.filter_by_friends = settings.filter_by_friends;
    if("filter_by_country" in settings) this.filter_by_country = settings.filter_by_country;
    if("filter_by_rating" in settings)  this.filter_by_rating  = settings.filter_by_rating;
    if("page_size" in settings)         this.page_size         = settings.page_size;
  }
  save(){
    //save
    const settings = {
      "highlight_friends" : this.highlight_friends,
      "show_rating_color" : this.show_rating_color,
      "show_handle_name"  : this.show_handle_name,
      "filter_by_friends" : this.filter_by_friends,
      "filter_by_country" : this.filter_by_country,
      "filter_by_rating"  : this.filter_by_rating,
      "page_size"         : this.page_size
    };
    const str = JSON.stringify( settings );
    GM_setValue('settings', str);
  }
}