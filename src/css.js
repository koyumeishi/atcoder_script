export default function injectCustomCSS(){
  let css = `
/* Rules for sizing the icon. */
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

/* Rules for using icons as black on a light background. */
.material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
.material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

/* Rules for using icons as white on a dark background. */
.material-icons.md-light { color: rgba(255, 255, 255, 1); }
.material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }

/* Controller Button */
.atcoder-custom-standings.controller-button {
}
.atcoder-custom-standings.controller-button:hover {
  background-color: rgba(220,220,220,0.1);
  box-shadow:2px 4px 8px 0px grey;
  cursor:pointer;
  text-decoration: underline;
}

/* Modal */
.atcoder-custom-standings.modal-filter{
  position        : fixed;
  top             : 0;
  left            : 0;
  width           : 100%;
  height          : 100%;
  padding-top      : 50px;
  background-color : rgba(0,0,0,0.5);
}
.atcoder-custom-standings.modal-content{
  position: fixed;
  top :50%;
  left: 50%;
  z-index:1050;
  overflow:auto;
  background-color:white;
  box-shadow:0 3px 8px 3px rgba(0,0,0,0.3);
  width : 850px;
  height : 600px;
  max-height : 600px;
  margin : -300px 0 0 -425px;
  padding: 25px;
}

/* Check Box */
.material-icons.md-checked { color : rgba(0, 122, 20, 0.9); }

/* Reloading On Off*/
.atcoder-custom-standings.reloading-enabled  { color: rgb(230, 128, 63); }
.atcoder-custom-standings.reloading-disabled { color: grey; }

/* Sorting On Off*/
.atcoder-custom-standings.sorting-enabled  { color: rgb(230, 128, 63); }
.atcoder-custom-standings.sorting-disabled { color: grey; }

/* Filter On Off*/
.atcoder-custom-standings.filtering-enabled  { color: rgb(230, 128, 63); }
.atcoder-custom-standings.filtering-disabled { color: grey; }

/* Settings Item */
.atcoder-custom-standings.settings-item {
  padding: 4px;
  display: block;
}

/* Standings table */
.atcoder-custom-standings.timestamp { color:grey; display: block; }

/* Other */
.atcoder-custom-standings.cursor-link:hover{
  cursor: pointer;
  text-decoration: underline;
}

/* Standings pop down menu */
.atcoder-custom-standings.user-dropdown-menu-box {
  position:absolute;
  padding-top:8px; 
  padding-bottom:8px; 
  background-color:white; 
  box-shadow:4px 4px 8px 4px grey; 
  border-radius:0px 0px 6px 0px;
  cursor: auto;
}
.atcoder-custom-standings.user-dropdown-menu {
  display : block;
  line-height: 2em;
  padding-left : 8px;
  padding-right : 8px;
}
.atcoder-custom-standings.user-dropdown-menu:hover {
  background : lightblue;
}

/* modify original */
a.user-red {
  color:#FF0000;
}

.standings-friend td {background-color : rgba(0, 150, 100, 0.09) !important;}
.standings-friend:hover td {background-color: rgba(0, 200, 150, 0.09) !important;}

.standings-friend > td.standings-frozen {background-color : rgba(0, 82, 255, 0.27) !important;}
.standings-friend > td.standings-frozen:hover {background-color: rgba(0, 82, 255, 0.27) !important;}


.table-striped tbody tr:nth-child(odd) td, .table-striped tbody tr:nth-child(odd) th {background-color: #fefefe;}
.table tbody tr:hover td, .table tbody tr:hover th {background-color: #fefefe;}

td.standings-username:hover {
  cursor: pointer;
  text-decoration: underline;
}

.table-sort th{
  background-image: none !important;
}

.pagination .me a {
  background-color: rgba(252, 0, 0, 0.09);
  color : rgb(114,0,0);
}

.pagination .active-me a {
  background-color: #f5f5f5;
  color : rgb(200,0,0);
}
  `;

  $('head').append(`<style type="text/css">${css}</style>`);
}