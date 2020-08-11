function sumAll (data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] !== 'number') {
      sum += sumAll(data[i]);
    } else {
      sum += data[i];
    }
  }
  return sum;
}
function findMax(data) {
  let max = 0, ele;
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] !== 'number') {
      ele = sumAll(data[i]);
    } else {
      ele = data[i];
    }
    if (ele > max) {
      max = ele;
    }
  }
  return max;
}
function findInterval(data) {
  let interval = '1', max = findMax(data);
  let numTxt = max.toString().split('.');
  for (let i = 0; i < numTxt[0].length - 1; i++) {
    interval += '0';
  }
  return parseInt(interval);
}
function drawDiv (id, parent, css, content) {
  //css and html content optional, return id with #
  if (id[0] === '#') {
    id = id.slice(1);
  }
  if (parent[0] !== '#') {
    parent = '#' + parent;
  }
  if (content === undefined) {
    content = '';
  }
  $('<div id="'+ id + '">' + content + '</div>').appendTo(parent);
  if (id[0] !== '#') {
    id = '#' + id;
  }
  if (typeof css === 'object') {
    $(id).css(css);
  }
  return id;
}
function drawBars(data, option, element, barchartId, interval, count) {
  let scale, spacing = data.length;
  let colorBar = 'pink', colorLabel = 'black', colorStat = 'black';
  let parentId, barId, labelParentId, labelId, statId;
  if (option.barSpacing !== undefined) {
    spacing = data.length + option.barSpacing;
  }

  parentId = drawDiv(barchartId + '_bar_container', element, {
    'width': '100%',
    'height': '100%',
    // 'backgroundColor': 'green',
    'position': 'absolute',
    'display': 'flex',
    'flex-flow': 'row',
    'align-items': 'flex-end',
    'justify-content': 'space-evenly',
  });
  scale = parseInt($(parentId).css('height')) / count / interval;

  for (let i = 0; i < data.length; i++) {
    if (option.barColor !== undefined && option.barColor[i] !== undefined) {
      colorBar = option.barColor[i];
    }
    barId = drawDiv(parentId + '_bar_' + i, parentId, {
      'flex': '0 0 calc(100% / ' + spacing + ')',
      'height': (data[i] * scale) +'px',
      'backgroundColor': colorBar,
      'z-index': '1',
      'position': 'relative',
    });
    labelParentId = drawDiv(barId + '_label_container', barId, {
      'width': '100%',
      'height': '100%',
      'position': 'absolute',
    });
    if (option.barLabel !== undefined && option.barLabel[i] !== undefined) {
      labelId = drawDiv(barId + '_label', labelParentId, {
        'width': '100%',
        // 'font-size': '30px',
        'text-align': 'center',
        'position': 'absolute',
      }, option.barLabel[i]);
      switch (option.barLabelColor) {
      case '':
      case undefined:
        break;
      case 'bar':
        colorLabel = colorBar;
        break;
      default:
        colorLabel = option.barLabelColor;
        break;
      }
      $(labelId).css({
        'color': colorLabel,
      });

      switch (option.barLabelPosition) {
      case 'top':
        $(labelId).css({
          'transform': 'translate(0, -1em)',
        });
        break;
      case 'center':
        $(labelId).css({
          'transform': 'translate(0, calc(' + (data[i] * scale)/2 + 'px - 0.5em))',
        });
        break;
      default:
        $(labelId).css({
          'transform': 'translate(0, calc(' + (data[i] * scale) + 'px))',
        });
        break;
      }
    }
    if (option.barStatPosition !== 'none') {
      statId = drawDiv(barId + '_stat', labelParentId, {
        'width': '100%',
        // 'font-size': '30px',
        'text-align': 'center',
        'position': 'absolute',
      }, data[i]);
      switch (option.barStatColor) {
      case '':
      case undefined:
        break;
      case 'bar':
        colorStat = colorBar;
        break;
      default:
        colorStat = option.barStatColor;
        break;
      }
      $('#' + barchartId + 'bar_' + i + '_stat').css({
        'color': colorStat,
      });
      switch (option.barStatPosition) {
      case 'bottom':
        $(statId).css({
          'transform': 'translate(0, calc(' + (data[i] * scale) + 'px))',
        });
        break;
      case 'center':
        $(statId).css({
          'transform': 'translate(0, calc(' + (data[i] * scale)/2 + 'px - 0.5em))',
        });
        break;
      default:
        $(statId).css({
          'transform': 'translate(0, -1em)',
        });
        break;
      }
    }
  }
}
function drawAxis(option, element, barchartId) {
  let xLabel = '', yLabel = '';
  let axisParentId, yAxisId, xAxisId;
  if (option.xLabel !== undefined) {
    xLabel = option.xLabel;
  }
  if (option.yLabel !== undefined) {
    yLabel = option.yLabel;
  }

  axisParentId = drawDiv(barchartId + '_axis_container', element, {
    'width': '100%',
    'height': '100%',
    'display':'flex',
    'flex-direction': 'row',
    'align-items': 'flex-end',
  });
  yAxisId = drawDiv(barchartId + '_y_axis', axisParentId, {
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
  drawDiv(yAxisId + '_label', yAxisId, {
    // 'backgroundColor': 'pink',
    // 'font-size': '25px',
    'text-align': 'center',
    'width': $('#' + barchartId + '_y_axis').css('height'),
    'height': '8em',
    'transform': 'rotate(-90deg)',
    'color': 'black',
  }, option.yLabel);

  xAxisId = drawDiv(barchartId + '_x_axis', axisParentId, {
    'width': '100%',
    'height': '1%',
    // 'backgroundColor': 'black',
    'border-bottom': 'solid black',
    'display':'flex',
    'flex-direction': 'row',
    'z-index': '2',
  });
  drawDiv(xAxisId + '_label', xAxisId, {
    // 'backgroundColor': 'pink',
    'text-align': 'center',
    'width': '100%',
    'transform': 'translate(0px, 1.5em)',
    'color': 'black',
  }, option.xLabel);
}
function drawBarCanvas(data, option, element, barchartId) {
  let interval, count;
  let tickParentId, tickLabelParentId;
  if (typeof option.tickInterval === 'number') {
    interval = option.tickInterval;
  } else {
    interval = findInterval(data);
  }
  if (typeof option.chartHeight === 'number') {
    count = Math.ceil(option.chartHeight / interval);
  } else {
    count = Math.ceil(findMax(data) / interval);
  }

  tickParentId = drawDiv(barchartId + '_ticks_container', element, {
    'width': '100%',
    'height': '100%',
    // 'backgroundColor': 'pink',
    'display':'flex',
    'flex-direction': 'column-reverse',
    'justify-content': 'flex-end',
    'position': 'absolute',
    // 'align-items': 'flex-end',
  });

  tickLabelParentId = drawDiv(barchartId + '_ticks_label_container', element, {
    'width': '3em',
    'height': '100%',
    // 'backgroundColor': 'pink',
    'position': 'absolute',
    'display':'flex',
    'flex-direction': 'column-reverse',
    'justify-content': 'flex-end',
    'transform': 'translate(-3.5em)',
  });

  for (let i = 0; i < count; i++) {
    drawDiv(barchartId + '_tick_' + i, tickParentId, {
      'width': '100%',
      'height': parseInt($(tickParentId).css('height')) / count + 'px',
      'border-top': 'thin dashed black',
      'display':'flex',
      'justify-content': 'flex-end',
      'z-index': '0',
    });
    drawDiv(barchartId + '_tick_label_' + i, tickLabelParentId, {
      'font-size': '12px',
      'height': parseInt($(tickLabelParentId).css('height')) / count + 'px',
      // 'backgroundColor': 'pink',
      'transform': 'translate(0, -0.5em)',
      'text-align': 'right',
    }, interval * (i + 1));
  }
  drawBars(data, option, element, barchartId, interval, count);
  drawAxis(option, element, barchartId);
}
function drawBarChart(data, option, element) {
  let barchartId = 'barchart_'+ Math.ceil(Math.random() * 10000);
  let width = '80%', height = '70%';
  if (option.barchartWidth !== undefined) {
    width = option.barchartWidth;
  }
  if (option.barchartHeight !== undefined) {
    height = option.barchartHeight;
  }
  $(element).css({
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'center',
    }
  );
  $('<div id="' + barchartId + '_title">' + option.title + '</div>').appendTo(element);
  $('#' + barchartId + '_title').css({
    // 'backgroundColor': 'pink',
    'flex': '0 0 10%',
    'text-align': 'center',
    'font-size': '40px',
    'margin': '0.5em',
    'margin-bottom': '0em',
  });
  $('<div id="' + barchartId + '"></div>').appendTo(element);
  $('#' + barchartId).css({
    // 'backgroundColor': 'cyan',
    'width': width,
    'height': height,
    'box-sizing': 'border-box',
    'position': 'relative',//needed for the absolute positioned child
  });
  drawBarCanvas(data, option, '#' + barchartId);
}

$(document).ready(function () {drawBarChart([60471, 40046, 11430, 3934, 1445], {
  barColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
  barLabel: ['QC', 'ON', 'AB', 'BC', 'SK'],
  // barchartWidth: 'auto',
  // barchartHeight: '600px',
  // barLabelPosition: 'top',
  // barStatPosition: 'center',
  barLabelColor: 'black',
  barStatColor: 'bar',
  title: 'Number of Covid Cases Per Provience',
  barSpacing: 4,
  xLabel: 'Provience',
  yLabel: 'Covid Cases',
  // tickInterval: 5000,
  // chartHeight: 30,
},'#demo2')});
$(document).ready(function () {drawBarChart([1, 2, 3, 4, 5, 6, 7, 8, 9, 11], {
  // barColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
  barLabel: ['one', 'two', 'three', 'four', 'five'],
  // barLabelPosition: 'top',
  barStatPosition: 'none',
  // barLabelColor: 'bar',
  // barStatColor: '#ff1430',
  title: 'Numbers',
  barSpacing: 2,
  xLabel: 'X label',
  yLabel: 'Y label',
  // tickInterval: 2,
  // chartHeight: 30,
},'#demo')});
