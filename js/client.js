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
              processData(user_json, repos_json);
            }
            else searchNotFound();
          }
        };
        xmlHttp.open("GET", url + "/repos", true); // true for asynchronous
        xmlHttp.send(null);
      }
      else searchNotFound();
    }
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function processData (user_json, repos_json) {
  resultElem.style.display = 'block';
  errorElem.style.display = 'none';

  console.log(user_json);
  console.log(repos_json);
}


function searchNotFound () {
  resultElem.style.display = 'none';
  errorElem.style.display = 'block';
}