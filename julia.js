window.onload = function () {
	var currentX =0,
	imageData,
	stripWidth=50,
	minR=-2,
	maxR=1,
	minI=-1.4,
	maxI=1.4,
	maxIter=100,
	interval,
	dr,di,
	aspectRatio,
	zoomDiv,
	zoomX,
	zoomY,
	colors,
	colorA = [28,136,236],
	colorB = [17,4,10],
	numColors=20,
	cr,ci;
	
	init();
	
	function init() {
		chaos.init();
		initColors();
		
		zoomDiv=document.getElementById("zoom");
		
		aspectRatio =chaos.width/chaos.height;
		imageData=chaos.context.getImageData(0,0,chaos.width,chaos.height);
		renderMandel();
		
		document.body.addEventListener("click", onClick);
		
		function addKeyListeners() {
			
			document.body.addEventListener("keyup",
			function(event) {
				console.log(event.keyCode);
				switch(event.keyCode) {
					case 73: //i-for zoom-in
					maxIter += 20;
					clearInterval(interval);
					renderFull();
					break;
					
					case 79: //o-for zoom-out
					maxIter -=20;
					clearInterval(interval);
					renderFull();
					break;
					
					case 67: //c -for random colors
					randomizeColors();
					renderFull();
					break;
					
					case 71://g -for grayScale
					clearInterval(interval);
					grayScale();
					renderFull();
					break;
					
					
					default:
					break;
				}
			});
		}
	
	function onClick(event) {
		cr=minR+(event.clientX-200)*dr,
		ci=minI+(event.clientY-80)*di,
		minR=-1;
		maxR=1;
		
		console.log("cr="+ cr);
		console.log("cy="+ ci);
		
		renderFull();
		document.body.removeEventListener("click",onClick);
		document.body.addEventListener("mousedown", onMouseDown);
		addKeyListeners();
	}
	
	function renderFull(){
		currentX=0;
		adjustWidth();
		dr=(maxR-minR)/chaos.width;
		di=(maxI-minI)/chaos.height;
		
		interval=setInterval(renderStrip,0);
	}
	
	function adjustWidth(){
		var w=maxR-minR,
		h=maxI-minI,
		newW=h*aspectRatio,
		diff=newW-w;
		
		minR -=diff/2;
		maxR += diff/2;
	}
	
 	function renderStrip() {
		var x,y,h,color, index,
		w4=chaos.width*4,
		iData=imageData.data;
		
		for(x=currentX; x<currentX+stripWidth; x+=1){
			index=x*4;
			for(y=0,h=chaos.height; y<h; y+=1){
				color=julia(x,y);
				iData[index  ]=color.red;
				iData[index+1]=color.green;
				iData[index+2]=color.blue;
				iData[index+3]=255;
				
				index +=w4;
			}
			if(x>chaos.width){
				clearInterval(interval);
				break;
			}
			//console.log(x);
		}
		//console.log( "imageData,0,0,"+currentX+",0,"+stripWidth+","+chaos.height);
		chaos.context.putImageData(imageData,0,0,currentX,0,stripWidth,chaos.height);
		currentX += stripWidth;
	}

 	function julia(x,y){
		var zr=minR+x*dr,
		zi=minI+y*di,
		iter, zr1, zi1;
			
		for(iter=0; iter<maxIter; iter++){
			zr1=zr*zr-zi*zi+cr;
			zi1=2*zr*zi+ci;
			zr=zr1;
			zi=zi1;
			if(zr*zr+zi*zi>4) {
				return colors[iter%numColors];
			}
		}
		
		return{red:0, green:0, blue:0}

	} 
	
	function onMouseDown(event) {
		clearInterval(interval);
		zoomX=event.clientX;
		zoomY=event.clientY;
		zoomDiv.style.left=zoomX + "px";
		zoomDiv.style.top=zoomY+"px";
		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp);
	}
	
	
	function onMouseMove(event) {
		zoomDiv.style.width=event.clientX - zoomX  + "px";
		zoomDiv.style.height = event.clientY - zoomY  + "px";
	}
	
	function onMouseUp(event){
		var x=event.clientX,
		y=event.clientY;
		
/* 		console.log( "x=" + x);
		console.log( "y=" + y);
		console.log( "zoomX="+zoomX);
		console.log( "zoomY="+zoomY);
		console.log( "minR=" + minR);
		console.log( "maxR=" + maxR); */
		
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
		
		zoomDiv.style.width="0px";
		zoomDiv.style.height="0px";
		if( x<zoomX || y< zoomY){ return;}
		
		maxR = minR + dr*(x-200);
		maxI = minI + di*(y-80);
		minR = minR + dr*(zoomX-200);
		minI = minI + di*(zoomY-80);
		renderFull();
	}
	
	function initColors(){
		var redRange = colorB[0]- colorA[0],
		greenRange = colorB[1]- colorA[1],
		blueRange = colorB[2]-colorA[2];
		
		colors = [];
		for(i = 0; i< numColors; i++) {
			colors.push(
				{
					red:colorA[0]+ Math.floor(redRange/numColors*i),
					green: colorA[1]+ Math.floor(greenRange/numColors*i),
					blue: colorA[2]+Math.floor(blueRange/numColors*i)
				}
			);
		}
	}
	
	function randomizeColors(){
		colorA = [Math.random()*255, Math.random()*255, Math.random()*255];
		colorB = [Math.random()*32, Math.random()*32, Math.random()*32];
		console.log("colorA=" + colorA[0] + "," + colorA[1] + "," + colorA[2]);
		console.log("colorB=" + colorB[0] + "," + colorB[1] + "," + colorB[2]);
		initColors();
	}
	
	function grayScale(){
		colorA = [255, 255, 255];
		colorB = [0, 0, 0];
		initColors();
	}
	
	function mandel(x,y){
		var cr=minR+x*dr,
		ci=minI+y*di,
		zr=0,
		zi=0,
		iter,zr1,zi1;
		
		for(iter=0; iter<maxIter; iter+=1){
			zr1=zr*zr-zi*zi+cr;
			zi1=2*zr*zi+ci;
			zr=zr1;
			zi=zi1;
			
			if(zr*zr+zi*zi>4){
				/* var shade=255-Math.floor(iter/maxIter*255);
				
				return {
					red:shade,
					green:shade,
					blue:shade
				} */
				
				return colors[iter%numColors];
			}
		}
		
		return{
			red:0,
			green:0,
			blue:0
		}
	}
	
	function renderMandel() {
		var x,y,w,h,color,
		index=0, iData=imageData.data;
		
		adjustWidth();
		dr=(maxR-minR)/chaos.width;
		di=(maxI-minI)/chaos.height;
		
		for(y=0, h=chaos.height; y<h; y++){
			for(x=0, w=chaos.width; x<w; x++){
				color=mandel(x,y);
				iData[index]=color.red;
				iData[index+1]=color.green;
				iData[index+2]=color.blue;
				iData[index+3]=255;
				index +=4;
			}
		}
		console.log("Done");
		chaos.context.putImageData(imageData,0,0);
	}
	
} 

}