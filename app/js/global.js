// background dots ====================================
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const colors = [
  "rgba(241, 211, 2, 0.7)", // yellow
  "rgba(249, 42, 128, 0.7)", // dark pink
  "rgba(239, 121, 138, 0.7)", // pink
  "rgba(35, 87, 137, 0.7)", // blue
  "rgba(0, 128, 0, 0.7)", // green
]

var pointSize = 10;

function windowResize(){
  canvas.width = window.outerWidth
  canvas.height = window.outerHeight
}

function getPosition(event){
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  drawCoordinates(x,y);
}

function drawCoordinates(x,y){
  ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];;
  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
  ctx.fill();
}

$(canvas).click(function(e){
   getPosition(e); 
});

setInterval(function() {
  drawCoordinates(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
}, 1500);


$(window).resize(function() {
  windowResize()
});

$(window).on( "orientationchange", function( event ) {
  windowResize()
});

windowResize()

// alphabet highlight =====================================
const makeSpans = selector => {
  const [...elements] = document.querySelectorAll(selector)
  return elements.map(element => {
    const text = element.innerText.split('')
    const spans = text
      .map(letter => '<span class="' + letter+ '">' + letter + '</span>')
      .join('')
    return element.innerHTML = spans
  })
}

window.onload = function () {
  makeSpans('p, h1, h2, h3, h4, h5, h6')
}
