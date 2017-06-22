import {rating} from '../util.js'
import ChartComponent from './chartComponent.js'

export default class StatsSummary extends React.Component{
  constructor(props){
    super(props);
    this.genDataset.bind(this);
  }

  genDataset(){
    const labels = rating.lb.slice(1).map( (r) => String(r) + " -" );
    const color = rating.color.slice(1);
    let count = rating.color.map( () => (new Map()) );
    let scoreDistribution = new Set();
    this.props.standings.forEach( (r) => {
      if( r.tasks.map( (t)=>t.elapsed_time !== undefined ? 1 : 0 ).reduce( (a,b)=>a+b ) !== 0 ){
        const level = rating.getLevel( r.rating );
        const score = r.score/100;
        scoreDistribution.add(score);
        count[level].set( score, count[level].has(score) ? count[level].get(score) + 1 : 1 );
      }
    });
    let scores = [...scoreDistribution].sort( (a,b) => { return a<b ? -1 : 1} );
    let data = rating.lb.map( () => (new Array(scores.length)).fill(0) );
    count.forEach( (c, level) => {
      c.forEach( (cnt, score ) => {
        data[level][ scores.indexOf(score) ] = cnt;
      });
    });

    const dataset = {
      type : 'bar',
      data: {
        labels: scores,
        datasets: data.slice(1).map( (d, i) => {
          return {
            label: labels[i],
            data: d,
            backgroundColor: color[i]
          };
        })
      },
      options: {
        maintainAspectRatio : false,
        scales: {
          xAxes: [{
            display:true,
            scaleLabel:{
              display:true,
              labelString: "Score"
            },
            ticks: {
              beginAtZero:true
            }
          }],
          yAxes: [{
            display:true,
            scaleLabel:{
              display:true,
              labelString: "People"
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

    return (
      <div>
        <p>
          {this.props.contest.contestEnded ? <span>This stats is unofficial. You can check the official stats <a href="./statistics" target="_blank">here</a>.</span>: null}
        </p>
        <ChartComponent canvasId="chartSummary" dataset={this.genDataset()} width="500" height="280"/>
      </div>
    );
  }
}