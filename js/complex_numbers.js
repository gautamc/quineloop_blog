$(document).ready(
  function() {
    var extent = 10, width = 500, height = 500, margin = { top:10, left:10, bottom:10, right:10 },
    plotWidth = width-(margin.left+margin.right), plotHeight = height-(margin.top+margin.bottom),
    point, point_lbl, selected_point

    var window_width = $( window ).width()
    if( window_width < 525 ) {
      $(".complex-plane").css('width', (window_width-20)+'px')
      $(".complex-plane").css('overflow-x', 'scroll')
    }

    var scaleX = d3.scale.linear()
      .domain([-extent, +extent])
      .range([0, plotWidth]);

    var scaleY = d3.scale.linear()
      .domain([extent, -extent])
      .range([0, plotHeight]);

    var xAxis = d3
      .svg.axis()
      .scale(scaleX)
      .orient('bottom')
      .ticks(20);

    var yAxis = d3
      .svg.axis()
      .scale(scaleY)
      .orient('left')
      .ticks(20)
      .tickFormat(function(d){
        if( d == 0 )
          return d
        else if ( d == 1 || d == -1 )
          return 'i'
        else
          return d + 'i';
      });

    var svg = d3.select('.complex-plane').append('svg')
      .attr({
	width: 500,
	height: 500
      })
      .append('g')
      .attr('transform','translate('+margin.left+','+margin.top+')')

    svg
      .append("rect")
      .attr({ "class": "overlay" , "width": plotWidth , "height": plotHeight })
      .on("click", function(){
        var [x, y] = d3.mouse(this);
        var complex = {
	  r: d3.round(scaleX.invert(x), 2),
	  i: d3.round(scaleY.invert(y), 2)
	};
        point.attr({
          'cx': x,
          'cy': y
        })
        var text_anchor, lbl_x, lbl_y = y-5;
        if( parseFloat(point.attr('cx')) > 300 ) {
          lbl_x = x
          text_anchor = 'end'
        } else {
          lbl_x = x+5
          text_anchor = 'start'
        }
        if( parseFloat(point.attr('cy')) < 20 ) {
          lbl_y = y+15
        }
        point_lbl.attr({
          'x': lbl_x,
          'y': lbl_y,
          'text-anchor': text_anchor
        })
        .text(complex.r + ' + ' + complex.i + 'i')
        d3.event.stopPropagation()
      })

    svg.append('g').attr({
      'class': 'x axis',
      'transform': 'translate(0,'+plotWidth/2+')'
    }).call(xAxis);

    svg.append('g').attr({
      'class': 'y axis',
      'transform': 'translate('+plotHeight/2+',0)'
    }).call(yAxis);

    var selected_point = svg.append('g');
    var point = selected_point
      .append('circle')
      .attr({
        'id': 'point',
        'r': 5,
        'fill': 'blue',
        'cx': function() { return scaleX(1.0) },
        'cy': function() { return scaleY(1.0) }
      })
    var point_lbl = selected_point
      .append('text')
      .attr({
        'id': 'point-lbl',
        'x': function() { return parseFloat(point.attr('cx')) + 5 },
        'y': function() { return parseFloat(point.attr('cy')) - 5 },
        'fill': 'blue'
      })
      .text('1.0 + 1.0i')
  }
)