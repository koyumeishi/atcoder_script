export default class ContestData{
  constructor(){
    this.contstName = $("div.container > a.brand > span.contest-name").text();
    this.startTime = new Date( Date.parse($('time#contest-start-time').text()) );
    this.endTime   = new Date( Date.parse($('time#contest-end-time').text()) );

    this.contestEnded = (new Date()) >= this.endTime;

    const thead =  $('#contest-standings > thead > tr > th');
    this.numTasks = thead.length - 3;
    this.tasks = new Array( this.numTasks );
    for(let i=0; i<this.numTasks; i++){
      const taskName = thead.get(i+2).getElementsByTagName('a')[0].textContent;
      const taskUrl  = thead.get(i+2).getElementsByTagName('a')[0].getAttribute('href');
      this.tasks[i] = new TaskData( taskName, taskUrl, i );
    }
  }
}

class TaskData{
  constructor( name, url, id ){
    this.name = name;
    this.id   = id;
    this.url  = url;
  }
}
