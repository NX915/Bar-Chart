function drawBarChart(data, option, element) {
  $(element).css({
    'width': 'auto',
    'height': '250px',
    'backgroundColor': 'grey',
    'display': 'block',
    }
  );
  $('<div id="barchart"></div>').appendTo(element)
  $('#barchart').css({
    'width': '100%',
    'height': '100%',
    'position': 'relative',
    'top': '-20px',
    'left': '20px',
    'transform': 'rotateX(180deg)',
  });
  $('<div id="bar_container"></div>').appendTo('#barchart')
  $('#bar_container').css({
    'width': '400px',
    'height': '200px',
    'backgroundColor': 'green',
    'display': 'flex',
    'flex-flow': 'row',
    'align-items': 'flex-start',
    'justify-content': 'space-evenly',
    'position': 'fixed',
  });
  $('<div id="bar1"></div>').appendTo('#bar_container')
  $('#bar1').css({
    'width': '20px',
    'height': '200px',
    'backgroundColor': 'red',
  });
  $('<div id="bar2"></div>').appendTo('#bar_container')
  $('#bar2').css({
    'width': '20px',
    'height': '100px',
    'backgroundColor': 'blue',
  });
  $('<div id="bar3"></div>').appendTo('#bar_container')
  $('#bar3').css({
    'width': '20px',
    'height': '150px',
    'backgroundColor': 'yellow',
  });
  $('<div id="barchart_vertical_line"></div>').appendTo('#barchart');
  $('#barchart_vertical_line').css({
    'width': '2px',
    'height': '200px',
    'backgroundColor': 'black',
    'position': 'fixed',
  });
  $('<div id="barchart_horizontal_line"></div>').appendTo('#barchart');
  $('#barchart_horizontal_line').css({
    'width': '400px',
    'height': '2px',
    'backgroundColor': 'black',
    'position': 'fixed',
  });
}

$(document).ready(function () {drawBarChart(0,0,'#demo')});
