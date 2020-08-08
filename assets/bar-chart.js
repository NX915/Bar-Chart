function drawBarChart(data, option, element) {
  $(document).ready(function () {
    $(element).css({
      'width': '500px',
      'height': '250px',
      'backgroundColor': 'grey',
      'display': 'block',
      'border-radius': '10px',
      }
    );
    $('<div id="barchart"></div>').appendTo(element)
    $('#barchart').css({
      'width': '0px',
      'height': '0px',
      'position': 'relative',
      'top': '220px',
      'left': '20px',
      'transform': 'rotateX(180deg)',
    });
    $('<div id="bar1"></div>').appendTo('#barchart')
    $('#bar1').css({
      'width': '20px',
      'height': '100px',
      'backgroundColor': 'green',
      'display': 'flex',
      'left': '20px',
      'position': 'fixed',
    });
    $('<div id="bar2"></div>').appendTo('#barchart')
    $('#bar2').css({
      'width': '20px',
      'height': '150px',
      'backgroundColor': 'green',
      'display': 'flex',
      'left': '60px',
      'position': 'fixed',
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
  });
}

drawBarChart(0,0,'#demo');
