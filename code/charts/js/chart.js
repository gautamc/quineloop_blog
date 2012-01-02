var ChartView = Backbone.View.extend({
    
    root_elem_id: "",
    canvas_ref: "",
    height: null,
    width: null,
    
    initialize: function(args){
	this.root_elem_id = args["id"];
	
	var root_elem = $("#" + this.root_elem_id);
	var canvas_elem = document.createElement("canvas");
	canvas_elem.style.zIndex = 0;
	$(root_elem).append(canvas_elem);
	this.canvas_ref = $("#" + this.root_elem_id + " canvas");
	this.canvas_ref = this.canvas_ref[0];
	
	_.bindAll(this, 'render');
    },
    
    render: function(){
	
	var chart_obj = this;
	
	var doc_height = $(document).height();
	var doc_width = $(document).width();
	var root_elem = $("#" + this.root_elem_id);
	
	this.canvas_ref.width = $(root_elem).width();
	this.canvas_ref.height = $(root_elem).height();
	this.width = this.canvas_ref.width;
	this.height = this.canvas_ref.height;
		
	if( this.canvas_ref.getContext ){
	    
	    var ctx = this.canvas_ref.getContext('2d');
	    /*this.canvas_ref.addEventListener("click", function(e){
		var point = chart_obj.getAbsCursorPosition(e);
		$(root_elem).append(chart_obj.bubble(point));
	    }, false);*/
	    
	    var cp = new Array(
		174.20, 195.65, 195.25, 192.45, 194.05, 186.30, 190.95, 210.50, 214.40,
		209.80, 220.65, 217.50, 216.65, 219.95, 215.60, 216.80, 214.90, 227.15,
		231.80, 226.35, 229.00, 230.05, 228.30, 230.70, 229.65, 228.00, 220.25,
		202.50, 208.35, 217.40, 222.60, 222.75, 215.45, 213.95, 208.35, 200.00,
		198.95, 198.05, 174.15, 181.30, 171.75, 157.10, 164.45, 156.85, 165.85,
		167.10, 169.05, 174.55, 166.45, 170.05, 168.45, 173.00, 181.55, 184.65,
		187.50, 186.05, 179.80, 177.95, 178.75, 180.00, 170.50, 169.70, 171.15,
		168.55, 171.65, 172.20, 179.45, 179.70, 189.60, 197.00, 189.00, 192.55,
		194.60, 202.45, 198.35, 194.90, 195.35, 191.80, 187.15, 171.65, 172.35,
		169.65, 166.75, 162.35, 166.05, 164.10, 165.05, 167.00, 165.60, 168.10,
		171.75, 174.30, 173.25, 171.85, 165.60, 163.65, 169.90, 166.30, 165.20,
		160.60, 158.70
	    );
	    
	    /*cp = new Array(
	      174.20, 195.65, 195.25, 192.45, 194.05, 186.30, 190.95, 210.50, 214.40,
	      209.80, 220.65, 217.50, 216.65, 219.95, 215.60, 216.80, 214.90, 227.15
	      );
	      
	      cp = new Array(
	      174.20, 195.65, 195.25, 192.45, 194.05, 186.30, 190.95, 210.50, 214.40,
	      209.80, 231.80
	      );
	      
	      cp = new Array(
	      174.20, 195.65, 195.25, 192.45, 194.05, 186.30, 190.95, 210.50, 214.40,
	      209.80
	      );*/
	    
	    var max_y_val = Math.ceil(Math.max.apply(Math, cp));
	    var min_y_val = Math.floor(Math.min.apply(Math, cp));
	    var total_entries = cp.length;
	    
	    var x_tick_span = Math.floor(this.width/total_entries);
	    var y_range_length = max_y_val-min_y_val;
	    var y_tick_span = Math.floor(this.height/y_range_length);
	    
	    /*console.log(
		min_y_val + " : " + max_y_val + " : " + total_entries + " : "
		    + x_tick_span + " : " + y_tick_span, " : " + y_range_length
	    );*/
	    
	    ctx.strokeStyle = '#0ee';
	    ctx.lineWidth = 1;
	    ctx.beginPath();
	    for (i=0; i<total_entries; i++) {
		ctx.moveTo((i*x_tick_span)-0.5, 0);
		ctx.lineTo((i*x_tick_span)-0.5, this.height);
	    }
	    ctx.stroke();
	    
	    ctx.beginPath();
	    for (i=0; i<y_range_length; i++) {
		ctx.moveTo(0, (i*y_tick_span)-0.5);
		ctx.lineTo(this.width, (i*y_tick_span)-0.5);
	    }
	    ctx.stroke();
	    
	    ctx.strokeStyle = '#000';
	    ctx.lineWidth = 1
	    ctx.linejoin = 'bevel';
	    var x=x_tick_span;
	    ctx.beginPath();
	    for (y=1; y<=total_entries; y++){
		/*console.log( cp[y-1] + " : " + max_y_val + " : " + (max_y_val-cp[y-1])*y_tick_span );*/
		ctx.moveTo( (x-x_tick_span), ((max_y_val-cp[y-1])*y_tick_span) );
		ctx.lineTo( x, ((max_y_val-cp[y])*y_tick_span) );
		x+=x_tick_span;
	    }
	    ctx.stroke();

	} else { alert("COULD NOT GET CONTEXT"); }
    },
    
    getRelCursorPosition: function(e) {
	var x;
	var y;
	
	if (e.pageX != undefined && e.pageY != undefined) {
	    x = e.pageX;
	    y = e.pageY;
	} else {
	    x = e.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
	    y = e.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	}
	
	canvas_holder_offset = $("#canvas_holder").offset();
	x -= canvas_holder_offset.left;
	y -= canvas_holder_offset.top;
	
	var point = [x, y];
	return point;
    },

    getAbsCursorPosition: function(e) {
	var x;
	var y;
	
	if (e.pageX != undefined && e.pageY != undefined) {
	    x = e.pageX;
	    y = e.pageY;
	} else {
	    x = e.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
	    y = e.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	}
	var point = [x, y];
	return point;
    },

    bubble: function(point) {
	var bubble_code = "<div style='position:absolute; top:"
	    + point[1] + "px; left:" + point[0] + "px; border: 1px solid blue; z-index: 1;'>"
            + point[0] + " : " + point[1] + "<br />"
            + "</div>";
	return bubble_code;
    },

    reset: function() {
	this.canvas_ref.width = this.canvas_ref.width;
    }
    
});

