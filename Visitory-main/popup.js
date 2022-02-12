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
    if (!keys.indexOf('lastVisitTime')) 
      continue;

    // step 2: WHERE
    // check if 'url' contains user input (where)
    if (!keys.indexOf('url')) 
      continue;

    // step 3: KEYWORD
    // check if 'title' contains user input (keyword)
    if (!keys.indexOf('title')) 
      continue;

    // all pass
    var comma = ", ";
    res = res.concat(comma.concat(JSON.stringify(element)));
  }
  //append(res);
  res = res.concat(']').replace(/^\[,\s*/, "["); // remove first comma
  data2.appendChild(document.createTextNode(res));
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
  window.rejectButton = document.getElementById("reject");

  jsonButton.onclick = function () {
    download("json");
  };

  rejectButton.onclick = function() {
    window.alert("We can not process your data without your consent");
  };
});

