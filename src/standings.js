import {rating,countries} from './util.js'
import Me from './userinfo.js';

class UserDetails extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    document.getElementById(`user-dropdown-menu-${this.props.row.user_name}`).addEventListener('click', (e)=>{
      e.stopPropagation();
    });
    document.getElementById(`user-dropdown-menu-${this.props.row.user_name}-friend`).addEventListener('click', (e)=>{
      this.props.friendsUpdateFunc( [this.props.row.user_screen_name], !this.props.isFriend);
    });
    document.getElementsByTagName('body')[0].addEventListener('click', this.props.closeFunc, {once:true});
  }

  render(){
    const link = `https://atcoder.jp/user/${this.props.row.user_screen_name}`;
    const submissions = (
      <a href={`/submissions/all?user_screen_name=${this.props.row.user_screen_name}`} target="_blank">
        <i className="material-icons md-18">search</i>
        Submissions
      </a>
    );
    const ratingColor = rating.getColorOriginal(this.props.row.rating);

    const friend = (
      <span className="atcoder-custom-standings cursor-link">
        <i className="material-icons md-18">{this.props.isFriend ? "person_outline" : "person_add"}</i>
        {this.props.isFriend ? "Remove from Friends List" : "Add to Friends List"}
      </span>
    );

    return (
      <div id={`user-dropdown-menu-${this.props.row.user_name}`}
           className="atcoder-custom-standings user-dropdown-menu-box">
           <div className="atcoder-custom-standings user-dropdown-menu">
             <a href={link} className={`username ${this.props.color}`} target="_blank">
               {this.props.row.user_name} / {this.props.row.user_screen_name}
             </a>
           </div>
           <div className="atcoder-custom-standings user-dropdown-menu">
             {submissions}
           </div>
           <div className="atcoder-custom-standings user-dropdown-menu">
             Rating : <span style={{color:ratingColor, fontWeight:"bold"}}>{this.props.row.rating}</span>
           </div>
           <div className="atcoder-custom-standings user-dropdown-menu">
             Country : <img src={`/img/flag/${this.props.row.country}.png`} style={{verticalAlign: "middle", width: "16px", height: "16px"}} />
             {countries[this.props.row.country]}
           </div>
           <div id={`user-dropdown-menu-${this.props.row.user_name}-friend`}
                className="atcoder-custom-standings user-dropdown-menu"
                style={this.props.row.user_screen_name === Me.user_screen_name ? {display:"none"} : {}}>
             {friend}
           </div>
      </div>
    );
  }
}


class Name extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show : false
    };
  }

  shouldComponentUpdate( nextProps, nextState ){
    if( this.props.settings.displayNameStyle !== nextProps.settings.displayNameStyle ) return true;
    if( this.props.settings.disableRatingColor !== nextProps.settings.disableRatingColor ) return true;
    if( this.props.settings.showNationalFlag !== nextProps.settings.showNationalFlag ) return true;
    if( this.state.show !== nextState.show ) return true;
    if( this.props.isFriend !== nextProps.isFriend ) return true;
    return false;
  }

  render(){
    const row = this.props.row;
    const color = this.props.settings.disableRatingColor ? "" : rating.userColor[ rating.getLevel(row.rating) ];

    const displayName = (()=>{
      return {
        user_screen_name : row.user_screen_name,
        user_name : row.user_name,
        user_screen_name_user_name : `${row.user_screen_name} / ${row.user_name}`,
        user_name_user_screen_name : `${row.user_name} / ${row.user_screen_name}`
      }[this.props.settings.displayNameStyle];
    })();

    const countryFlag = this.props.settings.showNationalFlag ? (<img src={`/img/flag/${row.country}.png`} style={{verticalAlign: "middle", width: "16px", height: "16px"}} />) : "";

    const nameOnclick = (e) => {
      this.setState({
        show : !this.state.show
      });
    };

    if( this.state.show === false ){
      return (
        <td className="standings-username" onClick={nameOnclick}>
          {countryFlag}
          {" "}
          {row.rating >= 3200 ? <img src={`/img/icon/crown${row.rating - row.rating%400}.gif`} style={{verticalAlign: "middle"}}/> : null}
          {row.rating >= 3200 ? " " : null}
          <a className={`username ${color}`}>{displayName}</a>
        </td>
      );
    }else{
      return (
        <td className="standings-username" onClick={()=>this.setState({show:false})}>
          {countryFlag}
          {" "}
          {row.rating >= 3200 ? <img src={`/img/icon/crown${row.rating - row.rating%400}.gif`} style={{verticalAlign: "middle"}}/> : null}
          {row.rating >= 3200 ? " " : null}
          <a className={`username ${color}`}>{displayName}</a>
          <UserDetails friendsUpdateFunc={this.props.friendsUpdateFunc}
                       color={color}
                       isFriend={this.props.isFriend}
                       row={row}
                       closeFunc={()=>this.setState({show:false})}/>
        </td>
      );
    }
  }
}