$(document).ready(function(){

    var chart_view_1 = new ChartView({id:"canvas_holder_1"});
    $("#draw_1").click(function(event){
	event.preventDefault();
	chart_view_1.render();
	return false;
    });
    $("#reset_1").click(function(event){
	event.preventDefault();
	chart_view_1.reset();
	return false;
    });
    chart_view_1.render();
    
    var chart_view_2 = new ChartView({id:"canvas_holder_2"});   
    $("#draw_2").click(function(event){
	event.preventDefault();
	chart_view_2.render();
	return false;
    });
    $("#reset_2").click(function(event){
	event.preventDefault();
	chart_view_2.reset();
	return false;
    });
    chart_view_2.render();
    
    var chart_view_3 = new ChartView({id:"canvas_holder_3"});
    $("#draw_3").click(function(event){
	event.preventDefault();
	chart_view_3.render();
	return false;
    });
    $("#reset_3").click(function(event){
	event.preventDefault();
	chart_view_3.reset();
	return false;
    });
    chart_view_3.render();

    var chart_view_4 = new ChartView({id:"canvas_holder_4"});
    $("#draw_4").click(function(event){
	event.preventDefault();
	chart_view_4.render();
	return false;
    });
    $("#reset_4").click(function(event){
	event.preventDefault();
	chart_view_4.reset();
	return false;
    });
    chart_view_4.render();
    
    var chart_view_5 = new ChartView({id:"canvas_holder_5"});
    $("#draw_5").click(function(event){
	event.preventDefault();
	chart_view_5.render();
	return false;
    });
    $("#reset_5").click(function(event){
	event.preventDefault();
	chart_view_5.reset();
	return false;
    });
    chart_view_5.render();
    
});
