var quineloop = (function() {

    var Mandelbrot = function(args){
        var i = 0, canvas, ctx, me = this

        var init = function(args){
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

        var draw = function(){
            var img_data = ctx.createImageData(1, 1)
            var pixel_data = img_data.data
            var real_scale = d3.scale.linear()
                .domain([0,me.width])
                .range([-2.0, 1])
            var imgr_scale = d3.scale.linear()
                .domain([0,me.height])
                .range([1, -1])
            var color_scale = d3.scale.category20()
                .domain([1, 1000])

            var render_segment = function(init_idx, segment_width, full_width){
                var end_idx = init_idx + segment_width > full_width ? full_width
                    : init_idx + segment_width
                for(var i = init_idx; i < end_idx; i++) {
                    for(var j = 0; j < me.height; j++) {

                        var x_0 = real_scale(i), y_0 = imgr_scale(j),
                            x = 0, y = 0, itr = 0, max_itr = 1000

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
                            var non_blk_color = d3.rgb( color_scale(itr) )
                            pixel_data[0] = non_blk_color.r
                            pixel_data[1] = non_blk_color.g
                            pixel_data[2] = non_blk_color.b
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
            window.setTimeout( render_segment(0, Math.floor(me.width / 3), me.width), 0 )
        }

        me.reset = function(){
        }

        init(args)
        return me
    }

    return { Mandelbrot: Mandelbrot }
})()

$(window).load(function(){
    var mandelbrot = new quineloop.Mandelbrot({ eid: "mandelbrot" })
})
