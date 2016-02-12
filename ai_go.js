function init(a, f) {
  for (var i = 0; i < s; i ++) {
    a[i] = new Array();
    for (var j = 0; j < s; j ++)
      a[i][j] = Math.floor(Math.random()*2 + 1) * 2;
  }
  for (var i = 0; i < s; i ++) {
    f[i] = new Array();
    for (var j = 0; j < s; j ++) {
      f[i][j] = 1;
    }
  }
  var weight = 1;
  for (var i = 0; i < s; i ++) {
    if (i % 2 == 0) {
      for (var j = 0; j < s; j ++) {
        f[i][j] = weight;
        weight = weight * 2;
      }
    } else {
      for (var j = s-1; j >= 0; j --) {
        f[i][j] = weight;
        weight = weight * 2;
      }
    }
  }
}

var direction = -1;
function judge(a) {
  var judge_func = new Array();
  for (var i = 0; i < 4; i ++) {
    judge_func[i] = 0;
  }

  var g = new Array();
  for (var i = 0; i < s; i ++) {
    g[i] = new Array();
    for (var j = 0; j < s; j ++) {
      g[i][j] = 0;
    }
  }

  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      g[i][j] = a[i][j];
    }
    
  left_go(g);
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      judge_func[0] += f[i][j] * g[i][j];
    }
  }
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      g[i][j] = a[i][j];
    }
  }
  up_go(g);
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      judge_func[1] += f[i][j] * g[i][j];
    }
  }
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      g[i][j] = a[i][j];
    }
  }
  right_go(g);
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      judge_func[2] += f[i][j] * g[i][j];
    }
  }
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      g[i][j] = a[i][j];
    }
  }
  down_go(g);
  for (var i = 0; i < s; i ++) {
    for (var j = 0; j < s; j ++) {
      judge_func[3] += f[i][j] * g[i][j];
    }
  }

  direction = 0;
  var now = judge_func[0];
  for (var i = 1; i < 4; i ++) {
    if (judge_func[i] > now) {
      now = judge_func[i];
      direction = i;
    }
  }
}

var count = 0;
var stopFlag = true;
function ai_go() {
  document.getElementById("test1").innerHTML = "running";
  if (stopFlag == false) {
    document.getElementById("test1").innerHTML = "stopped";
    return false;
  }

  judge(a);
  document.getElementById("test2").innerHTML = direction;

  if (ismove == false) {

  }

  //direction = count;
  if (ismove == true) {
    if (direction % 4 == 0) {
      left_ai(a);
    } else if (direction % 4 == 1) {
      up_ai(a);
    } else if (direction % 4 == 2) {
      right_ai(a);
    } else if (direction % 4 == 3) {
      down_ai(a);
    }
  }

  count ++;
  document.getElementById("test3").innerHTML = count;
  setTimeout(function() {
   ai_go();
  }, 1000);
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
