// Create color file for layers
function createMap(){
  var color_map = new Object();
  color_map.input = '#9fbfe5';
  color_map.conv = '#ffd685';
  color_map.pool = '#abce9a';
  color_map.dense = '#f5b093';
  return color_map;
}

// Colour adjustment function
// Nicked from http://stackoverflow.com/questions/5560248
function shadeColor(color, percent) {
  color = color.substr(1);
  var num = parseInt(color, 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

//draw cuboid for one line code
function drawCube(x,y,w,h,d,color){
  var canvas = document.getElementById("draw-canvas");
  var ctx = canvas.getContext('2d');
  //draw cube
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - w*0.5, y + w*0.5);
  ctx.lineTo(x - w*0.5+d, y + w*0.5);
  ctx.lineTo(x + d, y);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, 20);
  ctx.strokeStyle = shadeColor(color, 60);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - w*0.5, y + w*0.5);
  ctx.lineTo(x - w*0.5, y + w*0.5 + h);
  ctx.lineTo(x - w*0.5 + d, y + w*0.5 + h);
  ctx.lineTo(x - w*0.5 + d, y + w*0.5);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, 10);
  ctx.strokeStyle = shadeColor(color, 50);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - w*0.5+d, y + w*0.5);
  ctx.lineTo(x - w*0.5 + d, y + w*0.5 + h);
  ctx.lineTo(x + d, y + h);
  ctx.lineTo(x + d, y);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, -5);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fill();
}

// Get textarea input and draw
function draw(text){
  var canvas = document.getElementById("draw-canvas");
  var ctx = canvas.getContext('2d');
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var offsetX;
  var offsetY = 80;
  var map = createMap();
  var lines = text.split('\n');
  for (var i=0; i < lines.length;i++){
    if (lines[i].length > 0){
      if (lines[i][0]!='#'){
        code = lines[i].split('(');
        color = map[code[0]];
        dims = code[1].replace(')','');
        dims = dims.split(',');
        h = parseInt(dims[0]);
        w = parseInt(dims[1]);
        d = parseInt(dims[2]);
        h = h /2 + 5;
        w = w /2 + 5;
        d = Math.log(d)*10;  //filter numbers rescale

        if (code[0] == 'input'){
          mid = offsetY + h/2 + w/2;
          offsetX = 20 + w/2;
          drawCube(offsetX,offsetY,w,h,d,color);
          offsetX += d + 5;
        }else{
          offsetY = mid - h/2 - w/2;
          offsetX += w/2;
          drawCube(offsetX,offsetY,w,h,d,color);
          offsetX += d + 5;
        }
      }
    }
  }
}
