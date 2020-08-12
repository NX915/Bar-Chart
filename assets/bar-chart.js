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
  let subBarId, barPercent, colorStat = '';
  data = data[0] === undefined ? [data]: data;
  for (let i = 0; i < data.length; i++) {
    barHeight = data[i] / sumAll(data) * parseInt($(parent).css('height'));
    barPercent = data[i] / sumAll(data) * 100;
    subBarId = drawDiv(id + i, parent, {
    'width': '100%',
    'height': barPercent + '%',
    'position': 'relative',
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
      statId = drawLabel(subBarId, subBarId, data[i], option.barStatPosition === undefined ? 'top': option.barStatPosition);
      switch (option.barStatColor) {
      case '':
      case undefined:
        break;
      case 'bar':
        colorStat = $(subBarId).css('backgroundColor');
        break;
      default:
        colorStat = typeof option.barStatColor === 'string' ? option.barStatColor: option.barStatColor[i];
        break;
      }
      $(statId).css({
        'color': colorStat,
      });
    }
  }
}
function drawLabel (id, parent, data, position, css) {
  let dir, offset;
  parent = drawDiv(id + '_label_anchor', parent, {
    'width': '100%',
    'height': '100%',
    'position': 'absolute',
  });
  switch (position) {
  case 'bottom':
    dir = 'column-reverse';
    offset = 'translate(0px, 1.2em)';
    break;
  case 'top':
    offset = 'translate(0px, -1.1em)';
  default:
    dir = 'column';
    break;
  }
  parent = drawDiv(id + '_label_container', parent, {
    'width': '100%',
    'height': '100%',
    'display': 'flex',
    'positon': 'absolute',
    'text-align': 'center',
    'flex-direction': dir,
    'justify-content': position === 'center' ? 'center': 'flex-start',
  });

  return drawDiv(id + '_label', parent, typeof css === 'object' ? css: {
    'transform': offset,
  }, data);
}
function drawBars(data, option, element, interval, count) {
  let spacing = data.length, barHeight, barPercent;
  let colorBar = 'pink', colorLabel = '';
  let parentId, barParentId, barId, labelId;
  if (option.barSpacing !== undefined) {
    spacing = data.length + option.barSpacing;
  }
  if (typeof option.barColor === 'string' || typeof option.barColor === 'array' && option.barColor.length === 1) {
    colorBar = option.barColor;
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

  for (let i = 0; i < data.length; i++) {
    barHeight = sumAll(data[i]) * parseInt($(parentId).css('height')) / count / interval;
    barPercent = sumAll(data[i]) / (count * interval) * 100;
    if (option.barColor !== undefined && option.barColor[i] !== undefined) {
      colorBar = option.barColor[i];
    }
    barParentId = drawDiv(parentId + '_bar_container' + i, parentId, {
      // 'backgroundColor': 'pink',
      'flex': '0 0 calc(100% / ' + spacing + ')',
      'height': '100%',
      'position': 'relative',
      'display': 'flex',
      'flex-direction': 'column-reverse',
    });
    barId = drawDiv(parentId + '_bar' + i, barParentId, {
      'flex': '0 0 ' + barPercent + '%',
      'backgroundColor': colorBar,
      'z-index': '1',
      'position': 'relative',
      'display': 'flex',
      'flex-direction': 'column-reverse',
    });
    drawSubBars(data[i], barId + '_sub_', barId, option);

    if (option.barLabel !== undefined && option.barLabelPosition !== 'none') {
      labelId = drawLabel(barId, barId, option.barLabel[i], option.barLabelPosition === undefined ? 'bottom': option.barLabelPosition);
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
    }
  }
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
      'width': option.tickLength === undefined ? '100%': option.tickLength,
      // 'height': parseInt($(tickParentId).css('height')) / count + 'px',
      'flex': '1 1 ' + 100 / count + '%',
      'border-top': option.tickStyle !== undefined ? option.tickStyle: 'thin dashed',
      'display':'flex',
      'justify-content': 'flex-end',
      'z-index': '0',
    });
    drawDiv(element + '_tick_label_' + i, tickLabelParentId, {
      'font-size': '12px',
      'flex': '1 1 ' + 100 / count + '%',
      'color': option.axisLabelColor !== undefined ? option.axisLabelColor: '',
      // 'height': parseInt($(tickLabelParentId).css('height')) / count + 'px',
      // 'backgroundColor': 'pink',
      'transform': 'translate(0, -0.5em)',
      'text-align': 'right',
    }, interval * (i + 1));
  }
  drawBars(data, option, element, interval, count);
}
function drawBarChart(data, option, element) {
  if (element[0] === '#') {
    let barchartId = element.slice(1) + '_barchart';
    let width = '80%', height = '70%';
    let titleId, containerId;

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
      'color': () => option.barchartTitleColor !== undefined ? option.barchartTitleColor: '',
      'margin-bottom': '0.5em',
    }, option.title);
    if (option.barchartTitleCss !== undefined){
      $(titleId).css(option.barchartTitleCss);
    }
    containerId = drawDiv(barchartId + '_container', element, {
      // 'backgroundColor': 'red',
      'width': '100%',
      'height': '80%',
      'position': 'relative',
      'display': 'flex',
    },);
    drawDiv(barchartId + '_left_margin', containerId, {
      // 'backgroundColor': 'purple',
      'flex': '100 100 0px',
      'height': '100%',
    },);
    drawDiv(barchartId + '_y_axis_label_container', containerId, {
      // 'backgroundColor': 'green',
      'flex': '1 1 3%',
      'height': '100%',
      'text-align': 'center',
      'writing-mode': 'vertical-rl',
      'text-orientation': 'mixed',
      'transform': option.yLabelOffset !== undefined ? 'rotate(180deg) translate(' + option.yLabelOffset + ')': 'rotate(180deg)',
      'color': option.axisLabelColor !== undefined ? option.axisLabelColor: '',
    }, option.yLabel);
    drawDiv(barchartId + '_y_ticks_container', containerId, {
      // 'backgroundColor': 'yellow',
      'flex': '1 1 3%',
      'height': '100%',
    });
    drawDiv(barchartId, containerId, {
      // 'backgroundColor': 'cyan',
      'width': width,
      'height': '100%',
      'box-sizing': 'border-box',
      'border-left': option.axisStyle !== undefined ? option.axisStyle: 'solid',
      'border-bottom': option.axisStyle !== undefined ? option.axisStyle: 'solid',
      'position': 'relative',//needed for the absolute positioned child
    });
    drawDiv(barchartId + '_legend_container', containerId, {
      // 'backgroundColor': 'green',
      'width': '10%',
      'height': '100%',
    });
    drawBarCanvas(data, option, barchartId);
    drawDiv(barchartId + '_x_label_container', element, {
      // 'backgroundColor': 'orange',
      'width': '100%',
      'height': '5%',
      'position': 'relative',
    },);
    drawDiv(barchartId + '_x_axis_label_container', element, {
      // 'backgroundColor': 'blue',
      'width': '100%',
      'height': '10%',
      'position': 'relative',
      'text-align': 'center',
      // 'margin-top': '1.2em',
      'transform': option.xLabelOffset !== undefined ? 'translate(0px, ' + option.xLabelOffset + ')': '',
      'color': option.axisLabelColor !== undefined ? option.axisLabelColor: '',
    }, option.xLabel);

  } else {
    alert('Bar Chart Error! Parent ID not found.');
  }
}
