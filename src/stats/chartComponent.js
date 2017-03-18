export default class ChartComponent extends React.Component{
  /**
  * canvasId
  * dataset
  * width
  * height
  */
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <canvas id={this.props.canvasId} width={this.props.width} height={this.props.height}></canvas>
      </div>
    );
  }
  componentDidMount(){
    let ctx = document.getElementById(this.props.canvasId);
    // console.log(ctx);
    this.chart = new Chart(ctx, this.props.dataset);
    // console.log(this.chart);
  }
  componentWillUnmount(){
    this.chart.destroy();
  }
  componentDidUpdate(){
    this.chart.destroy();
    let ctx = document.getElementById(this.props.canvasId);
    // console.log(ctx);
    this.chart = new Chart(ctx, this.props.dataset);
    // console.log(this.chart);
  }
}