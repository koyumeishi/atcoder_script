class PageButton extends React.Component{
  constructor(props){
    super();
  }

  shouldComponentUpdate( nextProps ){
    if( this.props.current !== nextProps.current ) return true;
    if( this.props.me !== nextProps.me ) return true;
    return false;
  }

  render(){
    const p = this.props.page;

    if( this.props.current === p ){
      return (<li className={`li-pagination active ${this.props.me === true ? "active-me":""}`}><a>{p + 1}</a></li>);
    }else{
      return (<li className={`li-pagination ${this.props.me === true ? "me":""}`} ><a onClick={this.props.onClickFunc} data-page={p} href="#">{p + 1}</a></li>);
    }
  }
}

export default class Pager extends React.Component {
  /**
  * @param {number} current current page (0-indexed)
  * @param {number} total   total page
  * @param {number} me      page where i am
  * @param {function} onClickFunc 
  */
  constructor(props){
    super(props);
  }

  shouldComponentUpdate( nextProps ){
    if( this.props.current !== nextProps.current ) return true;
    if( this.props.total !== nextProps.total ) return true;
    if( this.props.me !== nextProps.me ) return true;
    return false;
  }

  render(){
    let showingPages = new Array();
    for(let page=0; page<this.props.total; page++){
      if(page === 0 || page === this.props.total-1 || page===this.props.me || Math.abs(this.props.current - page) <= 5 ){
        showingPages.push(page);
      }
    }

    let res = new Array();
    let blankCount = 0;
    for(let i=0; i<showingPages.length; i++){
      if(i > 0 && showingPages[i] - showingPages[i-1] > 1){
        if( showingPages[i] - showingPages[i-1] === 2 ){
          res.push( <PageButton current={this.props.current}
                                page={showingPages[i]-1}
                                key={showingPages[i]-1}
                                onClickFunc={this.props.onClickFunc}
                                me={showingPages[i]-1===this.props.me} /> );
        }else{
          res.push( <li className="li-pagination disabled" key={`page-blank-${blankCount++}`}><a>{"..."}</a></li> );
        }
      }
      res.push( <PageButton current={this.props.current}
                            page={showingPages[i]}
                            key={showingPages[i]}
                            onClickFunc={this.props.onClickFunc}
                            me={showingPages[i]===this.props.me} /> );
    }

    return (<div className="pagination pagination-centered"><ul>{res}</ul></div>);
  }
}