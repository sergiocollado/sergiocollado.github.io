window.onload = function(){
 	var particles = [],
	numParticles=5000,
	pCanvas=document.getElementById("particleCanvas"),
	pContext=pCanvas.getContext("2d"),
	imageData;
	 var s=0;
	init();

	function init() {
		chaos.init();
		
		chaos.setSize(500,500);
		
		pCanvas.width=chaos.width;
		pCanvas.height=chaos.height;
		
		chaos.context.fillRect(chaos.width/2-2,chaos.height/2-2,4,4); //draw the seed.
		
		makeParticles(numParticles);
		
		setInterval(update,0);
		
		
	}
	
	function makeParticles(n) {
		for(var i=0; i<n; i++) {
			var p = {
				x:Math.random()*chaos.width,
				y:Math.random()*chaos.height,
				vx:0,
				vy:0
			}
			particles.push(p);
		}
	}
	
	function update(){
		imageData= chaos.context.getImageData(0,0,chaos.width, chaos.height).data;
		pContext.clearRect(0,0,chaos.width,chaos.height);
		for(var i=0; i<numParticles; i++)
		{
			var p = particles[i];
			updateParticle(p);
		}
		//console.log(particles.length + "  " + s);
	}
	
	function updateParticle(p) {
		var x=Math.round(p.x),
			y=Math.round(p.y),
			pixel=imageData[(y*chaos.width+x)*4+3],
			hit=pixel>0;
			
			if(hit){
				chaos.context.fillRect(p.x, p.y, 1, 1);
				respawn(p);
				s++;
			}
			else{
				p.vx += Math.random()*.1-0.05;
				p.vy += Math.random()*.1-0.05;
				
				p.x += p.vx;
				p.y += p.vy;
				
				//p.vx*=1.5; //0.99;
				//p.vy*=1.5; //0.99;
				
				if(p.x>chaos.width){
					p.x -= chaos.width;
				}
				else if(p.x<0) {
					p.x += chaos.width;
				}
				
				if(p.y>chaos.height) {
					p.y -= chaos.height;
				}
				else if(p.y<0) {
					p.y += chaos.height;
				}
				pContext.fillRect(p.x,p.y,1,1);
			}
	}
	
	function respawn(p) {
		if(Math.random()<.5){
			p.x=Math.random()*chaos.width;
			p.y=0;
		}
		else {
			p.x=0;
			p.y=Math.random()*chaos.heigth;
		}
	}
}