function findMax(data) {
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
}

function drawBarCanvas(data, option, element) {
  let interval = 1;
  let count;
  if (typeof option.tickInterval === 'number') {
    interval = option.tickInterval;
  }
  count = Math.ceil((findMax(data) / interval));
  $('<div id="barchart_ticks_container"></div>').appendTo(element);
  $('#barchart_ticks_container').css({
    'width': '100%',
    'height': '100%',
    // 'backgroundColor': 'pink',
    'display':'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-end',
    // 'align-items': 'flex-end',
    // 'transform': 'translate(0, -100%)',
    // 'padding': '0px',
  });
  for (let i = 0; i < count; i++) {
    $('<div id="tick_' + i + '"></div>').appendTo('#barchart_ticks_container');
    $('#tick_' + i).css({
      'width': '100%',
      'height': parseInt($('#barchart_ticks_container').css('height')) / count + 'px',
      'backgroundColor': 'white',
      'border-top': 'thin dashed black',
      'z-index': '0',
    });
  }
  drawBars(data, option, '#barchart', interval, count);
}

function drawAxis(data, option, element) {
  $('<div id="barchart_axis_container"></div>').appendTo(element);
  $('#barchart_axis_container').css({
    'width': '100%',
    'height': '100%',
    // 'display':'flex',
    // 'flex-direction': 'row',
    // 'justify-content': 'center',
    // 'align-items': 'flex-end',
    'transform': 'translate(0, -100%)',
    // 'padding': '0px',
  });
  $('<div id="barchart_y_axis"></div>').appendTo('#barchart_axis_container');
  $('#barchart_y_axis').css({
    'width': '3px',
    'height': $(element).css('height'),
    'backgroundColor': 'black',
    'position': 'absolute',
    'display':'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'transform': 'translate(0, -100%)',
  });
  $('<div id="y_label">' + option.yLabel + '</div>').appendTo('#barchart_y_axis');
  $('#y_label').css({
    // 'backgroundColor': 'pink',
    // 'font-size': '25px',
    'text-align': 'center',
    'width': $('#barchart_y_axis').css('height'),
    'height': '1em',
    'transform': 'rotate(-90deg) translate(0px, -0.7em)',
    'color': 'black',
  });
  $('<div id="barchart_x_axis"></div>').appendTo('#barchart_axis_container');
  $('#barchart_x_axis').css({
    'width': '100%',
    'height': '3px',
    'backgroundColor': 'black',
    'display':'flex',
    'flex-direction': 'row',
    // 'transform': 'translate(0, -100%)',
    'z-index': '2',
  });
  $('<div id="x_label">' + option.xLabel + '</div>').appendTo('#barchart_x_axis');
  $('#x_label').css({
    // 'backgroundColor': 'pink',
    'text-align': 'center',
    'width': '100%',
    'height': '1em',
    'transform': 'translate(0px, 0.3em)',
    'color': 'black',
  });
}

function drawBars(data, option, element, interval, count) {
  let scale, color = 'pink', spacing = data.length;
  $('<div id="bar_container"></div>').appendTo(element);
  $('#bar_container').css({
    'width': '100%',
    'height': '100%',
    // 'backgroundColor': 'green',
    'display': 'flex',
    'flex-flow': 'row',
    'align-items': 'flex-end',
    'justify-content': 'space-evenly',
    'transform': 'translate(0, -100%)',
  });
  scale = parseInt($('#bar_container').css('height')) / count/ interval;
  if (option.barSpacing !== undefined) {
    spacing = data.length + option.barSpacing;
  }
  for (let i = 0; i < data.length; i++) {
    if (option.barColor !== undefined && option.barColor[i] !== undefined) {
      color = option.barColor[i];
    }
    $(('<div id="bar_' + i + '"></div>')).appendTo('#bar_container');
    $(('#bar_' + i)).css({
      'flex': '0 0 calc(100% / ' + spacing + ')',
      'height': (data[i] * scale) +'px',
      'backgroundColor': color,
      'z-index': '1',
    });
  }
}

function drawBarChart(data, option, element) {
  $(element).css({
    'width': 'auto',
    'height': '325px',
    'backgroundColor': 'grey',
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'center',
    }
  );
  $('<h1 id="barchart_title">' + option.title + '</h1>').appendTo(element);
  $('#barchart_title').css({
    // 'backgroundColor': 'pink',
    'flex': '0 0 10%',
    'text-align': 'center',
    'font-size': '25px',
    'margin': '0.5em',
    'margin-bottom': '1em',
  });
  $('<div id="barchart"></div>').appendTo(element);
  $('#barchart').css({
    // 'backgroundColor': 'cyan',
    'width': '90%',
    'height': '70%',
    // 'margin': '0.5em',
    // 'top': '30px',
    // 'left': '30px',
    // 'flex': '1 1 100px',
    // 'transform': 'scale(1)',
  });
  drawBarCanvas(data, option, '#barchart');
  // drawBars(data, option, '#barchart');
  drawAxis(data, option, '#barchart');
}

$(document).ready(function () {drawBarChart([1, 2, 7, 4, 5, 12], {
  barColor: ['red', 'yellow', 'blue', 'orange', 'green'],
  title: 'Number of Covid Cases Per Country',
  barSpacing: 4,
  xLabel: 'Countries',
  yLabel: 'Covid Cases',
  tickInterval: 1,
},'#demo')});
