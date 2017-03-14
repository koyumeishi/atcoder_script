class Task extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        {this.props.task.score}
        {this.props.task.time}
      </div>
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
 penalty
*/
class StandingsRow extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    const tasks = this.props.row.tasks.map( (task) => {
      return <Task task={task} />
    } );

    return (
    <div>
      <div>{this.props.row.rank}</div>
      <div>{this.props.row.user_screen_name}</div>
      {tasks}
      <div>{this.props.row.score}</div>
    </div>
    );
  }
}

class StandingsHead extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<div>{"rank"}{"name"}{"tasks"}{"total"}</div>);
  }
}

export default class Standings extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let standingsRows = this.props.standings.map( (row) => {
      return <StandingsRow row={row} />
    } );

    return (
    <div>
      <StandingsHead taskData={this.props.taskData}/>
      {standingsRows}
    </div>
    );
  }
}