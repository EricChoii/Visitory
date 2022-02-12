

// var unlocked = false; // @@@@@
// var unlock = function() {
//   unlocked = true;
//   window.csvButton.className = window.csvButton.className.replace(
//     "caution",
//     "action"
//   );
//   document.getElementById("thankyou").style.display = "block";
// };

getLicense(function(license, error) {
  console.log("got license: ");
  if (!error && license && license.result && license.accessLevel === "FULL") {
    unlock();
  }
});

var append = function(text) {
  data.appendChild(document.createTextNode(text));
};

const search = ({ data }) => {
  var jsn = JSON.parse(data);
  var res = "[";
  for (var element of jsn) {
    var keys = Object.keys(element);
    // 1. when
    if (keys.indexOf('lastVisitTime')){
      // timestamp (front-end) @@@@@
    } else {
      // 'lastVisitTime' 없을 경우 @@@@@
      continue;
    }
    // 2. where

    // 3. keyword

    // okay
    var commma = ',';
    var tmp = commma.concat(JSON.stringify(element));
    res = res.concat(tmp);

  }
  res = res.concat(']');
  document.getElementById("content").innerText = res;
  

  
  // 1644631133278.802
  

  
  // 2. where ('pl')

  // for(key in data)

  //for loop res data->url
  for (var i = 0; i < res.length; i++) { 
     var val = res[i].url;
     val = val.split('/');
     const [a, b, c, d] = input.split('/');
     if(c == pl){
        //return
     } else{
       //return
     }

  };

  // 3. keyword ('kyw')

  // close
  res = res.concat(']');
};

var download = function(format) {
  document.getElementById("content").innerText = "preparing file...";

  chrome.history.search(
    {
      text: "",
      maxResults: 1000000
      //startTime: 0
    },
    function(res) {
      var text;//, filename;
        //filename = "history.json";

        append("[");
        for (var i = 0; i < res.length; i++) {
          text = JSON.stringify(res[i]);
          if (i !== res.length - 1) text = text + ",";
          append(text);
        }
        append("]");

      // const isoDate = new Date().toISOString().substr(0, 10);

      search({
        data: data.innerText
      });
    }
  );
};

document.addEventListener("DOMContentLoaded", function() {
  window.data = document.getElementById("data");
  window.jsonButton = document.getElementById("json");

  jsonButton.onclick = function() {
    download("json");
  };

});

