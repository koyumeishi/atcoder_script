import {countries, rating} from './util.js';
import AppSettings from './appSettings.js';

class FilterContent extends React.Component {
  constructor(props){
    super(props);

    this.byFriendsList.bind(this);
    this.byCountry.bind(this);
    this.byRating.bind(this);
    this.byName.bind(this);
    this.update.bind(this);
  }

  update( option ){
    let newSettings = Object.assign(new AppSettings(), this.props.settings);
    for(let param in option){
      newSettings[param] = option[param];
    }
    this.props.settingsUpdateFunc( newSettings );
  }

  byFriendsList(){
    return (
      <div style={{display:"table-row"}}
           className={`atcoder-custom-standings cursor-link ${this.props.settings.filterByFriends ? "filtering-enabled" : "filtering-disabled"}`}
           onClick={() => this.update( {"filterByFriends": !this.props.settings.filterByFriends} )}>
        <div style={{display:"table-cell"}}>
          Friends
        </div>
      </div>
    );
  }

  byCountry(){
    const form = this.props.getActiveCountries().map( (country) => {
      const val = countries[country];
      return (<option value={country} key={`country-filter-option-${country}`}>{val}</option>);
    });
    return (
      <div style={{display:"table-row"}}>
        <div style={{display:"table-cell"}}
             className={`atcoder-custom-standings cursor-link ${this.props.settings.filterByCountry ? "filtering-enabled" : "filtering-disabled"}`}
             onClick={() => this.update( {"filterByCountry": !this.props.settings.filterByCountry} )}
             >
          Country
        </div>
        <div style={{display:"table-cell", paddingLeft:"10px"}}>
          <select defaultValue={this.props.settings.filterCountry}
                  onChange={(e) => {this.update( {"filterByCountry":true, "filterCountry": e.target.value} )} }>
            {form}
          </select>
        </div>
      </div>
    );
  }

  byRating(){
    let buttons = rating.lb.map( (lb, idx) => {
      if(idx === 0) return "";
      if( this.props.settings.filterRating.has(idx) === true ){
        return (
          <a href="#" style={{color : rating.color[idx]}} onClick={ ()=>{
            let obj = new Set( this.props.settings.filterRating );
            obj.delete( idx );
            this.update( {"filterByRating":true, "filterRating": obj} );
          }} title={`${lb} - `} key={`rating-filter-rating-${lb}`}>
            <i className="material-icons md-24" style={{color : rating.color[idx]}}>check_box</i>
          </a>
        );
      }else{
        return (
          <a href="#" style={{color : rating.color[idx]}} onClick={ ()=>{
            let obj = new Set( this.props.settings.filterRating );
            obj.add( idx );
            this.update( {"filterByRating":true, "filterRating": obj} );
          }} title={`${lb} - `} key={`rating-filter-rating-${lb}`}>
            <i className="material-icons md-24" style={{color : rating.color[idx]}}>check_box_outline_blank</i>
          </a>
        );
      }
    });

    let tool = (()=>{
      return(
        <span>
          <a href="#" className="atcoder-custom-standings filtering-disabled" onClick={()=>{
            let obj = new Set([1,2,3,4]);
            this.update( {"filterByRating":true, "filterRating": obj} );
          }} title="0-1199">{"ABC"}</a>
          <span> </span>
          <a href="#" className="atcoder-custom-standings filtering-disabled" onClick={()=>{
            let obj = new Set([1,2,3,4,5,6,7,8]);
            this.update( {"filterByRating":true, "filterRating": obj} );
          }} title="0-2799">{"ARC"}</a>
          <span> </span>
          <a href="#" className="atcoder-custom-standings filtering-disabled" onClick={()=>{
            let obj = new Set();
            this.update( {"filterByRating":true, "filterRating": obj} );
          }}>{"None"}</a>
          <span> </span>
          <a href="#" className="atcoder-custom-standings filtering-disabled" onClick={()=>{
            let obj = new Set([1,2,3,4,5,6,7,8,9]);
            this.update( {"filterByRating":true, "filterRating": obj} );
          }}>{"All"}</a>
        </span>
      );
    })();

    return (
      <div style={{display:"table-row"}}>
        <div style={{display:"table-cell"}}
             className={`atcoder-custom-standings cursor-link ${this.props.settings.filterByRating ? "filtering-enabled" : "filtering-disabled"}`}
             onClick={() => this.update( {"filterByRating": !this.props.settings.filterByRating} )}
             >
          Rating
        </div>
        <div style={{display:"table-cell", paddingLeft:"10px"}}>
          <p>{buttons}</p>
          <p>{tool}</p>
        </div>
      </div>
    );
  }

  byName(){
    return (
      <div style={{display:"table-row"}}>
        <div style={{display:"table-cell"}}
             className={`atcoder-custom-standings cursor-link ${this.props.settings.filterByName ? "filtering-enabled" : "filtering-disabled"}`}
             onClick={() => this.update( {"filterByName": !this.props.settings.filterByName} )}
             >
          Name
        </div>
        <div style={{display:"table-cell", paddingLeft:"10px"}}>
          <input type="text" defaultValue={this.props.settings.filterName} onChange={(e) => {
            this.update( {"filterName": e.target.value, "filterByName": true} )
          } } />
        </div>
      </div>
    );
  }

  render(){
    const byFriend = this.byFriendsList();
    const byRating = this.byCountry();
    const byCountry = this.byRating();
    const byName = this.byName();
    return (
      <div style={{ position:"absolute",
                    padding:"20px",
                    backgroundColor:"white",
                    boxShadow:"4px 4px 8px 4px grey",
                    borderRadius:"6px 6px 6px 6px",
                    top: `${this.props.posY + 40}px`,
                    left:`${this.props.posX}px`,
                    cursor:"auto"
                  }}
           onClick={(e)=>e.stopPropagation()}>
        <div style={{display:"table", lineHeight:"2.5em"}}>
          {byFriend}
          {byRating}
          {byCountry}
          {byName}
        </div>
      </div>
    );
  }

}

export default class Filter extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      show : false,
      posX : 0,
      posY : 0
    };
  }

  render(){
    const button = (
      <a href="#"
         className={`atcoder-custom-standings ${ this.props.settings.isFiltersEnabled() ? "filtering-enabled" : "filtering-disabled"}`}>
        <i className="material-icons">filter_list</i>
        Filter 
      </a>
    );

    if( this.state.show === false ){
      return (
        <div className="atcoder-custom-standings controller-button">
          <div onClick={ (e) => {
            let rect = e.target.getBoundingClientRect();
            this.setState( {show : !this.state.show, posX:rect.left, posY:rect.top }) ;
          } }>{button}</div>
        </div>
      );
    }else{
      return(
        <div className="atcoder-custom-standings controller-button">
          <div onClick={ (e) => this.setState( {show : !this.state.show }) }>{button}</div>
          <div style={{position:"fixed", left:0, top:0, width:"100%", height:"100%"}}
               onClick={(e)=>this.setState({show:false})}>
            <FilterContent settings={this.props.settings}
                           settingsUpdateFunc={this.props.settingsUpdateFunc}
                           getActiveCountries={this.props.getActiveCountries}
                           posX={this.state.posX}
                           posY={this.state.posY}/>
          </div>
        </div>
      );
    }
  }
}