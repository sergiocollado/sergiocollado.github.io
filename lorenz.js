window.onload=function() {
	var x,y,z,a,b,c, scale=8;
	
	init();
	
	function init() {
		chaos.init();
		chaos.context.translate(chaos.width*0.5,-chaos.height*0.05);
		chaos.context.lineWidth=0.35;
		
		x=Math.random()-0.5;
		y=Math.random()-0.5;
		z=Math.random()-0.5;
		
		a=20;
		b=8/3;
		c=28;
		
		setInterval(iterate,20);
		document.body.addEventListener("keyup",
			function(event) {
				switch(event.keyCode){
					default:
					break;
				}
			});
	}
	
	function iterate() {
		chaos.context.beginPath();
		chaos.context.moveTo(x*scale, z*scale);
		lorenz();
		chaos.context.lineTo(x*scale,z*scale);
		chaos.context.stroke();
	}
	
	function lorenz() {
		var x1, y1, z1, dt=0.01;
		
		x1=x+(a*(y-x))*dt;
		y1=y+(x*(c-z)-y)*dt;
		z1=z+(x*y-b*z)*dt;
		x=x1;
		y=y1;
		z=z1;
	}
}