class Task extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate( nextProps ){
    if( JSON.stringify(this.props.task) !== JSON.stringify(nextProps.task) ) return true;
    return false;
  }

  render(){
    const t = this.props.task;
    if( t.extras === true && this.props.me === false ){
      return <td className="center standings-frozen"></td>
    }
    if( t.elapsed_time === undefined ){
      return <td className="center">-</td>
    }
    if( t.score === 0 ){
      return <td className="center standings-wa">({t.failure})</td>
    }
    let penalty = "";
    if(t.failure !== 0){
      penalty = <span className="standings-wa">({t.failure})</span>;
    }

    let submission = this.props.contestEnded ?  <a href={this.props.submissionLink} target="_blank">
                                                  <i className="material-icons md-18 md-dark" style={{verticalAlign:"bottom"}}>search</i>
                                                </a> : "";

    const timeMin = `${Math.floor(t.elapsed_time/60)<10?"0":""}${Math.floor(t.elapsed_time/60)}`;
    const timeSec = `00${Math.floor(t.elapsed_time%60)}`.slice(-2);
    return (
      <td className="center">
        <span className="standings-ac">{t.score/100}</span>{penalty}{submission}
        <span className="atcoder-custom-standings timestamp">{timeMin}:{timeSec}</span>
      </td>
    );
  }
}

class Total extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate( nextProps ){
    const comp = ["elapsed_time", "failure", "penalty", "score"];
    for(const param of comp){
      if( this.props.row[param] !== nextProps.row[param] ) return true;
    }
    return false;
  }

  render(){
    if( this.props.row.elapsed_time === "0" ){
        return <td className="center"><p>-</p></td>;
    }
    let penalty = "";
    if(this.props.row.failure !== "0"){
      penalty = <span className="standings-wa">({this.props.row.failure})</span>;
    }
    const timeMin = `${Math.floor(this.props.row.elapsed_time/60)<10?"0":""}${Math.floor(this.props.row.elapsed_time/60)}`;
    const timeSec = `00${Math.floor(this.props.row.elapsed_time%60)}`.slice(-2);

    const penaltyMin = `${Math.floor(this.props.row.penalty/60)<10?"0":""}${Math.floor(this.props.row.penalty/60)}`;
    const penaltySec = `00${Math.floor(this.props.row.penalty%60)}`.slice(-2);
    return (
      <td className="center">
        <span className="standings-score">{this.props.row.score/100}</span>{penalty}
        <span className="atcoder-custom-standings timestamp">{penaltyMin}:{penaltySec} ({timeMin}:{timeSec})</span>
      </td>
    );
  }
}

/*
 rank
 name
 id
 rating
 country
 tasks[]
 score
 elapsed_time
 penalty
*/
class StandingsRow extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate( nextProps ){
    if( JSON.stringify( Object.assign({}, this.props.settings) ) !== JSON.stringify( Object.assign({}, nextProps.settings) ) ) return true;
    if( JSON.stringify(this.props.row) !== JSON.stringify(nextProps.row) ) return true;
    if( this.props.isFriend !== nextProps.isFriend ) return true;
    if( this.props.filteredRank !== nextProps.filteredRank ) return true;
    if( this.props.contestEnded !== nextProps.contestEnded ) return true;
    return false;
  }

  render(){
    const name = <Name settings={this.props.settings}
                       row={this.props.row}
                       isFriend={this.props.isFriend}
                       friendsUpdateFunc={this.props.friendsUpdateFunc}/>;

    const tasks = this.props.row.tasks.map( (t, i) => {
      return <Task task={t}
                   key={i} 
                   me={Me.contestant === true && this.props.row.user_id === Me.user_id}
                   submissionLink={`./submissions/all?task_screen_name=${this.props.taskData[i].url.slice(7)}&user_screen_name=${this.props.row.user_screen_name}`}
                   contestEnded={this.props.contestEnded}/>;
    });

    const total = <Total row={this.props.row} />;

    let trClass = "";
    if( this.props.isFriend && this.props.settings.highlightFriends === true ) trClass = "standings-friend";
    if( Me.contestant === true && this.props.row.user_id === Me.user_id ) trClass = "standings-me";

    return (
    <tr className={trClass}>
      <td className="standings-rank">
        {this.props.row.rank}{this.props.settings.isFiltersEnabled() || this.props.settings.sortingEnabled ?` (${this.props.filteredRank})`:""}
      </td>
      {name}
      {tasks}
      {total}
    </tr>
    );
  }
}

class StandingsHead extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(){
    return false;
  }
  render(){
    const tasks = this.props.taskData.map( (t, i) => {
      return (<th className="center" key={`task-${i}`}>
        <a href={t.url} target="_blank">{t.name}</a>
      </th>);
    });
    return (
      <tr>
        <th className="center">{"Rank"}</th>
        <th className="center">{"User Name"}</th>
        {tasks}
        <th className="center">{"Score / Time"}</th>
      </tr>
    );
  }
}

export default class Standings extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let standingsRows = "";
    if( this.props.standings.length > 0 ){
      standingsRows = this.props.standings.map( (row, i) => {
        let isFriend = this.props.friends.isFriend( row.user_screen_name );
        return <StandingsRow row={row}
                             settings={this.props.settings}
                             key={row.user_id}
                             isFriend={isFriend}
                             friendsUpdateFunc={this.props.friendsUpdateFunc}
                             filteredRank={this.props.offSet + i + 1}
                             taskData={this.props.taskData}
                             contestEnded={this.props.contestEnded}/>
      } );
    }

    return (
    <table className="table table-striped table-bordered table-condensed table-standings table-sort">
      <thead>
        <StandingsHead taskData={this.props.taskData}/>
      </thead>
      <tbody>
        {standingsRows}
      </tbody>
    </table>
    );
  }
}