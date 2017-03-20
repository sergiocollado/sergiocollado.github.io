window.onload = function(){
	var maxDepth = 0,
	numShapes =3,
	offset=Math.random()*Math.PI*2,
	angles = [
	Math. random()*Math.PI*2, //offset, 	//0 degrees
	Math. random()*Math.PI*2, //offset + Math.PI*2/3,	//120
	Math. random()*Math.PI*2, //offset + Math.PI*4/3		//240
	],
	size=0,
	dist= 0,
	scaleFactor=0.6;
	
	init();
	
	function init() {
		chaos.init();
		size=chaos.height/10;
		dist = [
		size*Math.random()*3+1,
		size*Math.random()*3+1,
		size*Math.random()*3+1
		];
		
		chaos.context.fillStyle = "rgba(0,0,0,0.5)";
		draw();
		
			document.body.addEventListener("mousedown", 
			function(event){
					maxDepth++;
					if(maxDepth>9) {
						maxDepth=1;
						draw();	
					}
					draw();	
			});
			
		document.body.addEventListener("keyup",
			function(event){
				console.log(event.keyCode);
				switch(event.keyCode){
					case 32: //space
					maxDepth +=1;
					if(maxDepth>9) {
							maxDepth=1;
							draw();	
						}
					draw();
					break;
					
					case 83: //s
					maxDepth = 1;
							chaos.init();
							size=chaos.height/10;
							dist = [
							size*Math.random()*3+1,
							size*Math.random()*3+1,
							size*Math.random()*3+1
							];
							angles = [
							Math. random()*Math.PI*2, //offset, 	//0 degrees
							Math. random()*Math.PI*2, //offset + Math.PI*2/3,	//120
							Math. random()*Math.PI*2, //offset + Math.PI*4/3		//240
							];
							chaos.context.fillStyle = "rgba(0,0,0,0.5)";
							draw();
					break;
					
					case 67: //call
					var r=Math.round(Math.random()*255);
					var g=Math.round(Math.random()*255);
					var b=Math.round(Math.random()*255);
					chaos.context.fillStyle=("rgba("+r+","+g+","+b+",0.5)");
					draw();
					default:
					break;
					
				}
			});
	}
	
	function draw() {
		chaos.clear();
		chaos.context.save();
		chaos.context.translate(chaos.width*0.5, chaos.height*0.5);
		drawColorShape();
		iterate(maxDepth);
		chaos.context.restore();
	}
	
	function iterate(depth) {
		for(var i=0; i<numShapes; i+=1){
			chaos.context.save();
			chaos.context.rotate(angles[i]);
			chaos.context.translate(dist[i],0);
			chaos.context.scale(scaleFactor,scaleFactor);
			drawColorShape();
			if(depth>0){
				iterate(depth-1);
			}
			chaos.context.restore();
		}
	}
	
	function drawShape() {
		chaos.context.fillStyle = "rgba(0,0,0,0.5)";
		chaos.context.beginPath();
		chaos.context.arc(0,0,size,0,Math.PI*2,false);
		chaos.context.fill();
	}
	
		function drawColorShape() {
		//chaos.context.fillStyle = "rgba(0,0,0,0.5)";
		chaos.context.beginPath();
		chaos.context.arc(0,0,size,0,Math.PI*2,false);
		chaos.context.fill();
	}
}