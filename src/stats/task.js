import {rating} from '../util.js'
import ChartComponent from './chartComponent.js'

export default class StatsTask extends React.Component{
  /**
  * task 
  * standings
  */
  constructor(props){
    super(props);
    this.timeStep = 5 * 60;


    this.getMaxScore.bind(this);
    this.getStatsValues.bind(this);
    this.generateDataset.bind(this);
  }

  getMaxScore(){
    let maxScore = 0;
    this.props.standings.forEach( (data) => {
      const d = data.tasks[ this.props.task.id ];
      if( d.score === undefined ) return;
      maxScore = Math.max(maxScore, Number(d.score));
    });
    return maxScore;
  }

  getStatsValues(standings){
    let res = {}
    try{
      res.numAC = 0;
      res.numWA = 0;
      res.numPeopleTried = 0;
      res.numSubmissions = 0;
      res.firstAcceptedTime = 0;
      res.firstAcceptedPerson = [];

      let timeSum = 0;

      res.numContestants = 0;

      //set FA
      standings.forEach( (data) => {
        const d = data.tasks[ this.props.task.id ];
        if( d.score === undefined ) return;

        if( this.maxScore == 0 || d.score != this.maxScore){
          return;
        }

        if( res.firstAcceptedTime == 0 ) res.firstAcceptedTime = Number(d.elapsed_time);
        else res.firstAcceptedTime = Math.min(res.firstAcceptedTime, Number(d.elapsed_time) );
      });

      //set other params
      standings.forEach( (data) => {
        //contestant made at least one submission
        if( data.tasks.map( (t)=>t.elapsed_time !== undefined ? 1 : 0 ).reduce( (a,b)=>a+b ) !== 0 ) res.numContestants++;

        const d = data.tasks[ this.props.task.id ];
        if( d.score === undefined ) return;

        res.numPeopleTried += 1;
        res.numSubmissions += d.failure;
        if( d.score != 0 ) res.numSubmissions += 1;

        if( this.maxScore == 0 || d.score != this.maxScore){
          return;
        }

        res.numAC += 1;
        res.numWA += d.failure;
        timeSum += d.elapsed_time;

        if( res.firstAcceptedTime == d.elapsed_time ){
          res.firstAcceptedPerson.push( rating.generateColoredName( data.user_screen_name, data.rating ) );
          res.firstAcceptedPerson.push( " " );
        }

      });

      if( res.numAC == 0 ){
        res.averageTime = 0;
      }else{
        res.averageTime = Math.round(timeSum / res.numAC);
      }


    }catch(e){
      console.log( "failed to generate stats" );
      console.log( e );
    }

    return res;
  }

  generateDataset(){
    const labels = rating.lb.slice(1).map( (r) => String(r) + "-" );
    const color = rating.color.slice(1);
    const contestDuration = (this.props.contest.endTime.getTime() - this.props.contest.startTime.getTime())/1000;

    // set solved histogram
    let data = rating.lb.map( () => (new Array( Math.floor( (contestDuration+this.timeStep-1) / this.timeStep ) )).fill(0) );
    this.props.standings.forEach( (r) => {
      const t = r.tasks[ this.props.task.id ];
      if( t.score !== 0 && t.score === this.maxScore ){
        data[ rating.getLevel( r.rating ) ][ Math.floor(t.elapsed_time / this.timeStep) ] += 1;
      }
    });
    // dataset for the chart
    const dataset = {
      type : 'bar',
      data: {
        labels : (()=>{
          let arr = new Array( Math.floor( (contestDuration+this.timeStep-1) / this.timeStep ) );
          for(let i=0; i<arr.length; i++){
            arr[i] = `${5*i}-`;
          }
          return arr;
        })(),
        datasets: data.slice(1).map( (d, i) => {
          return {
            label: labels[i],
            data: d,
            backgroundColor: color[i]
          };
        })
      },
      options: {
        //responsive : false,
        maintainAspectRatio : false,
        scales: {
          xAxes: [{
            display:true,
            scaleLabel:{
              display:true,
              labelString: "Time [min]"
            },
            ticks: {
              beginAtZero:true
            }
          }],
          yAxes: [{
            display:true,
            scaleLabel:{
              display:true,
              labelString: "Solved"
            },
            ticks: {
              beginAtZero:true
            },
            stacked: true
          }]
        },
        animation : {
          animate: false,
          animateScale : false
        }
      }
    };

    return dataset;
  }

