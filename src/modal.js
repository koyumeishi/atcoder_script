class ModalWindow extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let head = (
      <div style={{display:"grid", gridTemplateRows:"1fr", gridTemplateColumns:"1fr auto"}}>
        <div style={{gridRow:"1/2", gridColumn:"1/2"}}><h3>{this.props.title}</h3></div>
        <div style={{gridRow:"1/2", gridColumn:"2/3"}} onClick={this.props.closeFunc}><i className="material-icons">clear</i></div>
      </div>
    );

    return (
      <div>
        {head}
        {this.props.children}
      </div>
    );
  }
}

export default class Modal extends React.Component{

  constructor(props){
    super(props);
    this.state = {show: false};
  }

  render(){
    let button = (
      <div onClick={ () => {this.setState( {show: true} ); } }
           className="atcoder-custom-standings controller-button">
        {this.props.button}
      </div>
    );

    if( this.state.show === true ){
      return(
        <div>
          {button}
          <div className="atcoder-custom-standings modal-filter" onClick={ ()=>{ this.setState({ show: false}) } }>
            <div className="atcoder-custom-standings modal-content" onClick={ (e) => {e.stopPropagation(); return false;} }>
              <ModalWindow closeFunc={ ()=>{ this.setState({ show: false}) } } title={this.props.title}>
                {this.props.children}
              </ModalWindow>
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <div>
          {button}
        </div>
      );
    }
  }
}
