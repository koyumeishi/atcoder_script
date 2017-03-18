import AppSettings from './appSettings.js';

class SortingContent extends React.Component{
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
    let onOff = <div>
      <a className={`atcoder-custom-standings ${this.props.settings.sortingEnabled ? "sorting-enabled" : "sorting-disabled"}`}
         href="#" onClick={(e)=>this.update({sortingEnabled:!this.props.settings.sortingEnabled})} >
         {this.props.settings.sortingEnabled ? "ON" : "OFF"}</a>
    </div>;

    let keys = [];
    keys.push( <a className={`atcoder-custom-standings ${this.props.settings.sortingKey === "rank" ? "sorting-enabled" : "sorting-disabled"}`}
                  href="#" style={{padding: "5px"}} onClick={(e) => this.update( {
                    sortingKey : "rank",
                    sortingEnabled:true,
                    sortingOrder: this.props.settings.sortingKey !== "rank" ? "ascending" : this.props.settings.sortingOrder === "ascending" ? "descending" : "ascending" ,
                  } )} key="rank">Rank</a> );

    keys.push( <a className={`atcoder-custom-standings ${this.props.settings.sortingKey === "time" ? "sorting-enabled" : "sorting-disabled"}`}
                  href="#" style={{padding: "5px"}} onClick={(e) => this.update( {
                    sortingKey : "time",
                    sortingEnabled:true,
                    sortingOrder: this.props.settings.sortingKey !== "time" ? "ascending" : this.props.settings.sortingOrder === "ascending" ? "descending" : "ascending" ,
                  } )} key="time">Time(without penalty)</a> );

    keys.push( <a className={`atcoder-custom-standings ${this.props.settings.sortingKey === "user_screen_name" ? "sorting-enabled" : "sorting-disabled"}`}
                  href="#" style={{padding: "5px"}} onClick={(e) => this.update( {
                    sortingKey : "user_screen_name",
                    sortingEnabled:true,
                    sortingOrder: this.props.settings.sortingKey !== "user_screen_name" ? "ascending" : this.props.settings.sortingOrder === "ascending" ? "descending" : "ascending" ,
                  } )} key="user_screen_name">Name</a> );

    keys.push( <a className={`atcoder-custom-standings ${this.props.settings.sortingKey === "rating" ? "sorting-enabled" : "sorting-disabled"}`}
                  href="#" style={{padding: "5px"}} onClick={(e) => this.update( {
                    sortingKey : "rating",
                    sortingEnabled:true,
                    sortingOrder: this.props.settings.sortingKey !== "rating" ? "descending" : this.props.settings.sortingOrder === "ascending" ? "descending" : "ascending" ,
                  } )} key="rating">Rating</a> );
    keys.push( <a className={`atcoder-custom-standings ${this.props.settings.sortingKey === "country" ? "sorting-enabled" : "sorting-disabled"}`}
                  href="#" style={{padding: "5px"}} onClick={(e) => this.update( {
                    sortingKey : "country",
                    sortingEnabled:true,
                    sortingOrder: this.props.settings.sortingKey !== "country" ? "ascending" : this.props.settings.sortingOrder === "ascending" ? "descending" : "ascending" ,
                  } )} key="country">Country</a> );
    
    let keysTasks = [];
    for(let i=0; i<this.props.contest.numTasks; i++){
      keysTasks.push( <a className={`atcoder-custom-standings ${this.props.settings.sortingKey === `task${i}` ? "sorting-enabled" : "sorting-disabled"}`}
                    href="#" style={{padding: "5px"}} onClick={(e) => this.update( {
                      sortingKey : `task${i}`,
                      sortingEnabled:true,
                      sortingOrder: this.props.settings.sortingKey !== `task${i}` ? "descending" : this.props.settings.sortingOrder === "ascending" ? "descending" : "ascending" ,
                    } )} key={`task${i}`}>Task-{"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i]}</a> );
    }

    let order;
    if( this.props.settings.sortingOrder === "ascending"){
      order = <a href="#" onClick={(e)=>this.update( {sortingOrder: "descending", sortingEnabled:true} )}>
        <i className="material-icons" style={{transform:"scale(1,-1)"}}>sort</i> Ascending
      </a>;
    }else{
      order = <a href="#" onClick={(e)=>this.update( {sortingOrder: "ascending", sortingEnabled:true} )}>
        <i className="material-icons">sort</i> Descending
      </a>;
    }
    return ( 
      <div style={{ position:"absolute",
                    padding:"20px", 
                    backgroundColor:"white", 
                    boxShadow:"4px 4px 8px 4px grey", 
                    borderRadius:"6px 6px 6px 6px",
                    top: `${this.props.posY + 40}px`,
                    left:`${this.props.posX}px`}}
           onClick={(e)=>e.stopPropagation()} >
        <div style={{display:"grid", gridTemplateRows:"auto auto auto", gridTemplateColumns:"auto 1fr"}}>
          <div style={{gridRow:"1/2", gridColumn:"1/2", padding:"2px"}}>{onOff}</div>
          <div style={{gridRow:"2/3", gridColumn:"1/2", padding:"2px"}}>Key :</div>
          <div style={{gridRow:"2/3", gridColumn:"2/3", padding:"2px"}}>{keys}<br/>{keysTasks}</div>
          <div style={{gridRow:"3/4", gridColumn:"1/2", padding:"2px"}}>Order :</div>
          <div style={{gridRow:"3/4", gridColumn:"2/3", padding:"2px"}}>{order}</div>
        </div>
      </div>
    );
  }
}

export default class Sorting extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show : false,
      posX : 0,
      posY : 0
    };

  }
  render(){
    let button = (
      <a href="#" className={`atcoder-custom-standings ${this.props.settings.sortingEnabled ? "sorting-enabled" : "sorting-disabled"}`}>
        <i className="material-icons">sort</i>
        Sort
      </a>
    );

    if( this.state.show === false ){
      return (
        <div className="atcoder-custom-standings controller-button">
          <div onClick={ (e) => {
            let rect = e.target.getBoundingClientRect();
            this.setState( {show : !this.state.show, posX:rect.left, posY:rect.top }) ;
          } }>
            {button}
          </div>
        </div>
      );
    }else{
      return (
        <div className="atcoder-custom-standings controller-button">
          <div onClick={(e)=>this.setState({show:!this.state.show})} >{button}</div>
          <div style={{position:"fixed", left:0, top:0, width:"100%", height:"100%"}}
               onClick={(e)=>this.setState({show:false})}>
            <SortingContent settings={this.props.settings}
                            contest={this.props.contest}
                            settingsUpdateFunc={this.props.settingsUpdateFunc}
                            posX={this.state.posX}
                            posY={this.state.posY}/>
          </div>
        </div>
      );
    }
  }
}