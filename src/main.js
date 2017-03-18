//import React from 'react';
//import ReactDOM from 'react-dom';
import AtCoderCutomStandings from './app.js'
import injectCustomCSS from './css.js'

$('div.table-responsive').hide();
$('#pagination-standings').hide();
$('#standings-csv-link').after('<div id="content"></div>');
//$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
injectCustomCSS();

try{
  ReactDOM.render(
    <AtCoderCutomStandings />,
    document.getElementById('content')
  );
}catch(e){
  console.log( "some error occurred" );
  console.log( e );
  $('div.table-responsive').show();
  $('#pagination-standings').show();
}
