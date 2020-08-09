function drawAxis(option, element) {
  $('<div id="barchart_vertical_line"></div>').appendTo(element);
  $('#barchart_vertical_line').css({
    'width': '3px',
    'height': '100%',
    'backgroundColor': 'black',
    'position': 'fixed',
    'display':'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  });
  $('<div id="y_label">' + option.yLabel + '</div>').appendTo('#barchart_vertical_line');
  $('#y_label').css({
    //'backgroundColor': 'pink',
    'text-align': 'center',
    'width': $(element).css('height'),
    'height': '3em',
    'transform': 'rotateX(-180deg) rotate(-90deg)',
    'color': 'black',
  });
  $('<div id="barchart_horizontal_line"></div>').appendTo(element);
  $('#barchart_horizontal_line').css({
    'width': '100%',
    'height': '3px',
    'backgroundColor': 'black',
    'position': 'fixed',
    'display':'flex',
    'flex-direction': 'row',
    'transform': 'rotateX(-180deg)',
  });
  $('<div id="x_label">' + option.xLabel + '</div>').appendTo('#barchart_horizontal_line');
  $('#x_label').css({
    // 'backgroundColor': 'pink',
    'text-align': 'center',
    'width': '100%',
    'padding-top': '0.5em',
    'color': 'black',
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
    'height': '200px',
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
    'left': '30px',
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
  drawAxis(option,'#barchart');
}

$(document).ready(function () {drawBarChart([1, 2, 7, 4, 5], {
  barColor: ['red', 'yellow', 'blue', 'orange', 'white'],
  xLabel: 'Countries',
  yLabel: 'Covid Cases',
},'#demo')});
