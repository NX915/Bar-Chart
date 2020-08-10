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
  if (typeof option.chartHeight === 'number') {
    count = Math.ceil(option.chartHeight / interval);
  } else {
    count = Math.ceil(findMax(data) / interval);
  }
  $('<div id="barchart_ticks_container"></div>').appendTo(element);
  $('#barchart_ticks_container').css({
    'width': '100%',
    'height': '100%',
    // 'backgroundColor': 'pink',
    'display':'flex',
    'flex-direction': 'column-reverse',
    'justify-content': 'flex-end',
    'position': 'absolute',
    // 'align-items': 'flex-end',
  });
  $('<div id="barchart_ticks_label_container"></div>').appendTo(element);
  $('#barchart_ticks_label_container').css({
    'width': '3em',
    'height': '100%',
    // 'backgroundColor': 'pink',
    'position': 'absolute',
    'display':'flex',
    'flex-direction': 'column-reverse',
    'justify-content': 'flex-end',
    // 'align-items': 'flex-end',
    'transform': 'translate(-3.5em)',
    // 'padding': '0px',
  });
  for (let i = 0; i < count; i++) {
    $('<div id="tick_' + i + '"></div>').appendTo('#barchart_ticks_container');
    $('#tick_' + i).css({
      'width': '100%',
      'height': parseInt($('#barchart_ticks_container').css('height')) / count + 'px',
      'backgroundColor': 'white',
      'border-top': 'thin dashed black',
      'display':'flex',
      'justify-content': 'flex-end',
      'z-index': '0',
    });
    $('<div id="tick_label_' + i + '">' + interval * (i + 1) + '</div>').appendTo('#barchart_ticks_label_container');
    $('#tick_label_' + i).css({
      'font-size': '12px',
      'height': parseInt($('#barchart_ticks_container').css('height')) / count + 'px',
      // 'backgroundColor': 'pink',
      'transform': 'translate(0, -0.5em)',
      'text-align': 'right',
    });
  }
  drawBars(data, option, element, interval, count);
  drawAxis(data, option, element);
}

function drawAxis(data, option, element) {
  let xLabel = '', yLabel = '';
  if (option.xLabel !== undefined) {
    xLabel = option.xLabel;
  }
  if (option.yLabel !== undefined) {
    yLabel = option.yLabel;
  }
  $('<div id="barchart_axis_container"></div>').appendTo(element);
  $('#barchart_axis_container').css({
    'width': '100%',
    'height': '100%',
    'display':'flex',
    'flex-direction': 'row',
    // 'justify-content': 'center',
    'align-items': 'flex-end',
    // 'transform': 'translate(0, -200.00%)',
    // 'padding': '0px',
    // 'border-bottom': '3px solid black',
  });
  $('<div id="barchart_y_axis"></div>').appendTo('#barchart_axis_container');
  $('#barchart_y_axis').css({
    'width': '0px',
    'height': $(element).css('height'),
    'backgroundColor': 'black',
    'position': 'absolute',
    'display':'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'border-left': 'solid black',
  });
  $('<div id="y_label">' + yLabel + '</div>').appendTo('#barchart_y_axis');
  $('#y_label').css({
    // 'backgroundColor': 'pink',
    // 'font-size': '25px',
    'text-align': 'center',
    'width': $('#barchart_y_axis').css('height'),
    'height': '8em',
    'transform': 'rotate(-90deg)',
    'color': 'black',
  });
  $('<div id="barchart_x_axis"></div>').appendTo('#barchart_axis_container');
  $('#barchart_x_axis').css({
    'width': '100%',
    'height': '1%',
    // 'backgroundColor': 'black',
    'border-bottom': 'solid black',
    'display':'flex',
    'flex-direction': 'row',
    'z-index': '2',
  });
  $('<div id="x_label">' + xLabel + '</div>').appendTo('#barchart_x_axis');
  $('#x_label').css({
    // 'backgroundColor': 'pink',
    'text-align': 'center',
    'width': '100%',
    'transform': 'translate(0px, 1.5em)',
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
    'position': 'absolute',
    'display': 'flex',
    'flex-flow': 'row',
    'align-items': 'flex-end',
    'justify-content': 'space-evenly',
    // 'transform': 'translate(0, -100%)',
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
    $('#bar_' + i).css({
      'flex': '0 0 calc(100% / ' + spacing + ')',
      'height': (data[i] * scale) +'px',
      'backgroundColor': color,
      'z-index': '1',
      'position': 'relative',
    });
    if (option.barLabel !== undefined && option.barLabel[i] !== undefined) {
      $('<div id="bar_' + i + '_label_container"></div>').appendTo('#bar_' + i)
      $('#bar_' + i + '_label_container').css({
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
      });
      $('<div id="bar_' + i + '_label">' + option.barLabel[i] + '</div>').appendTo('#bar_' + i + '_label_container');
      $('#bar_' + i + '_label').css({
        'width': '100%',
        // 'font-size': '30px',
        'text-align': 'center',
      });
      if  (option.barLabelPosition !== undefined) {
        switch (option.barLabelPosition) {
        case 'top':
          $('#bar_' + i + '_label').css({
            'transform': 'translate(0, -1em)',
          });
          break;
        case 'center':
          $('#bar_' + i + '_label').css({
            'transform': 'translate(0, calc(' + (data[i] * scale)/2 + 'px - 0.5em))',
          });
          break;
        case 'bottom':
          $('#bar_' + i + '_label').css({
            'transform': 'translate(0, calc(' + (data[i] * scale) + 'px))',
          });
          break;
        }
      } else {
        $('#bar_' + i + '_label').css({
          'transform': 'translate(0, calc(' + (data[i] * scale) + 'px))',
        });
      }
    }
  }
}

function drawBarChart(data, option, element) {
  $(element).css({
    'width': 'auto',
    'height': '500px',
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
    'backgroundColor': 'cyan',
    'width': '80%',
    'height': '65%',
    'box-sizing': 'border-box',
    'position': 'relative',//needed for the absolute positioned child
  });
  drawBarCanvas(data, option, '#barchart');
}

$(document).ready(function () {drawBarChart([60471, 40046, 11430, 3934, 1445], {
  barColor: ['red', 'yellow', 'blue', 'orange', 'green', 'purple'],
  barLabel: ['QC', 'ON', 'AB', 'BC', 'SK'],
  barLabelPosition: 'top',
  title: 'Number of Covid Cases Per Provience',
  barSpacing: 4,
  xLabel: 'Provience',
  yLabel: 'Covid Cases',
  tickInterval: 10000,
  // chartHeight: 30,
},'#demo')});
