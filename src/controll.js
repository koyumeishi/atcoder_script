import Stats from './stats.js'
import Filter from './filter.js'
import Settings from './settings.js'
import Sorting from './sorting.js'
import Reloading from './reload.js'
import AppSettings from './appSettings.js';


class FriendsButton extends React.Component {
  constructor(props){
    super(props);
    this.update.bind(this);
  }

  update( option ){
    let newSettings = Object.assign(new AppSettings(), this.props.settings);
    for(let param in option){
      newSettings[param] = option[param];
    }
    this.props.settingsUpdateFunc( newSettings );
  }


  render(){
    const button = (
      <a href="#"
         className={`atcoder-custom-standings ${ this.props.settings.filterByFriends ? "filtering-enabled" : "filtering-disabled"}`}>
        <i className="material-icons">people</i>
        Friends 
      </a>
    );

    return (
      <div className="atcoder-custom-standings controller-button">
        <div onClick={ () => {
          let newSettings = Object.assign(new AppSettings(), this.props.settings);
          newSettings["filterByFriends"] = !this.props.settings.filterByFriends;
          this.props.settingsUpdateFunc( newSettings );
        } }>{button}</div>
      </div>
    );
  }
}

export default class Controll extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let ret = (
      <div style={{display:"grid", gridTemplateRows:"1fr", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr"}}>
        <div style={{gridRow:"1/2", gridColumn:"1/2", padding:"4px"}}>
          <Reloading
            updateFunc={this.props.updateFunc}
          />
        </div>
        <div style={{gridRow:"1/2", gridColumn:"2/3", padding:"4px"}}>
          <FriendsButton
            settings={this.props.settings}
            settingsUpdateFunc={this.props.settingsUpdateFunc}
          />
        </div>
        <div style={{gridRow:"1/2", gridColumn:"3/4", padding:"4px"}}>
          <Filter
            settings={this.props.settings}
            settingsUpdateFunc={this.props.settingsUpdateFunc}
            getActiveCountries={this.props.getActiveCountries}
          />
        </div>
        <div style={{gridRow:"1/2", gridColumn:"4/5", padding:"4px"}}>
          <Sorting
            settings={this.props.settings}
            contest={this.props.contest}
            settingsUpdateFunc={this.props.settingsUpdateFunc}
          />
        </div>
        <div style={{gridRow:"1/2", gridColumn:"5/6", padding:"4px"}}>
          <Stats
            standings={this.props.standings}
            contest={this.props.contest}
          />
        </div>
        <div style={{gridRow:"1/2", gridColumn:"6/7", padding:"4px"}}>
          <Settings
            settings={this.props.settings}
            settingsUpdateFunc={this.props.settingsUpdateFunc}
            friends={this.props.friends}
            friendsUpdateFunc={this.props.friendsUpdateFunc}
          />
        </div>
      </div>
    );

    return ret;
  }
}
