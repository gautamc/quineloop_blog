var quineloop = (function() {

    var DeadChannel = function(args){
        var i = 0, canvas, ctx, me = this

        var init = function(args){
            me.args = args
            me.width = $("#"+args.eid).width()
            me.height = 100

            canvas = document.getElementById(args.eid).appendChild(
                document.createElement('canvas')
            )
            canvas.setAttribute("class", "dead-channel-canvas")
            canvas.setAttribute("height", me.height)
            canvas.setAttribute("width", me.width)
            ctx = canvas.getContext('2d')

            draw()
        }

        var draw = function(){
            var img_data = ctx.createImageData(1, 1)
            var pixel_data = img_data.data
            for(var x = 0; x < me.width; x++) {
                for(var y = 0; y < 100; y++) {
                    pixel_data[0] = (Math.random()*1000)%255
                    pixel_data[1] = (Math.random()*1000)%255
                    pixel_data[2] = (Math.random()*1000)%255
                    pixel_data[3] = (Math.random()*1000)%255
                    ctx.putImageData(img_data, x, y)
                }
            }
            
        }

        me.reset = function(){
        }

        init(args)
        return me
    }

    var Mandelbrot = function(args){
        var i = 0, canvas, ctx, me = this

        var init = function(args){
            me.args = args
            me.width = $("#"+args.eid).width()
            me.height = me.width

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
            for(var x = 0; x < me.width; x++) {
                for(var y = 0; y < 100; y++) {
                    pixel_data[0] = (Math.random()*1000)%255
                    pixel_data[1] = (Math.random()*1000)%255
                    pixel_data[2] = (Math.random()*1000)%255
                    pixel_data[3] = (Math.random()*1000)%255
                    ctx.putImageData(img_data, x, y)
                }
            }
            
        }

        me.reset = function(){
        }

        init(args)
        return me
    }


    return { DeadChannel: DeadChannel, Mandelbrot: Mandelbrot }
})()

$(document).ready(function(){
    var dead_channel = new quineloop.DeadChannel({ eid: "dead-channel" })
    var mandelbrot = new quineloop.Mandelbrot({ eid: "mandelbrot" })
})