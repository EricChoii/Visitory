getLicense(function (license, error) {
  console.log("got license: ");
  if (!error && license && license.result && license.accessLevel === "FULL") {
    unlock();
  }
});

var append = function (text) {
  data.appendChild(document.createTextNode(text));
};

const search = ({
  data
}) => {
  var jsn = JSON.parse(data);
  var res = "[";
  for (var element of jsn) {
    var keys = Object.keys(element);

    // step 1: WHEN
    // search data within a certain period of time
    if (keys.indexOf('lastVisitTime')) {
      // timestamp (front-end) @@@@@
    } else
      continue;

    // step 2: WHERE
    // check if 'url' contains user input (where)
    if (keys.indexOf('url')) {
      var url = element.url.split(/&|\?/);
      if (!url[0].indexOf(document.getElementById('where').value))
        continue; // 'where' not found
    } else
      continue;

    // step 3: KEYWORD
    // check if 'title' contains user input (keyword)
    if (keys.indexOf('title')) {
      var keywords = document.getElementById('keyword').value;
      var flag = false;
      keywords.forEach(e => {
        if (!element.title.indexOf(e)) {
          flag = true;
          break;
        }
      });

      if (flag)
        continue;
    } else
      continue;

    // all pass
    var comma = ", ";
    res = res.concat(comma.concat(JSON.stringify(element)));
  }

  res = res.concat(']').replace(/^\[,\s*/, "["); // remove first comma
  document.getElementById("content").innerText = res;
};

var download = function (format) {
  document.getElementById("content").innerText = "preparing file...";

  chrome.history.search({
      text: "",
      maxResults: 1000000
    },
    function (res) {
      var text;

      append("[");
      for (var i = 0; i < res.length; i++) {
        text = JSON.stringify(res[i]);
        if (i !== res.length - 1) text = text + ",";
        append(text);
      }
      append("]");

      search({
        data: data.innerText
      });
    }
  );
};

document.addEventListener("DOMContentLoaded", function () {
  window.data = document.getElementById("data");
  window.jsonButton = document.getElementById("json");

  jsonButton.onclick = function () {
    download("json");
  };
});