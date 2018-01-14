const execa = require('execa');
var loading =  require('loading-cli');
var load = loading("Downloading the latest Worldwide Show from BBC Radio 6");

var theline = 3;
var start = 1; 

execa.shell('get_iplayer --pid=b01fm4ss --radiomode=best').then(result => {
  if(result){
    get_shows(result.stdout);
  }else{
    console.log("Sorry nothing found!");
  }
  
});

function get_shows(list){
  var lines = list.split('\n');
  for (var j = 0; j < lines.length; j++) {
    if(lines[j].startsWith("INFO: ")){
      if(start == theline){
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(lines[j]);
        var show = matches[0];    
        show = show.replace("(","").replace(")","");
        console.log("Latest Show PID: " + show);
        download_show(show);
      }else{
        
      }
      start++;
    }
    
  }
}

function download_show(pid){
  load.start();
  execa.shell('get_iplayer --pid='+pid+' --radiomode=best --force').then(result => {
    load.stop();
    console.log("Downloaded Episode! Enjoy!");
    get_shows(result.stdout);
  });
}