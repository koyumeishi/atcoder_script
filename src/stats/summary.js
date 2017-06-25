import {rating,countries} from '../util.js'
import ChartComponent from './chartComponent.js'

class TopOfColors extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let data = new Array(rating.lb.length);
    data.fill(undefined);

    this.props.standings.forEach( (s)=>{
      if(s.elapsed_time === "0") {
        let participating = false;
        s.tasks.forEach( (t)=>{
          if(t.score !== undefined) participating = true;
        } );
        if( participating === false ) return;
      }

      const level = rating.getLevel( s.rating );
      if( data[level] === undefined ){
        data[level] = {
          name : s.user_screen_name,
          rating : s.rating,
          rank : s.rank,
          score : Number(s.score) / 100,
          time : Number(s.elapsed_time),
          penalty : Number(s.penalty),
          failure : Number(s.failure)
        };
      }
    });

    // console.log(data);

    data = data.slice(1);

    let comp = data.map( (d, idx) => {
      if( d === undefined ){
        return (
          <tr key={idx}>
            <td><span style={{color : rating.colorOriginal[idx+1]}}>{rating.lb[idx+1]} - </span></td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
          </tr>
        );
      }else{
        return(
          <tr key={idx}>
            <td><span style={{color : rating.colorOriginal[idx+1]}}>{rating.lb[idx+1]} - </span></td>
            <td>{rating.generateColoredName( d.name, d.rating )}</td>
            <td>{d.rank}</td>
            <td>{d.score}{d.failure!=0?<span> ({d.failure})</span> : ""}</td>
            <td>{Math.floor(d.time/60)} min {d.time%60} sec ({Math.floor(d.penalty/60)} min {d.penalty%60} sec)</td>
          </tr>
        );
      }
    } );

    comp.reverse();

    return (
      <div>
        <h3>Top of Colors</h3>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <th>Rating</th>
              <th>Top</th>
              <th>Rank</th>
              <th>Score (Penalty)</th>
              <th>Time (Penalty)</th>
            </tr>
          </thead>
          <tbody>
            {comp}
          </tbody>
        </table>
      </div>
    );
  }

}

class TopOfCountries extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sortingKey : "rank",
      ascending : true
    };
  }

  render(){
    let data = {};

    this.props.standings.forEach( (s)=>{
      if(s.elapsed_time === "0") {
        let participating = false;
        s.tasks.forEach( (t)=>{
          if(t.score !== undefined) participating = true;
        } );
        if( participating === false ) return;
      }

      const country = s.country;

      if( data[country] === undefined ){
        data[country] = {
          name : s.user_screen_name,
          country : s.country,
          rating : s.rating,
          rank : s.rank,
          score : Number(s.score) / 100,
          time : Number(s.elapsed_time),
          penalty : Number(s.penalty),
          failure : Number(s.failure),
          scoreTime : Number(s.score) * 1000000000 - Number(s.penalty)
        };
      }
    });

    data = Object.keys(data).map( (c) => {
      return data[c];
    } );

    data.sort( (x,y) => {
      let res = x[this.state.sortingKey] < y[this.state.sortingKey];
      res = this.state.ascending?res:!res;
      return res ? -1 : 1;
    } );

    let comp = data.map( (d, idx) => {
      return(
        <tr key={idx}>
          <td>{d.rank}</td>
          <td><img src={`/img/flag/${d.country}.png`} style={{verticalAlign: "middle", width: "16px", height: "16px"}} /> {countries[d.country]}</td>
          <td>{rating.generateColoredName( d.name, d.rating )}</td>
          <td>{d.score}{d.failure!=0?<span> ({d.failure})</span> : ""}</td>
          <td>{Math.floor(d.time/60)} min {d.time%60} sec ({Math.floor(d.penalty/60)} min {d.penalty%60} sec)</td>
        </tr>
      );
    } );

    return (
      <div>
        <h3>Top of Countries</h3>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <th onClick={()=>{
                if( this.state.sortingKey == "rank" ) this.setState ({ sortingKey : "rank", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "rank", ascending : true });
              }}>Rank</th>
              <th onClick={()=>{
                if( this.state.sortingKey == "country" ) this.setState ({ sortingKey : "country", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "country", ascending : true });
              }}>Country</th>
              <th onClick={()=>{
                if( this.state.sortingKey == "name" ) this.setState ({ sortingKey : "name", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "name", ascending : true });
              }}>Top</th>
              <th onClick={()=>{
                if( this.state.sortingKey == "scoreTime" ) this.setState ({ sortingKey : "scoreTime", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "scoreTime", ascending : false });
              }}>Score (Penalty)</th>
              <th onClick={()=>{
                if( this.state.sortingKey == "scoreTime" ) this.setState ({ sortingKey : "scoreTime", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "scoreTime", ascending : true });
              }}>Time (Penalty)</th>
            </tr>
          </thead>
          <tbody>
            {comp}
          </tbody>
        </table>
      </div>
    );
  }

}

