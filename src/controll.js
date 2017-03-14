import Stats from './stats.js'

class Filter extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const by_friend = "friend filter";
    const by_rating = "rating filter";
    const by_country = "country filter";
    return (
      <div>
        {by_friend}
        {by_rating}
        {by_country}
      </div>
    );
  }
}

class Settings extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const page_size = "page size setting";
    const show_handle = "screen name setting";
    const rating_color = "showing color setting";
    const highlight_friends = "highlight friends setting";
    const friends = "friends setting";
    return(
      <div>
        {page_size}
        {show_handle}
        {rating_color}
        {highlight_friends}
        {friends}
      </div>
    );
  }
}

export default class Controll extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let ret = (
      <div>
        <Filter />
        <Settings />
        <Stats />
      </div>
    );

    return ret;
  }
}
