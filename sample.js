window.onload = function () {
	init();
	
	function init() {
		chaos.init();
		document.body.addEventListener("keyup", 
			function(event) {
				switch(event.keyCode) {
					case 32: //space
					draw();
					break;
					
					case 80: //p
					chaos.popImage();
					break;
					
					default:
					break;
				}
			}
		);
	}
	
	function draw() {
		var x=Math.random() * (chaos.width -100);
		var y = Math.random() *(chaos.height - 100);
		var w = 20 + Math.random() * 100;
		var h = 20 + Math.random() * 100;
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		chaos.context.fillStyle = "rgb(" +r + "," + g + "," + b + ")";
		chaos.context.fillRect(x,y,w,h);
		
	}
}