class NumberOfColorContestants extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sortingKey : "rating",
      ascending : false
    };
  }

  render(){
    let data = new Array( rating.lb.length );
    for(let i=0; i<data.length; i++){
      data[i] = { rating:i, contestants:0 };
    }

    this.props.standings.forEach( (s)=>{
      if(s.elapsed_time === "0") {
        let participating = false;
        s.tasks.forEach( (t)=>{
          if(t.score !== undefined) participating = true;
        } );
        if( participating === false ) return;
      }

      const level = rating.getLevel( s.rating );
      data[level].contestants += 1;

    });

    data = data.slice(1);

    data.sort( (x,y) => {
      let res = x[this.state.sortingKey] < y[this.state.sortingKey];
      res = this.state.ascending?res:!res;
      return res ? -1 : 1;
    } );

    let comp = data.map( (d, idx) => {
      return(
        <tr key={idx}>
          <td><span style={{color : rating.colorOriginal[d.rating]}}>{rating.lb[d.rating]} - </span></td>
          <td>{d.contestants}</td>
        </tr>
      );
    } );

    return (
      <div>
        <h3>Number of Contestants (Color)</h3>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <th onClick={()=>{
                if( this.state.sortingKey == "rating" ) this.setState ({ sortingKey : "rating", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "rating", ascending : false });
              }}>Rating</th>
              <th onClick={()=>{
                if( this.state.sortingKey == "contestants" ) this.setState ({ sortingKey : "contestants", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "contestants", ascending : false });
              }}>Contestants</th>
            </tr>
          </thead>
          <tbody>
            {comp}
          </tbody>
        </table>
      </div>
    );
  }

}

class NumberOfCountryContestants extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sortingKey : "contestants",
      ascending : false
    };
  }

  render(){
    let data = {};

    this.props.standings.forEach( (s)=>{
      if(s.elapsed_time === "0") {
        let participating = false;
        s.tasks.forEach( (t)=>{
          if(t.score !== undefined) participating = true;
        } );
        if( participating === false ) return;
      }

      const country = s.country;

      if( data[country] === undefined ){
        data[country] = {
          country : country,
          contestants : 1
        };
      }else{
        data[country].contestants += 1;
      }
    });

    data = Object.keys(data).map( (c) => {
      return data[c];
    } );

    data.sort( (x,y) => {
      let res = x[this.state.sortingKey] < y[this.state.sortingKey];
      res = this.state.ascending?res:!res;
      return res ? -1 : 1;
    } );

    let comp = data.map( (d, idx) => {
      return(
        <tr key={idx}>
          <td><img src={`/img/flag/${d.country}.png`} style={{verticalAlign: "middle", width: "16px", height: "16px"}} /> {countries[d.country]}</td>
          <td>{d.contestants}</td>
        </tr>
      );
    } );

    return (
      <div>
        <h3>Number of Contestants (Country)</h3>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <th onClick={()=>{
                if( this.state.sortingKey == "country" ) this.setState ({ sortingKey : "country", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "country", ascending : true });
              }}>Country</th>
              <th onClick={()=>{
                if( this.state.sortingKey == "contestants" ) this.setState ({ sortingKey : "contestants", ascending : !this.state.ascending });
                else this.setState ({ sortingKey : "contestants", ascending : false });
              }}>Contestants</th>
            </tr>
          </thead>
          <tbody>
            {comp}
          </tbody>
        </table>
      </div>
    );
  }

}




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
        <div>
          <h3>Score Distribution</h3>
          <ChartComponent canvasId="chartSummary" dataset={this.genDataset()} width="500" height="280"/>
        </div>
        <TopOfColors standings={this.props.standings}/>
        <TopOfCountries standings={this.props.standings}/>
        <NumberOfColorContestants standings={this.props.standings}/>
        <NumberOfCountryContestants standings={this.props.standings}/>
      </div>
    );
  }
}