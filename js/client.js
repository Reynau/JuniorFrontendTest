var resultElem = document.getElementById("result");
var errorElem = document.getElementById("error");
var usernameElem = document.getElementById("username");
var fullnameElem = document.getElementById("fullname");
var bioElem = document.getElementById("bio");
var listElem = document.getElementById("repo-list");
var imgElem = document.getElementById("image");

document.getElementById('searchInput')
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementById('searchBtn').click();
      }
    });

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
  // Clean all data
  cleanChilds();

  // Show result div
  resultElem.style.display = 'block';
  errorElem.style.display = 'none';

  // Add profile img
  var img = new Image();
  img.src = user_json.avatar_url;
  img.setAttribute("align", "left");
  imgElem.appendChild(img);

  // Add profile data
  var username = document.createTextNode('@' + user_json.login);
  var fullname = document.createTextNode(user_json.name);
  var bio = document.createTextNode(user_json.bio);
  usernameElem.appendChild(username);
  fullnameElem.appendChild(fullname);
  bioElem.appendChild(bio);

  for (var i = 0; i < repos_json.length; ++i) {
    var entry = document.createElement('li');
    var left = document.createElement('div');
    var right = document.createElement('div');

    entry.className = 'wrapper';
    left.className = 'left';
    right.className = 'right';

    left.appendChild(document.createTextNode(repos_json[i].name));
    right.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>&nbsp;' + repos_json[i].stargazers_count +
        '&nbsp;<i class="fa fa-code-fork" aria-hidden="true"></i>&nbsp;' + repos_json[i].forks_count + '&nbsp;';

    entry.appendChild(left);
    entry.appendChild(right);

    listElem.appendChild(entry);
  }
}

function cleanChilds () {
  // Clean imgs
  while (imgElem.firstChild)
    imgElem.removeChild(imgElem.firstChild);

  while (usernameElem.firstChild)
    usernameElem.removeChild(usernameElem.firstChild);
  while (fullnameElem.firstChild)
    fullnameElem.removeChild(fullnameElem.firstChild);
  while (bioElem.firstChild)
    bioElem.removeChild(bioElem.firstChild);

  while (listElem.firstChild)
    listElem.removeChild(listElem.firstChild)
}

function searchNotFound () {
  // Clean all data
  cleanChilds();

  resultElem.style.display = 'none';
  errorElem.style.display = 'block';
}