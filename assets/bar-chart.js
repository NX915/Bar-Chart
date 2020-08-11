function sumAll (data) {
  let sum = 0;
  if (data.length === undefined) {
    return data;
  }
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
function randomColor() {
  return 'rgb(' + Math.ceil(Math.random() * 255) + ', ' + Math.ceil(Math.random() * 255) + ', ' + Math.ceil(Math.random() * 255) + ')';
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
function drawSubBars (data, id, parent, option) {
  let subBarId, barHeight, barPercent;
  data = data[0] === undefined ? [data]: data;
  for (let i = 0; i < data.length; i++) {
    barHeight = data[i] / sumAll(data) * parseInt($(parent).css('height'));
    barPercent = data[i] / sumAll(data) * 100;
    subBarId = drawDiv(id + i, parent, {
    'width': '100%',
    'height': barPercent + '%',
    'backgroundColor': () => {
      if (data.length === 1) {
        return 'transparent';
      } else if (option.barColor !== undefined) {
        return option.barColor[i];
      } else {
        return randomColor();
      }
    },
    });
    if (option.barStatPosition !== 'none') {
      statId = drawDiv(id + '_stat_' + i, subBarId, {
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
        colorStat = $(subBarId).css('backgroundColor');
        break;
      default:
        colorStat = option.barStatColor === 'string' ? option.barStatColor: option.barStatColor[i];
        break;
      }
      $(statId).css({
        'color': colorStat,
      });
      switch (option.barStatPosition) {
      case 'bottom':
        $(statId).css({
          'transform': 'translate(0, calc(' + barHeight + 'px))',
        });
        break;
      case 'center':
        $(statId).css({
          'transform': 'translate(0, calc(' + barHeight / 2 + 'px - 0.5em))',
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
function drawBars(data, option, element, interval, count) {
  let scale, spacing = data.length, barHeight;
  let colorBar = 'pink', colorLabel = 'black', colorStat = 'black';
  let parentId, barId, labelParentId, labelId, statId;
  if (option.barSpacing !== undefined) {
    spacing = data.length + option.barSpacing;
  }

  parentId = drawDiv(element + '_bar_container', element, {
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
    barHeight = sumAll(data[i]) * scale;
    if (option.barColor !== undefined && option.barColor[i] !== undefined) {
      colorBar = option.barColor[i];
    }
    barId = drawDiv(parentId + '_bar_' + i, parentId, {
      'flex': '0 0 calc(100% / ' + spacing + ')',
      'height': barHeight +'px',
      'backgroundColor': colorBar,
      'z-index': '1',
      'position': 'relative',
      'display': 'flex',
      'flex-direction': 'column-reverse',
    });

    drawSubBars(data[i], barId + '_sub_', barId, option);

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
          'transform': 'translate(0, calc(' + barHeight / 2 + 'px - 0.5em))',
        });
        break;
      default:
        $(labelId).css({
          'transform': 'translate(0, calc(' + barHeight + 'px))',
        });
        break;
      }
    }
  }
}
function drawAxis(option, element) {
  let xLabel = '', yLabel = '';
  let axisParentId, yAxisId, xAxisId;
  if (option.xLabel !== undefined) {
    xLabel = option.xLabel;
  }
  if (option.yLabel !== undefined) {
    yLabel = option.yLabel;
  }

  axisParentId = drawDiv(element + '_axis_container', element, {
    'width': '100%',
    'height': '100%',
    'display':'flex',
    'flex-direction': 'row',
    'align-items': 'flex-end',
  });
  yAxisId = drawDiv(element + '_y_axis', axisParentId, {
    'width': '0px',
    'height': $(axisParentId).css('height'),
    'position': 'absolute',
    'display':'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'border-left': option.axisColor !== undefined ? 'solid ' + option.axisColor: 'solid black',
  });
  drawDiv(yAxisId + '_label', yAxisId, {
    // 'backgroundColor': 'pink',
    // 'font-size': '25px',
    'text-align': 'center',
    'width': $(yAxisId).css('height'),
    'height': '8em',
    'transform': 'rotate(-90deg)',
    'color': option.axisColor !== undefined ? option.axisColor: 'black',
  }, option.yLabel);

  xAxisId = drawDiv(element + '_x_axis', axisParentId, {
    'width': '100%',
    'height': '1%',
    // 'backgroundColor': 'black',
    'border-bottom': option.axisColor !== undefined ? 'solid ' + option.axisColor: 'solid black',
    'display':'flex',
    'flex-direction': 'row',
    'z-index': '2',
  });
  drawDiv(xAxisId + '_label', xAxisId, {
    // 'backgroundColor': 'pink',
    'text-align': 'center',
    'width': '100%',
    'transform': 'translate(0px, 1.5em)',
    'color': option.axisColor !== undefined ? option.axisColor: 'black',
  }, option.xLabel);
}
function drawBarCanvas(data, option, element) {
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

  tickParentId = drawDiv(element + '_ticks_container', element, {
    'width': '100%',
    'height': '100%',
    // 'backgroundColor': 'pink',
    'display':'flex',
    'flex-direction': 'column-reverse',
    'justify-content': 'flex-end',
    'position': 'absolute',
    // 'align-items': 'flex-end',
  });

  tickLabelParentId = drawDiv(element + '_ticks_label_container', element, {
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
    drawDiv(element + '_tick_' + i, tickParentId, {
      'width': '100%',
      'height': parseInt($(tickParentId).css('height')) / count + 'px',
      'border-top': option.tickStyle !== undefined ? option.tickStyle: 'thin dashed black',
      'display':'flex',
      'justify-content': 'flex-end',
      'z-index': '0',
    });
    drawDiv(element + '_tick_label_' + i, tickLabelParentId, {
      'font-size': '12px',
      'color': option.axisColor !== undefined ? option.axisColor: 'black',
      'height': parseInt($(tickLabelParentId).css('height')) / count + 'px',
      // 'backgroundColor': 'pink',
      'transform': 'translate(0, -0.5em)',
      'text-align': 'right',
    }, interval * (i + 1));
  }
  drawBars(data, option, element, interval, count);
  drawAxis(option, element);
}
function drawBarChart(data, option, element) {
  let barchartId = 'barchart_'+ Math.ceil(Math.random() * 10000);
  let width = '80%', height = '70%';
  let titleId;
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

  titleId = drawDiv(barchartId + '_title', element, {
    // 'backgroundColor': 'pink',
    'flex': '0 0 10%',
    'text-align': 'center',
    'font-size': () => option.barchartTitleSize !== undefined ? option.barchartTitleSize: '40px',
    'color': () => option.barchartTitleColor !== undefined ? option.barchartTitleColor: 'black',
    'margin-bottom': '0.5em',
  }, option.title);
  if (option.barchartTitleCss !== undefined){
    $(titleId).css(option.barchartTitleCss);
  }

  drawDiv(barchartId, element, {
    // 'backgroundColor': 'cyan',
    'width': width,
    'height': height,
    'box-sizing': 'border-box',
    'position': 'relative',//needed for the absolute positioned child
  });
  drawBarCanvas(data, option, barchartId);
}
