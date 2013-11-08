"use strict";

var backgroundImage = new Image();
backgroundImage.src = "background.jpg";

$(document).ready(function() {

	backgroundImage.onload = function() {
		$('body').css('background-image', 'url("background.jpg")');
		window.onresize();
		change_color();
		window.setInterval(function(){
			change_color();
		},4000);
	}

	

});

function change_color() {
	var hue = Math.round(Math.random()*360);
	var wordsHue = hue + 180;
	var saturation = Math.round(Math.random()*20) + 80;
	var lightness = Math.round(Math.random()*20) + 40;
	var opacity = Math.random()*0.5;
	var color = 'hsla('+hue+','+saturation+'%,'+lightness+'%,'+opacity+')'; 
	var wordsColor = 'hsl('+wordsHue+','+saturation+'%,'+lightness+'%)'; 
	$('#mainBlur').css('background-color', color);
	$('#titleDiv').css('color', wordsColor);
	$('#linksDiv').css('color', wordsColor);
}

window.onresize = function(e) {
	var fontSize = Math.round( $(window).width()/9.6 );
	$('#titleDiv').css('font-size', fontSize + 'px');
	$('#linksDiv').css('font-size', fontSize/2 + 'px');
}
