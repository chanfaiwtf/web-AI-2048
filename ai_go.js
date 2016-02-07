var func;
function judge() {
  
}

var count = 0;
var stopFlag = true;
function ai_go() {
  document.getElementById("test1").innerHTML = "running";
  if (stopFlag == false) {
    document.getElementById("test1").innerHTML = "stopped";
    return;
  }

  if (count % 4 == 0)
    left_go();
  else if (count % 4 == 1)
    up_go();
  else if (count % 4 == 2)
    right_go();
  else if (count % 4 == 3)
    down_go();

  count ++;
  document.getElementById("test3").innerHTML = count;
  setTimeout(function() {
    ai_go();
  }, 300);
}

$(document).keyup(function(key_in) {
  console.log(key_in.keyCode);
  if (key_in.keyCode == 190) {
    stopFlag = false;
  }
  setTimeout(function() {
    stopFlag = true;
  }, 500);
});
