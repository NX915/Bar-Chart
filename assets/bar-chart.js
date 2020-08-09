function drawAxis(element) {
  $('<div id="barchart_vertical_line"></div>').appendTo(element);
  $('#barchart_vertical_line').css({
    'width': '3px',
    'height': '100%',
    'backgroundColor': 'black',
    'position': 'fixed',
  });
  $('<div id="barchart_horizontal_line"></div>').appendTo(element);
  $('#barchart_horizontal_line').css({
    'width': '100%',
    'height': '3px',
    'backgroundColor': 'black',
    'position': 'fixed',
  });
}

function drawBars(data, option, element) {
  const maxH = parseInt($(element).css('height'));
  let scale = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > scale) {
      scale = data[i];
    }
  }//find max
  scale = maxH / scale;
  for (let i = 0; i < data.length; i++) {
    $(('<div id="bar_' + i + '"></div>')).appendTo(element);
    $(('#bar_' + i)).css({
      'flex': '0 0 calc(100% / 6)',
      'height': (data[i] * scale) +'px',
      'backgroundColor': option.barColor[i],
    });
  }
}

function drawBarChart(data, option, element) {
  $(element).css({
    'width': 'auto',
    'height': '250px',
    'backgroundColor': 'grey',
    'display': 'block',
    }
  );
  $('<div id="barchart"></div>').appendTo(element);
  $('#barchart').css({
    'width': 'calc(100% - 60px)',
    'height': 'calc(100% - 60px)',
    'position': 'relative',
    'top': '30px',
    'left': '40px',
    'transform': 'rotateX(180deg)',
  });
  $('<div id="bar_container"></div>').appendTo('#barchart');
  $('#bar_container').css({
    'width': '100%',
    'height': '100%',
    'backgroundColor': 'green',
    'display': 'flex',
    'flex-flow': 'row',
    'align-items': 'flex-start',
    'justify-content': 'space-evenly',
    'position': 'fixed',
  });
  drawBars(data,option, '#bar_container');
  drawAxis('#barchart');
}

$(document).ready(function () {drawBarChart([1, 2, 7, 4, 5], {
  barColor: ['red', 'yellow', 'blue', 'orange', 'white']
},'#demo')});