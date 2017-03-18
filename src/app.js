import * as util from './util.js';
import AppSettings from './appSettings.js';
import FriendsList from './friendsList.js';
import ContestData from './contestData.js';
import Stats from './stats.js';
import Controll from './controll.js';
import Standings from './standings.js';
import Pager from './pager.js';
import Me from './userinfo.js';

export default class AtCoderCustomStandings extends React.Component {
  constructor(){
    super();
    this.state = {};
    this.state.settings  = new AppSettings( true );
    this.state.friends   = new FriendsList( true );

    util.getStandings( (s) => {
      this.standings = s;
    } , true);

    this.contest  = new ContestData();

    this.state.filteredStandings = this.getFilteredStandings( this.state.settings );
    this.state.currentPage = 0; //zero-indexed
    this.state.totalPage   = Math.max(1, Math.floor( (this.state.filteredStandings.length + this.state.settings.pageSize - 1) / this.state.settings.pageSize ) );

    this.getFilteredStandings.bind(this);
    this.getFilteredStandingsToRender.bind(this);
    this.updateStandings.bind(this);

    this.updateFriends.bind(this);
    this.updateSettings.bind(this);
  }

  updateSettings( newSettings ){
    newSettings.save();
    this.setState( (prevState) => {
      const newFilteredStandings = this.getFilteredStandings( newSettings );
      const totalPage = Math.max(1, Math.floor( (newFilteredStandings.length + newSettings.pageSize - 1) / newSettings.pageSize ) );
      const currentPage = Math.min(totalPage-1,  prevState.currentPage);

      return {
        settings : newSettings,
        filteredStandings : newFilteredStandings,
        totalPage : totalPage,
        currentPage : currentPage
      };
    });
  }

  updateFriends( handleNames, adding ){
    this.setState( (prevState) => {
      let newFriends = new FriendsList( false );
      newFriends.friends = new Set( prevState.friends.getList() );
      if( adding === true ){
        newFriends.add(handleNames);
      }else if( adding === false ){
        newFriends.remove(handleNames);
      }
      return { friends : newFriends };
    } );
  }

  updateStandings(){
    console.log("started updating");

    util.getStandings( (s) => {
      this.standings = s;
      this.setState( (prevState) => {
        const newFilteredStandings = this.getFilteredStandings( this.state.settings );
        const totalPage = Math.max(1, Math.floor( (newFilteredStandings.length + this.state.settings.pageSize - 1) / this.state.settings.pageSize ) );
        const currentPage = Math.min(totalPage-1,  prevState.currentPage);

        return {
          filteredStandings : newFilteredStandings,
          totalPage : totalPage,
          currentPage : currentPage
        };
      } );
      console.log( "standings updating successfully completed" );
    } , false);
  }


  getFilteredStandings(settings){
    const r = util.rating;
    let nameReg;
    try{
      nameReg = new RegExp( "^" + settings.filterName , "i");
    }catch(e){
      nameReg = new RegExp( "" );
    }
    let fStandings = this.standings.filter( row => {
      if(settings.filterByFriends === true){
        if(this.state.friends.isFriend( row.user_screen_name ) === false &&
           row.user_screen_name !== Me.user_screen_name){
          return false;
        }
      }
      if(settings.filterByCountry === true){
        if( row.country !== settings.filterCountry ){
          return false;
        }
      }
      if(settings.filterByRating === true){
        // rating filter function
        // row.rating
        const level = r.getLevel( row.rating );
        if( settings.filterRating.has(level) === false ){
          return false;
        }
      }
      if(settings.filterByName === true){
        if( nameReg.exec( row.user_screen_name ) === null && nameReg.exec( row.user_name ) === null ){
          return false;
        }
      }
      return true;
    } );

    if( settings.sortingEnabled === true ){
      let f = util.getSortingFunction( settings.sortingKey );
      if( settings.sortingOrder === "ascending") return fStandings.sort( f );
      else return fStandings.sort( (a,b)=>f(a,b)*-1 );
    }else{
      return fStandings;
    }
  }

  getFilteredStandingsToRender(){
    const pageBegin = this.state.settings.pageSize * this.state.currentPage;
    const pageEnd   = this.state.settings.pageSize * (this.state.currentPage+1);
    return this.state.filteredStandings.slice( pageBegin, pageEnd );
  }

  render(){
    const pageMe = (()=>{
      const pos = this.state.filteredStandings.findIndex( (row)=>{return row.user_screen_name === Me.user_screen_name} );
      if( pos === -1 ) return null;
      return Math.floor( pos/this.state.settings.pageSize );
    })();
    let s = this.getFilteredStandingsToRender();
    let components = (
      <div>
        <Controll standings={this.standings}
                  updateFunc={()=>this.updateStandings()}
                  contest={this.contest}
                  settings={this.state.settings}
                  settingsUpdateFunc={ (newSettings)=>{
                    this.updateSettings(newSettings);
                  }}
                  friends={this.state.friends}
                  friendsUpdateFunc={(name, adding)=>this.updateFriends(name,adding)}
                  getActiveCountries={()=>{
                    return [...(new Set( this.standings.map( (e)=>e.country ) ))].sort( (a,b)=> {return util.countries[a] < util.countries[b] ? -1 : 1;} );
                  }}/>
        <Pager current={this.state.currentPage} total={this.state.totalPage}
               me={pageMe}
               onClickFunc={ (e) => {
                 const page = Number( e.target.getAttribute('data-page') );
                 this.setState( {currentPage : page} );
               } }/>
        <Standings standings={s}
                   taskData={this.contest.tasks}
                   contestEnded={this.contest.contestEnded}
                   settings={this.state.settings}
                   friends={this.state.friends}
                   friendsUpdateFunc={(name, adding)=>this.updateFriends(name,adding)}
                   offSet={this.state.currentPage*this.state.settings.pageSize}/>
        <Pager current={this.state.currentPage} total={this.state.totalPage}
               me={pageMe}
               onClickFunc={ (e) => {
                 e.preventDefault();
                 const page = Number( e.target.getAttribute('data-page') );
                 this.setState( {currentPage : page} );
               } }/>
      </div>
    );
    return components;
  }
}
