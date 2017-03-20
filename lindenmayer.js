window.onload = function() {
	var vocab, initiator, string, rules={}, interval, iterations =5, maxIter=5;
	var commands={}, system, angle, turnAngle, x,y, stack, size=10;
	var stringcounter=0;
	var timestep=50;
	
	init();
	
		
	function dragon() {
		vocab="+-FXY";
		initiator="FX"; 
		
		rules["X"]="X+YF+";
		rules["Y"]="-FX-Y";

		commands["F"]=draw;
		commands["+"]=right;
		commands["-"]=left;
		turnAngle=90;
		
		angle=0;
		x=chaos.width*.5;
		y=chaos.height*.5;
	}
	
	function hilbert(){
		vocab="ABF+-";
		initiator="A";
		
		rules["A"]="+BF-AFA-FB+";
		rules["B"]="-AF+BFB+FA-";
		
		commands["F"]=draw;
		commands["+"]=right;
		commands["-"]=left;
		
		turnAngle=90;
		
		angle=0;
		
		x=chaos.width*.1;
		y=chaos.height*.1;
	}
	
	function gosper(){
		vocab="XYF+-";
		initiator="X";
		
		rules["X"]= "X+YF++YF-FX--FXFX-YF+";
		rules["Y"]= "-FX+YFYF++YF+FX--FX-Y";
		
		commands["F"]=draw;
		commands["+"]=right;
		commands["-"]=left;
		
		turnAngle=60;
		
		angle=0;
		
		x=chaos.width*.55;
		y=chaos.height*.1;
		
		size=8;
		maxIter=5;
	}
	
	function init(){
		
		chaos.init();
		
		//system=hilbert;
		system=gosper;
		iterate();
		chaos.clear();
		stringcounter=0;
		interval=setInterval(render,timestep);
		//renderall();
		
		document.body.addEventListener("keyup",
			function(event){
				console.log(event.keyCode);
				switch(event.keyCode) {
					
					case 38:// up
					maxIter++;
					maxIter=Math.min(maxIter,9);
					chaos.clear();
					stringcounter=0;
					clearInterval(interval);
					iterate();
					//interval=setInterval(render,timestep);
					renderall();
					break;
					
					case 40: //down 
					maxIter--;
					maxIter = Math.max(1,maxIter);
					chaos.clear();
					stringcounter=0;
					clearInterval(interval);
					iterate();
					//interval=setInterval(render,timestep);
					renderall();
					break;
					
					case 90: //z
					size--;
					size=Math.max(1,size);
					chaos.clear();
					stringcounter=0;
					clearInterval(interval);
					iterate();
					//interval=setInterval(render,timestep);
					renderall();
					break;
					
					case 88: //x 
					size++;
					chaos.clear();
					stringcounter=0;
					clearInterval(interval);
					iterate();
					//interval=setInterval(render,timestep);
					renderall();
					break;
					
					/* case 70: //f 
					render();
					break; */
					
					default:
					break;
				}
			});
	}
	
	function algae() {
		vocab="AB";
		initiator="A";
		
		rules["A"]="AB";
		rules["B"]="A";
		
		maxIter=7;
	}

	
	function transform() {
		var i, char, rule, newString="";
		
		console.log(string);
		
		for(i=0; i<strong.length; i++){
			char=string.charAt(i);
			rule=rules[char];
			if(rule) {
				newString += rule;
			}
			else{
				newString += char;
			}
			string=newString;
			console.log(string);
		}
	}
	
	function iterate() {
		stack = [];
		system();
		string = initiator; 
		for (var i = 0; i<maxIter; i++) {
			transform();
		}
	}
	
	function transform() {
		var i, char, rule, newString = "";
		
		for( i=0; i<string.length; i++) {
			char = string.charAt(i);
			rule=rules[char];
			if(rule){
				newString += rule;
			}
			else{
				newString += char;
			}
		}
		
		string=newString;
		console.log(string);
	}

	function move(){
		x += Math.cos(angle*Math.PI/180)*size;
		y += Math.sin(angle*Math.PI/180)*size;
		//chaos.context.moveTo(x,y);
	}
	
	function draw() {
		chaos.context.beginPath();
		chaos.context.moveTo(x,y);
		x += Math.cos(angle*Math.PI/180)*size;
		y += Math.sin(angle*Math.PI/180)*size;
		chaos.context.lineTo(x,y);
		chaos.context.stroke();
		//console.log("stroke");
		//console.log("s:" + new Date().getTime());
		chaos.context.stroke();
	}
	
	function left() {
		angle -= turnAngle;
	}
	
	function right() {
		angle += turnAngle;
	}
	
	function push() {
		stack.push({
			x: x,
			y: y,
			angle: angle
		})
	}
	
	function pop() {
		var state=stack.pop();
		if(state) {
			x=state.x;
			y = state.y;
			angle=state.angle;
			chaos.context.moveTo(x,y);
		}
	}
	
	function renderall() {
		var i, char, command;
		
		chaos.clear();
		for(i=0; i<string.length; i++) {
			char = string.charAt(i);
			command = commands[char];
			if(command) {
				command();
			}
		}
	}
		
	function render() {
		console.log("render");
		var i, char, command;
		//console.log(stringcounter);
		
		if(stringcounter == string.length){
			clearInterval(interval);
			stringcounter=0;
		}
		else {
			char = string.charAt(stringcounter);
			//console.log(char);
			command= commands[char];
			if(command) {
				command();
			}
		}
		stringcounter++;	
	}
	
}