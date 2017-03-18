import Modal from './modal.js'
import AppSettings from './appSettings.js'
class SettingsContent extends React.Component{
  constructor(props){
    super(props);
    this.update.bind(this);
    this.generateForm.bind(this);
    this.generateFriendsListForm.bind(this);
  }

  update( option ){
    let newSettings = Object.assign(new AppSettings(), this.props.settings);
    for(let param in option){
      newSettings[param] = option[param];
    }
    console.log( option );
    this.props.settingsUpdateFunc( newSettings );
  }

  generateForm( optionName, label ){
    return (
      <div className="atcoder-custom-standings settings-item">
        <label>
          <input checked={this.props.settings[optionName]} type="checkbox" style={{display:"inline"}}
                 onChange={(e)=>{ this.update( { [optionName] : e.target.checked } ) }} />
          <span> {label}</span>
        </label>
      </div>
    );
  }

  generateFriendsListForm(){
    const friends = this.props.friends.getList().map( (name) => {
      return (<option value={name} key={name}>{name}</option>);
    });
    return(
      <div className="atcoder-custom-standings settings-item">
        <p>Friends List</p>
        <div className="atcoder-custom-standings settings-item">
          <input ref="addFriendForm" type="text" style={{display:"block"}}
                 onKeyDown={(e)=>{
                  if( e.key !== 'Enter' ) return;
                  const element = this.refs.addFriendForm;
                  if( element.value !== "" ) this.props.friendsUpdateFunc( element.value.split(" "), true );
                  element.value = "";
                  this.forceUpdate();
                 }}/>
          <button type="button" style={{display:"block"}} onClick={ ()=>{
            const element = this.refs.addFriendForm;
            if( element.value !== "" ) this.props.friendsUpdateFunc( [element.value], true );
            element.value = "";
            this.forceUpdate();
          }}>
            Add Friend
          </button>
        </div>
        <div className="atcoder-custom-standings settings-item">
          <select ref="friendsListForm" multiple size="10" style={{display:"block"}}>
            {friends}
          </select>
          <button type="button" style={{display:"block"}} onClick={ ()=>{
            const form = this.refs.friendsListForm;
            this.props.friendsUpdateFunc( [...form.getElementsByTagName('option')]
              .filter( (e)=>e.selected ).map((e)=>e.value), false );
            this.forceUpdate();
          }}>
            Remove Friends
          </button>
        </div>
      </div>
    );
  }

  render(){
    const pageSize = (()=>{
      const list = [10,20,50,100,200,300,400,500,1000,5000,10000].map( (val)=>{
        return <option value={val} key={val}>{val}</option>
      });
      return (
        <div className="atcoder-custom-standings settings-item">
          <span>Page Size </span>
          <select defaultValue={this.props.settings.pageSize}
                  onChange={(e)=>{ this.update( { "pageSize" : Number(e.target.value)} ) }}>
            {list}
          </select>
        </div>
      );
    })();

    const displayNameStyle = (
      <div className="atcoder-custom-standings settings-item">
        <span>Display Name Style </span>
        <select defaultValue={this.props.settings.displayNameStyle}
                onChange={(e)=>{ this.update( { "displayNameStyle" : e.target.value} ) }}>
          <option value="user_screen_name">User ID</option>
          <option value="user_name">User Name</option>
          <option value="user_screen_name_user_name">User ID / User Name</option>
          <option value="user_name_user_screen_name">User Name / User ID</option>
        </select>
      </div>
    );


    return (
      <div style={{padding:"5px"}}>
        {pageSize}
        {displayNameStyle}
        {this.generateForm( "disableRatingColor", "Disable Rating Color")}
        {this.generateForm( "highlightFriends", "Highlight Friends")}
        {this.generateForm( "showNationalFlag", "Show National Flag")}
        <hr/>
        {this.generateFriendsListForm()}
      </div>
    );
  }
}

export default class Settings extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate( nextProps ){
    if( JSON.stringify( Object.assign({}, this.props.settings) ) !== JSON.stringify( Object.assign({}, nextProps.settings) )) return true;
    // if( JSON.stringify( this.props.friends.getList() ) !== JSON.stringify( nextProps.friends.getList() ) ) return true;
    return true;
  }

  render(){
    let button = (
      <a href="#">
        <i className="material-icons md-dark">settings</i>
        Settings
      </a>
    );

    return(
      <Modal button={button} title="Settings">
        <SettingsContent
          settings={this.props.settings}
          settingsUpdateFunc={this.props.settingsUpdateFunc}
          friends={this.props.friends}
          friendsUpdateFunc={this.props.friendsUpdateFunc}
        />
      </Modal>
    );
  }
}