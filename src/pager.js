class PageButton extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const p = this.props.page;
    if( this.props.current === true ){
      return (<div>{p + 1}</div>);
    }else{
      return (<div onClick={this.props.onClickFunc} data-page={p}>{p + 1}</div>);
    }
  }
}

export default class Pager extends React.Component {
  /**
  * @param {number} current current page (0-indexed)
  * @param {number} total   total page
  * @param {function} onClickFunc 
  */
  constructor(props){
    super(props);
  }

  render(){
    let res = new Array();
    const page_begin  = Math.max(0, this.props.current - 4);
    const page_end    = Math.min(this.props.total, this.props.current+5);

    if( page_begin !== 0 ){
      const p = 0;
      res.push( <PageButton current={p===this.props.current} page={p} onClickFunc={this.props.onClickFunc}/> );
      if( page_begin !== p+1 ){
        res.push( <div>{"..."}</div> );
      }
    }
    for(let i=page_begin; i<page_end; i++){
      res.push( <PageButton current={i===this.props.current} page={i} onClickFunc={this.props.onClickFunc}/> );
    }
    if( page_end !== this.props.total ){
      const p = this.props.total-1;
      if( page_end !== p ){
        res.push( <div>{"..."}</div> );
      }
      res.push( <PageButton current={p===this.props.current} page={p} onClickFunc={this.props.onClickFunc}/> );
    }
    
    return (<div>{res}</div>);
  }
}