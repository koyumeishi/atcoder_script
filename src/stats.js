import StatsSummery from './stats/summery.js'
import StatsTask from './stats/task.js'
import Modal from './modal.js'

class StatsContent extends React.Component{
  constructor(props){
    super(props);
    this.state = { page: 0 };
  }

  shouldComponentUpdate( nextProps, nextState ){
    return this.state.page !== nextState.page;
  }

  render(){
    let tab = this.props.contest.tasks.map( (t,i) => {
      if( this.state.page === i ){
        return (<li className="active" key={`${i}`}><a href="#">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]}</a></li>);
      }else{
        return (<li key={`${i}`}><a href="#" onClick={()=>{
          this.setState({page:i});
        }}>{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]}</a></li>);
      }
    });

    let component;
    if(this.state.page === this.props.contest.numTasks){
      tab.push( <li className="active" key={`${this.props.contest.numTasks}`}><a href="#">Summery</a></li> );
      component = (
        <StatsSummery standings={this.props.standings}
                      contest={this.props.contest} />
      );
    }else{
      tab.push( <li key={`${this.props.contest.numTasks}`}><a href="#" onClick={ ()=>{
        this.setState({page:this.props.contest.numTasks});
      } }>Summery</a></li> );
      component = (
        <StatsTask task={this.props.contest.tasks[this.state.page]}
                   standings={this.props.standings}
                   contest={this.props.contest} />
      );
    }

    return (
      <div>
        <ul className="nav nav-tabs">
          {tab}
        </ul>
        {component}
      </div>
    );
  }
}

export default class Stats extends React.Component {
  /**
  * @param props.standings
  * @param props.contest
  */
  constructor(props){
    super(props);
  }

  render(){
    let button = (
      <a href="#"><i className="material-icons">assessment</i> Statistics </a>
    );

    return (
      <Modal button={button} title="Statistics">
        <StatsContent standings={this.props.standings} contest={this.props.contest}/>
      </Modal>
    );
  }
}