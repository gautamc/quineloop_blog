var quineloop = (function() {

  var Mandelbrot = function(args) {
    var i = 0, canvas, ctx, me = this

    var init = function(args) {
      me.args = args
      me.width = $("#"+args.eid).width() / 2 //$("#"+args.eid).width()
      me.height =  me.width / 1.7

      canvas = document.getElementById(args.eid).appendChild(
        document.createElement('canvas')
      )
      canvas.setAttribute("class", "mandelbrot-canvas")
      canvas.setAttribute("height", me.height)
      canvas.setAttribute("width", me.width)
      ctx = canvas.getContext('2d')

      draw()
    }

    var draw = function() {
      var img_data = ctx.createImageData(1, 1)
      var pixel_data = img_data.data
      var real_scale = d3.scale.linear()
        .domain([0,me.width])
        .range([-2.0, 1])
      var imgr_scale = d3.scale.linear()
        .domain([0,me.height])
        .range([1, -1])
      var color_scale = d3.scale.category20()
        .domain([1, 100])
      var blue_scale = d3.scale.pow()
      .domain([1,20])
      .range([50, 255])

      var render_segment = function(init_idx, segment_width, full_width){
        var end_idx = init_idx + segment_width > full_width ? full_width
          : init_idx + segment_width
        for(var i = init_idx; i < end_idx; i++) {
          for(var j = 0; j < me.height; j++) {

            var x_0 = real_scale(i), y_0 = imgr_scale(j),
            x = 0, y = 0, itr = 0, max_itr = 100

            while( ((x*x)+(y*y) < 4) && (itr < max_itr) ){
              var x_temp = ((x*x) - (y*y)) + x_0
              y = (2 * x * y) + y_0
              x = x_temp
              itr = itr + 1
            }
            if( itr == max_itr ) {
              pixel_data[0] = 0
              pixel_data[1] = 0
              pixel_data[2] = 0
              pixel_data[3] = 255
              ctx.putImageData(img_data, i, j)
            } else {
              //var non_blk_color = d3.rgb( color_scale(itr) )
              pixel_data[0] = 0 //non_blk_color.r
              pixel_data[1] = 0 //non_blk_color.g
              pixel_data[2] = blue_scale(itr) //non_blk_color.b
              pixel_data[3] = 255
              ctx.putImageData(img_data, i, j)
            }
          }
        }

        if(end_idx == full_width) {
          $("div#rendering-mandelbrot").hide()
        } else {
          window.setTimeout( render_segment(end_idx, segment_width, full_width), 0 )
        }
      }
      window.setTimeout( render_segment(0, Math.floor(me.width / 3), me.width), 3000 )
    }

    me.reset = function() {
    }

    init(args)
    return me
  }

  var Demo = function() {
    var width = 200, height = 200, canvas, ctx, one_pixel, real_scale, imaginary_scale

    canvas = document.getElementById("demo").appendChild(
      document.createElement('canvas')
    )
    canvas.setAttribute("height", height)
    canvas.setAttribute("width", width)
    ctx = canvas.getContext('2d')
    one_pixel = ctx.createImageData(1, 1)

    real_scale = d3.scale.linear()
      .domain([0, width])
      .range([-2.0, 1])

    imaginary_scale = d3.scale.linear()
      .domain([0, height])
      .range([1, -1])

    var blue_scale = d3.scale.pow()
      .domain([1,20])
      .range([50, 255])

    for(var r = 0; r < width; r++) {
      for(var i = 0; i < height; i++) {

        // c => The given complex number
        var c = { r: real_scale(r), i: imaginary_scale(i) }
        var z = { r: 0, i: 0 }
        var math_op_loop_count = 0
        var max_op_loop_count = 100

        // (z.r * z.r) + (z.i * z.i) => Absolute value of the complex number z 
        while( ((z.r * z.r) + (z.i * z.i) < 4) && (math_op_loop_count < max_op_loop_count) ) {

          // square z - remember that z.r and z.i must both be
          // updated at the same time; hence we use new_z to
          // temporarily store the partially calculated result
          var new_z = {}
          new_z.r = (z.r * z.r) - (z.i * z.i)
          new_z.i = (2 * z.r * z.i)

          // add c to new_z
          new_z.r = new_z.r + c.r
          new_z.i = new_z.i + c.i

          z = new_z

          math_op_loop_count = math_op_loop_count + 1
        }

        if( math_op_loop_count == max_op_loop_count ) {
          one_pixel.data[0] = 0
          one_pixel.data[1] = 0
          one_pixel.data[2] = 0
          one_pixel.data[3] = 255
          ctx.putImageData(one_pixel, r, i)
        } else {
          one_pixel.data[0] = 0
          one_pixel.data[1] = 0
          one_pixel.data[2] = blue_scale(math_op_loop_count)
          one_pixel.data[3] = 255
          ctx.putImageData(one_pixel, r, i)
        }
      }
    }
  }

  return { Mandelbrot: Mandelbrot, Demo: Demo }
})()

$(document).ready(
  function(){
    window.setTimeout(
      function() {
        var mandelbrot = new quineloop.Mandelbrot({ eid: "mandelbrot" })
      },
      1000
    )

    $("#run_demo").click(function(evt) {
      evt.preventDefault();
      var demo = quineloop.Demo()
    })
  }
)
