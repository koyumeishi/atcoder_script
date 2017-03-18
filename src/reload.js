export default class Reloading extends React.Component {
  constructor(props){
    super(props);
    this.state = { autoUpdate:false };
  }

  render(){
    return (<div style={{display:"grid", gridTemplateRows:"1fr", gridTemplateColumns:"auto auto"}}>
      <div style={{gridColumn:"1/2"}} className="atcoder-custom-standings controller-button"
           onClick={ (e)=>this.props.updateFunc() }>
        <a href="#">
          <i className="material-icons">refresh</i>Update
        </a>
      </div>
      <div style={{gridColumn:"2/3"}} className="atcoder-custom-standings controller-button"
           onClick={ (e)=>{
            if(!this.state.autoUpdate){
              this.timerReloading = setInterval( this.props.updateFunc, 60*1000 );
              console.log( "create timer ", this.timerReloading);
            }else{
              try{
                clearInterval( this.timerReloading );
                console.log( "erase timer ", this.timerReloading);
              }catch(e){
                
              }
            }
            this.setState( {autoUpdate:!this.state.autoUpdate})
          } }>
        <span className={`atcoder-custom-standings ${this.state.autoUpdate ? "reloading-enabled" : "reloading-disabled"}`}>
          <i className="material-icons">update</i>Auto (1min)
        </span>
      </div>
    </div>);
  }
}