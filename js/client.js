var resultElem = document.getElementById("result");
var errorElem = document.getElementById("error");

function search () {
  var search_value = document.getElementById("searchInput").value;
  if (!search_value) return;
  var url = "https://api.github.com/users/" + search_value;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        var user_json = JSON.parse(xmlHttp.responseText);
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
              var repos_json = JSON.parse(xmlHttp.responseText);
              console.log(user_json);
              console.log(repos_json);
            }
            else console.log('error');
          }
        };
        xmlHttp.open("GET", url + "/repos", true); // true for asynchronous
        xmlHttp.send(null);
      }
      else console.log('error');
    }
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}