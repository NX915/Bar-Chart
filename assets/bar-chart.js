function drawBarChart(data, option, element) {
  $(document).ready(function () {
    $(element).css({
      'width': '500px',
      'height': '250px',
      'backgroundColor': 'grey',
      'display': 'block',
      }
    );
    $('<div id="barchart_lines"></div>').appendTo(element)
    $('#barchart_lines').css({
      'width': '0px',
      'height': '0px',
      'backgroundColor': 'green',
      'position': 'relative',
      'top': '20px',
      'left': '20px',
    });
    $('<div id="barchart_vertical_line"></div>').appendTo('#barchart_lines');
    $('#barchart_vertical_line').css({
      'width': '2px',
      'height': '200px',
      'backgroundColor': 'black',
    });
    $('<div id="barchart_horizontal_line"></div>').appendTo('#barchart_lines');
    $('#barchart_horizontal_line').css({
      'width': '400px',
      'height': '2px',
      'backgroundColor': 'black',
    });
  });
}
$(document).ready(function() {
  // alert('loaded');
  $('a').addClass('test');
})
$('a').click(function(event) {
  event.preventDefault();
  $('a').removeClass('test');
  //alert('clicked a');
  $(this).hide('slow');
})

drawBarChart(0,0,'#demo');
