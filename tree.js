window.onload = function() {
	var maxDepth = 0,
	angles = [
	-Math.PI/4*Math.random(),
	Math.PI/4*Math.random()
	],
	baseSize=0,
	scaleFactor=0.2+Math.random()*0.6;
	
	init();
	
	function init() {
		chaos.init();
		baseSize=chaos.height*0.8;
		draw();
		
		document.body.addEventListener("keyup",
			function(event) {
				console.log(event.keyCode);
				switch(event.keyCode){
					case 32: //space
					maxDepth +=1;
					if(maxDepth>11)
					{
						maxDepth=1;
					}
					draw();
					break;
					
					case 83: //s
					maxDepth=0;
					scaleFactor=0.2+Math.random()*0.6;
						angles = [
						-Math.PI/4*Math.random(),
						Math.PI/4*Math.random()
						];
					chaos.init();
					baseSize=chaos.height*0.8;
					draw();
					break;
					
					default:
					break;
				}
			});
	}
	
	function draw() {
		chaos.clear();
		chaos.context.save();
		chaos.context.translate(chaos.width*.5, chaos.height*0.9);
		drawTree(maxDepth, baseSize,0);
		chaos.context.restore();
	}
	
	function drawTree(depth,size,angle) {
		chaos.context.save();
		chaos.context.rotate(angle);
		chaos.context.beginPath();
		chaos.context.moveTo(0,0);
		chaos.context.lineTo(0,-size*(1-scaleFactor));
		chaos.context.stroke();
		chaos.context.translate(0,-size*(1-scaleFactor));
		
		if(depth ===0) {
			drawBranch(size*scaleFactor, angles[0]);
			drawBranch(size*scaleFactor,angles[1]);
		}
		else{
			drawTree(depth-1, size*scaleFactor,angles[0]);
			drawTree(depth-1, size*scaleFactor,angles[1]);
		}
		chaos.context.restore();
	}
	
	function drawBranch(size,angle){
		var ctx = chaos.context;
		ctx.save();
		ctx.rotate(angle);
		ctx.beginPath();
		ctx.moveTo(0,0)
		ctx.lineTo(0,-size);
		ctx.stroke();
		ctx.restore();
	}
}