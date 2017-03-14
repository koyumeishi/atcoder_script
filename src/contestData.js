export default class ContestData{
  constructor(){
    this.contst_name = $("div.container > a.brand > span.contest-name").text();
    this.start_time = new Date( Date.parse($('time#contest-start-time').text()) );
    this.end_time   = new Date( Date.parse($('time#contest-end-time').text()) );

    const thead =  $('#contest-standings > thead > tr > th');
    this.num_tasks = thead.length - 3;
    this.tasks = new Array( this.num_tasks );
    for(let i=0; i<this.num_tasks; i++){
      const task_name = thead.get(i+2).getElementsByTagName('a')[0].textContent;
      const task_url  = thead.get(i+2).getElementsByTagName('a')[0].getAttribute('href');
      this.tasks[i] = new TaskData( task_name, task_url, i );
    }
  }

  update(standings){
    this.tasks.forEach( t => {t.update_data(standings)} );
  }
}

class TaskData{
  constructor( name, url, id ){
    this.name = name;
    this.id   = id;
    this.url  = url;

    this.max_score = 0;
    this.num_people_got_max_score = 0;
    this.num_people_submitted = 0;
    this.num_submissions = 0;
    this.first_accepted_time = 0;
    this.first_accepted_person = "";
  }

  update_data(standings){
    this.max_score = 0;
    this.num_people_got_max_score = 0;
    this.num_people_submitted = 0;
    this.num_submissions = 0;
    this.first_accepted_time = 0;
    this.first_accepted_person = "";

    standings.forEach( data => {
      const d = data.tasks[ this.id ];
      if( d.score !== undefined){
        this.num_people_submitted += 1;
        this.num_submissions += d.failure;
        if( d.score !== 0 ) this.num_submissions += 1;

        if(this.max_score < d.score){
          this.max_score = d.score;
          this.num_people_got_max_score = 1;
          this.first_accepted_time = d.elapsed_time;
          this.first_accepted_person = data.user_screen_name;
        }else if( this.max_score === d.score ){
          this.num_people_got_max_score += 1;
          if( this.first_accepted_time > d.elapsed_time ){
            this.first_accepted_time = d.elapsed_time;
            this.first_accepted_person = data.user_screen_name;
          }else if( this.first_accepted_time == d.elapsed_time ){
            this.first_accepted_person += ", " + data.user_screen_name;
          }
        }
      }
    });
  }
}
