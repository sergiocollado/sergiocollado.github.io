window.onload = function() {
	var maxDepth = 0;
	
	init();
	
	function init() {
		chaos.init();
		
		draw();
		
		document.body.addEventListener("mousedown",
			function(event){
				maxDepth += 1;
				if(maxDepth==7)
				{maxDepth = 0;}
				draw();
			});
		document.body.addEventListener("keyup",
		function(event) {
			console.log(event.keyCode);
			switch(event.keyCode){
				case 32: //space
				maxDepth +=1;
				if(maxDepth==7)
				{maxDepth = 0;}
				draw();
				break;
				
				case 80: //p 
				chaos.popImage();
				break;
				
				default:
				break;
				
			}
	});
	
	}
	
	function draw() {
		var p0 = {
			x: chaos.width*0.1,
			y:chaos.height*0.75
		}
		
		var p1 = {
			x:chaos.width*0.9,
			y: chaos.height*0.75 
		}
		
		chaos.clear();
		chaos.context.lineWidth=2;
		
		koch(p0,p1, maxDepth);
	}
	
	function koch(p0,p1,depth) {
		 var dx=p1.x-p0.x;
		 var dy=p1.y-p0.y
		 
		 var dist=Math.sqrt(dx*dx + dy*dy);
		 var unit=dist/3;
		 var angle = Math.atan2(dy,dx);
		 var pa,pb,pc;
		 
		 pa={
			 x:p0.x + Math.cos(angle)*unit,
			 y:p0.y + Math.sin(angle)*unit
		 };
		 
		 pb = {
			 x: pa.x + Math.cos(angle - Math.PI/3)*unit,
			 y: pa.y + Math.sin(angle - Math.PI/3)*unit
		 };
		 
		 pc = {
			 x:p0.x+Math.cos(angle)*unit*2,
			 y:p0.y+Math.sin(angle)*unit*2
		 };
		 
		 if(depth === 0) {
			 var ctx = chaos.context;
			 ctx.beginPath();
			 ctx.moveTo(p0.x,p0.y);
			 ctx.lineTo(pa.x,pa.y);
			 ctx.lineTo(pb.x,pb.y);
			 ctx.lineTo(pc.x,pc.y);
			 ctx.lineTo(p1.x,p1.y);
			 ctx.stroke();
		 }
		 else{
			 koch(p0,pa,depth-1);
			 koch(pa,pb,depth-1);
			 koch(pb,pc,depth-1);
			 koch(pc,p1,depth-1);
		 }
	}
}