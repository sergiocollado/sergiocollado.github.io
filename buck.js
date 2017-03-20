this.onload = function () {
	
	
ctx = document.getElementById("canvas").getContext("2d");
canvas = document.getElementById("canvas");
var w=.8*window.innerWidth;
var h=.8*window.innerHeight;
var l;
if (w>h) l=Math.round(h);
else l=Math.round(w);
canvas.width=l;
canvas.height=l;

Q_on=true;
t=0;

draw();
setInterval(Qswitch,1200);
setInterval(draw_currents,60);

function Qswitch(){
	Q_on= !Q_on;
}

function draw(){
console.log("size="+l);

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2;
 
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(0,l);
ctx.lineTo(l,l);
ctx.lineTo(l,0);
ctx.lineTo(0,0);
ctx.stroke();
 
 
 
ctx.beginPath();
ctx.moveTo(0.1*l,0.1*l);
ctx.lineTo(0.2*l,0.1*l);
ctx.stroke();

//el MOS
ctx.beginPath();
ctx.moveTo(0.2*l,0.1*l);
ctx.lineTo(0.2*l,0.15*l);
ctx.moveTo(0.19*l,0.15*l);
ctx.lineTo(0.21*l,0.15*l); 
ctx.moveTo(0.215*l,0.15*l);
ctx.lineTo(0.235*l,0.15*l);
ctx.moveTo(0.24*l,0.15*l);
ctx.lineTo(0.26*l,0.15*l); 
ctx.moveTo(0.225*l,0.15*l);
ctx.lineTo(0.225*l,0.10*l);
ctx.moveTo(0.25*l,0.15*l);
ctx.lineTo(0.25*l,0.10*l);
ctx.moveTo(0.225*l,0.1*l);
ctx.lineTo(0.25*l,0.1*l);
ctx.stroke();

//la flecha 
ctx.beginPath();
ctx.moveTo(0.215*l,0.13*l);
ctx.lineTo(0.225*l,0.15*l);
ctx.lineTo(0.235*l,0.13*l);
ctx.lineTo(0.215*l,0.13*l);
ctx.stroke();

//la base
ctx.beginPath();
ctx.moveTo(0.19*l,0.16*l);
ctx.lineTo(0.255*l,0.16*l);
ctx.lineTo(0.255*l,0.185*l);
ctx.stroke();

//union a la bobina
ctx.beginPath();
ctx.moveTo(0.25*l,0.1*l);
ctx.lineTo(0.48*l,0.1*l);
ctx.stroke();

//bobina
var k=0.03*l;
ctx.beginPath();
ctx.moveTo(0.45*l+k,0.1*l);
ctx.arc(0.465*l+k,0.1*l,0.015*l,Math.PI,0,false);
ctx.arc(0.495*l+k,0.1*l,0.015*l,Math.PI,0,false);
ctx.arc(0.525*l+k,0.1*l,0.015*l,Math.PI,0,false);
ctx.stroke();

//diodo
var h=0.05*l;
ctx.beginPath();
ctx.moveTo(0.35*l+0.05*l ,0.1*l);
ctx.lineTo(0.35*l+0.05*l  ,0.26*l-h);
ctx.lineTo((0.335*l)+0.05*l ,(0.28*l)-h);
ctx.lineTo((0.365*l)+0.05*l ,(0.28*l)-h);
ctx.lineTo(0.35*l+0.05*l ,0.26*l-h);
ctx.lineTo(0.335*l+0.05*l ,0.26*l-h);
ctx.lineTo(0.365*l+0.05*l ,0.26*l-h);
ctx.moveTo(0.35*l+0.05*l ,0.28*l-h);
ctx.lineTo(0.35*l+0.05*l ,0.35*l);
ctx.stroke();

//condensador
ctx.beginPath();
ctx.moveTo(0.537*l+k,0.1*l);
ctx.lineTo(0.65*l ,0.1*l);
ctx.lineTo(0.65*l ,0.20*l);
ctx.lineTo(0.615*l,0.20*l);
ctx.lineTo(0.685*l,0.20*l);
ctx.moveTo(0.615*l,0.23*l);
ctx.lineTo(0.685*l,0.23*l);
ctx.moveTo(0.65*l ,0.23*l);
ctx.lineTo(0.65*l ,0.35*l);
ctx.lineTo(0.35*l ,0.35*l);
ctx.stroke();

//resistencia
ctx.beginPath();
ctx.moveTo(0.65*l,0.1*l);
ctx.lineTo(0.83*l+0.07*l,0.1*l);
ctx.lineTo(0.83*l+0.07*l,0.18*l);
ctx.lineTo(0.85*l+0.07*l,0.19*l);
ctx.lineTo(0.81*l+0.07*l,0.21*l);
ctx.lineTo(0.85*l+0.07*l,0.23*l);
ctx.lineTo(0.81*l+0.07*l,0.25*l);
ctx.lineTo(0.85*l+0.07*l,0.27*l);
ctx.lineTo(0.83*l+0.07*l,0.28*l);
ctx.lineTo(0.83*l+0.07*l,0.35*l);
ctx.lineTo(0.65*l,0.35*l);
ctx.stroke();


//power supply
ctx.beginPath();
ctx.moveTo(0.1*l,0.1*l);
ctx.lineTo(0.1*l,0.21*l);
ctx.moveTo(0.05*l,0.21*l);
ctx.lineTo(0.15*l,0.21*l);
ctx.fillRect(0.07*l,0.22*l,0.06*l,0.01*l);
ctx.moveTo(0.1*l,0.22*l);
ctx.lineTo(0.1*l,0.35*l);
ctx.lineTo(0.35*l,0.35*l);
ctx.stroke();

}
	
function draw_current_mosfet(t)
{
	ctx.fillStyle = "yellow";
	ctx.beginPath();
	ctx.moveTo(0.1*l+t*0.01*l,0.1*l);
	ctx.arc(0.1*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.15*l+t*0.01*l,0.1*l);
	ctx.arc(0.15*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.2*l+t*0.01*l,0.1*l);
	ctx.arc(0.2*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.25*l+t*0.01*l,0.1*l);
	ctx.arc(0.25*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(0.3*l+t*0.01*l,0.1*l);
	ctx.arc(0.3*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();	
	
	ctx.beginPath();
	ctx.moveTo(0.35*l+t*0.01*l,0.1*l);
	ctx.arc(0.35*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	if(t==0)
	{
	ctx.beginPath();
	ctx.moveTo(0.4*l+t*0.01*l,0.1*l);
	ctx.arc(0.4*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	}
}

function draw_current_diode(t)
{
	ctx.fillStyle = "yellow";
	
	ctx.beginPath();
	ctx.moveTo(0.4*l,0.15*l-t*0.01*l);
	ctx.arc(0.4*l,0.15*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.4*l,0.2*l-t*0.01*l);
	ctx.arc(0.4*l,0.2*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.4*l,0.25*l-t*0.01*l);
	ctx.arc(0.4*l,0.25*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.4*l,0.3*l-t*0.01*l);
	ctx.arc(0.4*l,0.3*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.4*l,0.35*l-t*0.01*l);
	ctx.arc(0.4*l,0.35*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l-t*0.01*l,0.35*l);
	ctx.arc(0.65*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.6*l-t*0.01*l,0.35*l);
	ctx.arc(0.6*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.55*l-t*0.01*l,0.35*l);
	ctx.arc(0.55*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.5*l-t*0.01*l,0.35*l);
	ctx.arc(0.5*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.45*l-t*0.01*l,0.35*l);
	ctx.arc(0.45*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();

	
}

function draw_current_inductance(t)
{
	ctx.fillStyle = "yellow";
	
	ctx.beginPath();
	ctx.moveTo(0.4*l+t*0.01*l,0.1*l);
	ctx.arc(0.4*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(0.45*l+t*0.01*l,0.1*l);
	ctx.arc(0.45*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(0.5*l+t*0.01*l,0.1*l);
	ctx.arc(0.5*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.55*l+t*0.01*l,0.1*l);
	ctx.arc(0.55*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.6*l+t*0.01*l,0.1*l);
	ctx.arc(0.6*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	
}

function draw_current_capacitor_up(t)
{
	ctx.fillStyle = "yellow";
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.15*l-t*0.01*l);
	ctx.arc(0.65*l,0.15*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.2*l-t*0.01*l);
	ctx.arc(0.65*l,0.2*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.25*l-t*0.01*l);
	ctx.arc(0.65*l,0.25*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.3*l-t*0.01*l);
	ctx.arc(0.65*l,0.3*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.35*l-t*0.01*l);
	ctx.arc(0.65*l,0.35*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
}

function draw_current_capacitor_down(t)
{
	ctx.fillStyle = "yellow";
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.1*l+t*0.01*l);
	ctx.arc(0.65*l,0.1*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();	
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.15*l+t*0.01*l);
	ctx.arc(0.65*l,0.15*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.2*l+t*0.01*l);
	ctx.arc(0.65*l,0.2*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.25*l+t*0.01*l);
	ctx.arc(0.65*l,0.25*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.65*l,0.3*l+t*0.01*l);
	ctx.arc(0.65*l,0.3*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
}

function draw_resistence(t)
{
	ctx.fillStyle = "yellow";
	
	ctx.beginPath();
	ctx.moveTo(0.65*l+t*0.01*l,0.1*l);
	ctx.arc(0.65*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.7*l+t*0.01*l,0.1*l);
	ctx.arc(0.7*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.75*l+t*0.01*l,0.1*l);
	ctx.arc(0.75*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.8*l+t*0.01*l,0.1*l);
	ctx.arc(0.8*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.85*l+t*0.01*l,0.1*l);
	ctx.arc(0.85*l+t*0.01*l,0.1*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.9*l,0.1*l+t*0.01*l);
	ctx.arc(0.9*l,0.1*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.9*l,0.15*l+t*0.01*l);
	ctx.arc(0.9*l,0.15*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.9*l,0.2*l+t*0.01*l);
	ctx.arc(0.9*l,0.2*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.9*l,0.25*l+t*0.01*l);
	ctx.arc(0.9*l,0.25*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();	
	
	ctx.beginPath();
	ctx.moveTo(0.9*l,0.3*l+t*0.01*l);
	ctx.arc(0.9*l,0.3*l+t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.7*l-t*0.01*l,0.35*l);
	ctx.arc(0.7*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.75*l-t*0.01*l,0.35*l);
	ctx.arc(0.75*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.8*l-t*0.01*l,0.35*l);
	ctx.arc(0.8*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.85*l-t*0.01*l,0.35*l);
	ctx.arc(0.85*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.9*l-t*0.01*l,0.35*l);
	ctx.arc(0.9*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
}

function draw_current_power_supply(t)
{
	ctx.fillStyle = "yellow";
	
	ctx.beginPath();
	ctx.moveTo(0.1*l,0.15*l-t*0.01*l);
	ctx.arc(0.1*l,0.15*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.1*l,0.2*l-t*0.01*l);
	ctx.arc(0.1*l,0.2*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();	
		
	ctx.beginPath();
	ctx.moveTo(0.1*l,0.25*l-t*0.01*l);
	ctx.arc(0.1*l,0.25*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
		
	ctx.beginPath();
	ctx.moveTo(0.1*l,0.3*l-t*0.01*l);
	ctx.arc(0.1*l,0.3*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
		
	ctx.beginPath();
	ctx.moveTo(0.1*l,0.35*l-t*0.01*l);
	ctx.arc(0.1*l,0.35*l-t*0.01*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.4*l-t*0.01*l,0.35*l);
	ctx.arc(0.4*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.35*l-t*0.01*l,0.35*l);
	ctx.arc(0.35*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
		
	ctx.beginPath();
	ctx.moveTo(0.3*l-t*0.01*l,0.35*l);
	ctx.arc(0.3*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
		
	ctx.beginPath();
	ctx.moveTo(0.25*l-t*0.01*l,0.35*l);
	ctx.arc(0.25*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
		
	ctx.beginPath();
	ctx.moveTo(0.2*l-t*0.01*l,0.35*l);
	ctx.arc(0.2*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
			
	ctx.beginPath();
	ctx.moveTo(0.15*l-t*0.01*l,0.35*l);
	ctx.arc(0.15*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
		ctx.beginPath();
	ctx.moveTo(0.6*l-t*0.01*l,0.35*l);
	ctx.arc(0.6*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.55*l-t*0.01*l,0.35*l);
	ctx.arc(0.55*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.5*l-t*0.01*l,0.35*l);
	ctx.arc(0.5*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0.45*l-t*0.01*l,0.35*l);
	ctx.arc(0.45*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(0.65*l-t*0.01*l,0.35*l);
	ctx.arc(0.65*l-t*0.01*l,0.35*l,0.0075*l,0,2*Math.PI,false);
	ctx.fill();	
	
}

function draw_q_on()
{
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";
	ctx.lineWidth = 2;
	 
	//ctx.beginPath();
	//ctx.moveTo(0.1*l,0.1*l);
	//ctx.lineTo(0.2*l,0.1*l);
	//ctx.stroke();

	//el MOS
	ctx.beginPath();
	ctx.moveTo(0.2*l,0.1*l);
	ctx.lineTo(0.2*l,0.15*l);
	ctx.moveTo(0.19*l,0.15*l);
	ctx.lineTo(0.21*l,0.15*l); 
	ctx.moveTo(0.215*l,0.15*l);
	ctx.lineTo(0.235*l,0.15*l);
	ctx.moveTo(0.24*l,0.15*l);
	ctx.lineTo(0.26*l,0.15*l); 
	ctx.moveTo(0.225*l,0.15*l);
	ctx.lineTo(0.225*l,0.10*l);
	ctx.moveTo(0.25*l,0.15*l);
	ctx.lineTo(0.25*l,0.10*l);
	ctx.moveTo(0.225*l,0.1*l);
	ctx.lineTo(0.25*l,0.1*l);
	ctx.stroke();

	//la flecha 
	ctx.beginPath();
	ctx.moveTo(0.215*l,0.13*l);
	ctx.lineTo(0.225*l,0.15*l);
	ctx.lineTo(0.235*l,0.13*l);
	ctx.lineTo(0.215*l,0.13*l);
	ctx.stroke();

	//la base
	ctx.beginPath();
	ctx.moveTo(0.19*l,0.16*l);
	ctx.lineTo(0.255*l,0.16*l);
	ctx.lineTo(0.255*l,0.185*l);
	ctx.stroke();

}

function draw_q_off()
{
	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.fillStyle = "black";
	ctx.lineWidth = 2;
	 
	//ctx.beginPath();
	//ctx.moveTo(0.1*l,0.1*l);
	//ctx.lineTo(0.2*l,0.1*l);
	//ctx.stroke();

	//el MOS
	ctx.beginPath();
	ctx.moveTo(0.2*l,0.1*l);
	ctx.lineTo(0.2*l,0.15*l);
	ctx.moveTo(0.19*l,0.15*l);
	ctx.lineTo(0.21*l,0.15*l); 
	ctx.moveTo(0.215*l,0.15*l);
	ctx.lineTo(0.235*l,0.15*l);
	ctx.moveTo(0.24*l,0.15*l);
	ctx.lineTo(0.26*l,0.15*l); 
	ctx.moveTo(0.225*l,0.15*l);
	ctx.lineTo(0.225*l,0.10*l);
	ctx.moveTo(0.25*l,0.15*l);
	ctx.lineTo(0.25*l,0.10*l);
	ctx.moveTo(0.225*l,0.1*l);
	ctx.lineTo(0.25*l,0.1*l);
	ctx.stroke();

	//la flecha 
	ctx.beginPath();
	ctx.moveTo(0.215*l,0.13*l);
	ctx.lineTo(0.225*l,0.15*l);
	ctx.lineTo(0.235*l,0.13*l);
	ctx.lineTo(0.215*l,0.13*l);
	ctx.stroke();

	//la base
	ctx.beginPath();
	ctx.moveTo(0.19*l,0.16*l);
	ctx.lineTo(0.255*l,0.16*l);
	ctx.lineTo(0.255*l,0.185*l);
	ctx.stroke();

}

function draw_currents()
{	t=t+1;
	t=t%5;
	ctx.clearRect(0,0,l,l);
	draw();
	
	if(Q_on)
	{
		draw_q_on();
	draw_current_mosfet(t);
	//draw_current_diode(t);
	draw_current_inductance(t);
	draw_current_capacitor_down(t);
	draw_resistence(t);
	draw_current_power_supply(t);
	}
	else{
		draw_q_off();
	draw_current_diode(t);
	draw_current_inductance(t);
	draw_current_capacitor_up(t);
	draw_resistence(t);
	}
}








}