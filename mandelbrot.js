window.onload = function () {
	var currentX =0,
	imageData,
	stripWidth=50,
	minR=-2,
	maxR=1,
	minI=-1.2,
	maxI=1.2,
	maxIter=100,
	interval,
	dr,di,
	aspectRatio,
	zoomDiv,
	zoomX,
	zoomY,
	colors,
	colorA = [255,196,0],
	colorB = [0,0,0],
	numColors=20;
	
	init();
	
	function init() {
		chaos.init();
		initColors();
		
		zoomDiv=document.getElementById("zoom");
		
		aspectRatio =chaos.width/chaos.height;
		imageData=chaos.context.getImageData(0,0,chaos.width,chaos.height);
		renderFull();
		
		document.body.addEventListener("mousedown", onMouseDown);
		
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
				
				case 67: //c -for colorsclearInterval(interval);
				randomizeColors();
				renderFull();
				break;
				
				case 71://g -for grayScale
				clearInterval(interval);
				grayScale();
				renderFull();
				break;
				
				case 83: //s-for startover
				clearInterval(interval);
				minR=-2;
				maxR=1;
				minI=-1.2;
				maxI=1.2;
				renderFull();
				break;
				
				default:
				break;
			}
		});
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
				color=mandel(x,y);
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
		
		console.log( "x=" + x);
		console.log( "y=" + y);
		console.log( "zoomX="+zoomX);
		console.log( "zoomY="+zoomY);
		console.log( "minR=" + minR);
		console.log( "maxR=" + maxR);
		
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
		colorB = [Math.random()*32, Math.random()*32, Math.random()*32]
		initColors();
	}
	
	function grayScale(){
		colorA = [255, 255, 255];
		colorB = [0, 0, 0];
		initColors();
	}
	

}