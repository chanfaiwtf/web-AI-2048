var newx = -1;
var newy = -1;
var isnew = false;
var ismove = false;

function display_div(a) {
  var n = "#d";
  for (var i = 0; i < s; i ++)
    for (var j = 0; j < s; j ++) {
      if (isnew == true && newx == i && newy == j) {
        $(n+(i*s+j)).html("<div class='tile tile-new tile-"+a[i][j]+"'>"+a[i][j]+"</div></div>");
        continue;
      }
      if (a[i][j] == 0)
        $(n+(i*s+j)).html("<div class='tile tile-"+a[i][j]+"'>"+"</div></div>");
      else if (a[i][j] >= 10000)
        $(n+(i*s+j)).html("<div class='tile tile-super'>"+a[i][j]+"</div></div>");
      else
        $(n+(i*s+j)).html("<div class='tile tile-"+a[i][j]+"'>"+a[i][j]+"</div>");
    }
}

function left(t, i) {
  var len = t[i].length;
  for (var j = 0; j < len-1; j ++)
    if (t[i][j] == 0 && t[i][j+1] != 0) {
      temp = t[i][j];
      t[i][j] = t[i][j+1];
      t[i][j+1] = temp;
      ismove = true;
      left(t, i);
    }
}

function right(t, i) {
  var len = t[i].length;
  for (var j = len-1; j > 0; j --)
    if (t[i][j] == 0 && t[i][j-1] != 0) {
      temp = t[i][j];
      t[i][j] = t[i][j-1];
      t[i][j-1] = temp;
      ismove = true;
      right(t, i);
    }
}

function up(t, j) {
  var len = t.length;
  for (var i = 0; i < len-1; i ++)
    if (t[i][j] == 0 && t[i+1][j] != 0) {
      temp = t[i][j];
      t[i][j] = t[i+1][j];
      t[i+1][j] = temp;
      ismove = true;
      up(t, j);
    }
}

function down(t, j) {
  var len = t.length;
  for (var i = len-1; i > 0; i --)
    if (t[i][j] == 0 && t[i-1][j] != 0) {
      temp = t[i][j];
      t[i][j] = t[i-1][j];
      t[i-1][j] = temp;
      ismove = true;
      down(t, j);
    }
}

function left_combine(a, i) {
  var len = a[i].length;
  var now = 0;
  var nxt = 1;
  while (now <= len-2) {
    if (a[i][now] == 0 || nxt == len) {
      now ++;
      nxt = now+1;
      continue;
    }
    if (a[i][nxt] == 0) {
      nxt ++;
      continue;
    }
    if (a[i][now] == a[i][nxt]) {
      a[i][now] *= 2;
      a[i][nxt] = 0;
      now = nxt+1;
      nxt = now+1;
      ismove = true;
      continue;
    }
    else {
      now = nxt;
      nxt = now+1;
    }
  }
  left(a, i);
}

function right_combine(a, i) {
  var len = a[i].length;
  var now = len-1;
  var nxt = len-2;
  while (now >= 1) {
    if (a[i][now] == 0 || nxt == -1) {
      now --;
      nxt = now-1;
      continue;
    }
    if (a[i][nxt] == 0) {
      nxt --;
      continue;
    }
    if (a[i][now] == a[i][nxt]) {
      a[i][now] *= 2;
      a[i][nxt] = 0;
      now = nxt-1;
      nxt = now-1;
      ismove = true;
      continue;
    }
    else {
      now = nxt;
      nxt = now-1;
    }
  }
  right(a, i);
}

function up_combine(a, j) {
  var len = a.length;
  var now = 0;
  var nxt = 1;
  while (now <= len-2) {
    if (a[now][j] == 0 || nxt == len) {
      now ++;
      nxt = now+1;
      continue;
    }
    if (a[nxt][j] == 0) {
      nxt ++;
      continue;
    }
    if (a[now][j] == a[nxt][j]) {
      a[now][j] *= 2;
      a[nxt][j] = 0;
      now = nxt+1;
      nxt = now+1;
      ismove = true;
      continue;
    }
    else {
      now = nxt;
      nxt = now+1;
    }
  }
  up(a, j);
}

function down_combine(a, j) {
  var len = a.length;
  var now = len-1;
  var nxt = len-2;
  while (now >= 1) {
    if (a[now][j] == 0 || nxt == -1) {
      now --;
      nxt = now-1;
      continue;
    }
    if (a[nxt][j] == 0) {
      nxt --;
      continue;
    }
    if (a[now][j] == a[nxt][j]) {
      a[now][j] *= 2;
      a[nxt][j] = 0;
      now = nxt-1;
      nxt = now-1;
      ismove = true;
      continue;
    }
    else {
      now = nxt;
      nxt = now-1;
    }
  }
  down(a, j);
}

function check(a) {
  for (var i = 0; i < s; i ++)
    for (var j = 0; j < s; j ++)
      if (a[i][j] == 0)
        return true;
  isnew = false;
  return false;
}

function addnew() {
  while (check(a) == true) {
    pos = Math.floor(Math.random()*16);
    var i = Math.floor(pos/s);
    var j = Math.floor(pos%s);
    if (a[i][j] == 0) {
      a[i][j] = Math.floor(Math.random()*2 + 1) * 2;
      newx = i;
      newy = j;
      isnew = true;
      break;
    }
  }
}

function left_go() {
  ismove = false;
  for (var i = 0; i < s; i ++) {
    left(a, i);
  }
  for (var i = 0; i < s; i ++)
    left_combine(a, i);
  if (ismove == true)
    addnew();
  display_div(a);
}

function up_go() {
  ismove = false;
  for (var j = 0; j < s; j ++) {
    up(a, j);
  }
  for (var j = 0; j < s; j ++)
    up_combine(a, j);
  if (ismove == true)
    addnew();
  display_div(a);
}

function right_go() {
  ismove = false;
  for (var i = 0; i < s; i ++) {
    right(a, i);
  }
  for (var i = 0; i < s; i ++)
    right_combine(a, i);
  if (ismove == true)
    addnew();
  display_div(a);
}

function down_go() {
  ismove = false;
  for (var j = 0; j < s; j ++) {
    down(a, j);
  }
  for (var j = 0; j < s; j ++)
    down_combine(a, j);
  if (ismove == true)
    addnew();
  display_div(a);
}

$(document).ready(function() {
  display_div(a);
  $(document).keyup(function(key_in) {
    console.log(key_in.keyCode);
    if (key_in.keyCode == 37) {
      left_go();
    }
    if (key_in.keyCode == 38) {
      up_go();
    }
    if (key_in.keyCode == 39) {
      right_go();
    }
    if (key_in.keyCode == 40) {
      down_go();
    }
  });
});