  render(){
    this.maxScore = this.getMaxScore();
    const dataAll = this.getStatsValues(this.props.standings);
    const rowAll = (
      <tr>
        <td>ALL</td>
        <td>{dataAll.numAC}</td>
        <td>{dataAll.numPeopleTried}</td>
        <td>{dataAll.numSubmissions}</td>
        {/*<td>{( dataAll.numAC / Math.max(1, dataAll.numSubmissions) * 100).toFixed(2)}%</td>*/}
        <td>{( dataAll.numAC / Math.max(1, dataAll.numPeopleTried) * 100).toFixed(2)}%</td>
        <td>{( dataAll.numAC / Math.max(1, dataAll.numContestants) * 100).toFixed(2)}%</td>
        <td>{dataAll.firstAcceptedPerson}<br/>
        {`${Math.floor( dataAll.firstAcceptedTime/60 )} min ${dataAll.firstAcceptedTime%60} sec`}
        </td>
        <td>{`${Math.floor( dataAll.averageTime/60 )} min ${dataAll.averageTime%60} sec`}</td>
        <td>{(dataAll.numWA / Math.max(1, dataAll.numAC)).toFixed(2)}</td>
      </tr>
    );

    const dataColor = [];
    for(let r=1; r<=9; r++){
      const cStandings = this.props.standings.filter( (s)=>{
        return rating.lb[r] <= s.rating && s.rating < rating.ub[r];
      } );
      dataColor.push( this.getStatsValues(cStandings) );
    }
    const rowColor = dataColor.map( (data, idx) => {
      return (
        <tr key={idx}>
          <td><span style={{color : rating.colorOriginal[idx+1]}}>{rating.lb[idx+1]} - </span></td>
          <td>{data.numAC}</td>
          <td>{data.numPeopleTried}</td>
          <td>{data.numSubmissions}</td>
          {/*<td>{( data.numAC / Math.max(1, data.numSubmissions) * 100).toFixed(2)}%</td>*/}
          <td>{( data.numAC / Math.max(1, data.numPeopleTried) * 100).toFixed(2)}%</td>
          <td>{( data.numAC / Math.max(1, data.numContestants) * 100).toFixed(2)}%</td>
          <td>{data.firstAcceptedPerson}<br/>
          {`${Math.floor( data.firstAcceptedTime/60 )} min ${data.firstAcceptedTime%60} sec`}
          </td>
          <td>{`${Math.floor( data.averageTime/60 )} min ${data.averageTime%60} sec`}</td>
          <td>{(data.numWA / Math.max(1, data.numAC)).toFixed(2)}</td>
        </tr>
      );
    } ).reverse();

    try{
      const res = (
        <div>
          <h3>{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.props.task.id]} : {this.props.task.name}</h3>
          <h4><span title="the max score contestants got. this may be partial score">Max Score</span> : {this.maxScore / 100}</h4>
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                <th>Rating</th>
                <th><span title="number of people who got max score (may be partial score)">AC</span></th>
                <th><span title="number of people who made at least one submission for this task">Attempted</span></th>
                <th><span title="number of submissions for this task">Submissions</span></th>
                {/*<th>AC / Submissions</th>*/}
                <th>AC / Attempted</th>
                <th>AC / Contestants</th>
                <th>Fastest</th>
                <th>Average Time</th>
                <th>Average WA</th>
              </tr>
            </thead>
            <tbody>
              {rowAll}
            </tbody>
          </table>
          <div>
            <h3>AC Time Distribution</h3>
            <ChartComponent canvasId={`taskChart_${this.props.task.id}`} dataset={this.generateDataset()}
                            width="800" height="340" />
          </div>
          <div>
            <h3>Color Stats</h3>
            <table className="table table-bordered table-condensed">
              <thead>
                <tr>
                  <th>Rating</th>
                  <th><span title="number of people who got max score (may be partial score)">AC</span></th>
                  <th><span title="number of people who made at least one submission for this task">Attempted</span></th>
                  <th><span title="number of submissions for this task">Submissions</span></th>
                  {/*<th>AC / Submissions</th>*/}
                  <th>AC / Attempted</th>
                  <th>AC / Contestants</th>
                  <th>Fastest</th>
                  <th>Average Time</th>
                  <th>Average WA</th>
                </tr>
              </thead>
              <tbody>
                {rowColor}
              </tbody>
            </table>
          </div>
        </div>
      );
      return res;
    }catch(e){
      console.log(e);
    }
  }
}
