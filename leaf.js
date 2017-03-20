window.onload = function() {
	var table = [
	[0, 0, 0, 0.16, 0, 0, 0.01],
	[0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85],
	[0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07],
	[-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07]	
	];
	var currentPoint,
	scale=70,
	pointSize=0.5/scale,
	interval;
	
	init(); 
	
 	function init() {
		chaos.init();
		chaos.context.translate(chaos.width/2,chaos.height);
		chaos.context.scale(scale/1.5,-scale/1.5);
		
		currentPoint={
			x:Math.random(),
			y:Math.random()
		};
		 
		setPoint(currentPoint);
		
		document.body.addEventListener("keyup",
			function(event){
				console.log(event.keyCode);
				switch(event.keyCode){
					case 32://space
					nextPoint();
					break;
					case 70://f
					clearInterval(interval);
					interval=setInterval(
					function() {
						for(var i=0; i<100; i+=1){
							nextPoint();
						}
					},0);
					break;
				
					default:
					break; 
			 	} 
			});
	    } 
		
		
	function nextPoint(){
		var t=getRandomTransform(),
		x=currentPoint.x*t[0]+ currentPoint.y*t[1]+ t[4];
		y=currentPoint.x*t[2]+ currentPoint.y*t[3]+t[5];
		currentPoint.x=x;
		currentPoint.y=y;
		setPoint(currentPoint);
	}
	
	function getRandomTransform(){
		var randomNumber=Math.random();
		for(var i=0; i<table.length; i+=1){
			var row=table[i];
			if(randomNumber <= row[6]){
				return row;
			}
			randomNumber -= row[6];
		}
	}
	
	function setPoint(p){
		chaos.context.fillStyle='rgb(168,242,57)';
		chaos.context.beginPath();
		chaos.context.arc(p.x, p.y, pointSize, 0, Math.PI*2, false);
		chaos.context.fill();
	}

}