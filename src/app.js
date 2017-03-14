import * as util from './util.js';
import AppSettings from './appSettings.js';
import FriendsList from './friendsList.js';
import ContestData from './contestData.js';
import Stats from './stats.js';
import Controll from './controll.js';
import Standings from './standings.js';
import Pager from './pager.js';

export default class AtCoderCustomStandings extends React.Component {
  constructor(){
    super();
    this.state = {};
    this.state.settings  = new AppSettings();
    this.state.friends   = new FriendsList();

    util.get_standings( s => {
      this.standings = s;
    } , true);

    this.state.contest  = new ContestData();

    this.state.filtered_standings = this.get_filtered_standings();
    this.state.currentPage = 1; //zero-indexed
    this.state.totalPage   = Math.floor( (this.state.filtered_standings.length + this.state.settings.page_size - 1) / this.state.settings.page_size );

    this.get_filtered_standings.bind(this);
    this.get_filtered_standings_to_render.bind(this);
    this.update_standings.bind(this);
  }

  update_standings(){
    util.get_standings( s => {
      this.standings = s;
    } , false);
  }

  get_filtered_standings(){
    return this.standings.filter( row => {
      if(this.state.settings.filter_by_friends === true){
        if(this.state.friends.is_friend( row.user_screen_name) === false){
          return false;
        }
      }
      if(this.state.settings.filter_by_country !== false){
        if( row.user_screen_name !== this.state.settings.filter_by_country ){
          return false;
        }
      }
      if(this.state.settings.filter_by_rating !== false){
        // rating filter function
        // row.rating
      }
      return true;
    } );
  }

  get_filtered_standings_to_render(){
    const page_begin = this.state.settings.page_size * this.state.currentPage;
    const page_end   = this.state.settings.page_size * (this.state.currentPage+1);
    let result = [];
    for(let i=page_begin; i<page_end && i<this.state.filtered_standings.length; i++){
      result.push( this.state.filtered_standings[i] );
    }
    return result;
  }

  render(){
    let s = this.get_filtered_standings_to_render();
    let components = (
      <div>
        <Controll />
        <Standings standings={s} taskData={this.state.contest.tasks} />
        <Pager current={this.state.currentPage} total={this.state.totalPage}
               onClickFunc={ (e) => {
                 const page = Number( e.target.getAttribute('data-page') );
                 console.log( "page button clicked : ", page );
                 this.setState( {currentPage : page} );
               } }/>
      </div>
    );
    return components;
  }
}
