window.onload = function() {
	var size;
	var maxDepth=0;
	
	init();
	
	function init() {
		chaos.init();
		chaos.clear("blue");
		size=chaos.height*0.5;
		draw();
		
		document.body.addEventListener("mousedown", 
			function(event){
				maxDepth +=1;
				if(maxDepth>9) {
					maxDepth=0;
					var r=Math.round(Math.random()*255);
					var g=Math.round(Math.random()*255);
					var b=Math.round(Math.random()*255);
					chaos.context.fillStyle=("rgb("+r+","+g+","+b+")");
					}
				draw();
			});
		document.body.addEventListener("keyup",
			function(event) {
				console.log(event.keyCode);
				switch(event.keyCode) {
					case 32: //space
					maxDepth +=1;
					if (maxDepth>9){maxDepth=0;}
					draw();
					break;
					
					case 80: //p
					chaos.popImage();
					break;

					case 67:
					var r=Math.round(Math.random()*255);
					var g=Math.round(Math.random()*255);
					var b=Math.round(Math.random()*255);
					chaos.context.fillStyle=("rgb("+r+","+g+","+b+")");
					draw();
					break;
					
					default:
					break;
					
				}
			}
		); 
	} 
	
	function draw() {
		//console.log("Draw");
		chaos.clear();
		chaos.context.save();
		chaos.context.translate(chaos.width*0.5, chaos.height*0.6);
		chaos.context.scale(size,size);
		drawTriangle(maxDepth);
		chaos.context.restore();
		
    }
  	
	
	function drawTriangle(depth){
		var angle= -Math.PI/2;
		
		if(depth === 0 ) {
			chaos.context.beginPath();
			
			//move to top point of triangle
			chaos.context.moveTo(Math.cos(angle), Math.sin(angle));
			//cos(-90)=0 / sin(-90)=-1
			angle += Math.PI*2/3; 
			// -90+120 = 30º
			
			//draw line to lower right point
			chaos.context.lineTo(Math.cos(angle),Math.sin(angle));
			
			//draw line to final point
			angle += Math.PI*2/3;
			chaos.context.lineTo(Math.cos(angle),Math.sin(angle));
			
			//fill will close the shape
			chaos.context.fill();
		}
		else {
			//draw the top triangle
			chaos.context.save();
			chaos.context.translate(Math.cos(angle)*0.5, Math.sin(angle)*0.5);
			chaos.context.scale(0.5,0.5);
			drawTriangle(depth -1);
			chaos.context.restore();
			
			//draw the lower right triangle
			angle += Math.PI*2/3;
			chaos.context.save();
			chaos.context.translate(Math.cos(angle)*0.5,Math.sin(angle)*0.5);
			chaos.context.scale(0.5,0.5);
			drawTriangle(depth -1);
			chaos.context.restore();
			
			//draw the lower left triangle
			angle +=Math.PI*2/3;
			chaos.context.save();
			chaos.context.translate(Math.cos(angle)*0.5, Math.sin(angle)*0.5);
			chaos.context.scale(0.5,0.5);
			drawTriangle(depth-1);
			chaos.context.restore();
		}
	}
}