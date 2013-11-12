"use strict";

var backgroundImage = new Image();
backgroundImage.src = "background.jpg";
var color;
var song;
var magicRatio = 12; // Don't ask

function Color(){
	this.hue = Math.round(Math.random()*360);
	this.saturation = Math.round(Math.random()*100);
	this.lightness = Math.round(Math.random()*100);
	this.opacity = Math.random();
	this.hue2 = this.hue + 180;
	this.lightness2 = this.lightness + 50;

	this.change = function() {
		this.hue += 135 + Math.round(Math.random()*90);
		this.saturation += 40 + Math.round(Math.random()*20);
		this.lightness += 40 + Math.round(Math.random()*20);
		this.opacity += 0.3 + Math.random()*0.4;
		this.hue2 = this.hue + 180;
		this.lightness2 = this.lightness + 50;
		this.wrap();
	}

	this.wrap = function() {
		while(this.hue > 360) {
			this.hue -= 360;
		}
		while(this.hue2 > 360) {
			this.hue2 -= 360;
		}
		while(this.saturation > 100) {
			this.saturation -= 100;
		}
		while(this.lightness > 100) {
			this.lightness -= 100;
		}
		while(this.lightness2 > 100) {
			this.lightness2 -= 100;
		}
		while(this.opacity > 1) {
			this.opacity -= 1;
		}
	}
}

backgroundImage.onload = function() {
	$('body').css('background-image', 'url("background.jpg")');
	song = $('audio')[0];
	color = new Color();
	window.onresize();
	add_handlers();
	// $('.playerDiv').append(
	// 	"<audio>"+
	// 	  '<source src="cool_shade_of_a_palm.mp3" type="audio/mpeg">'+
	// 	  '<source src="cool_shade_of_a_palm.ogg" type="audio/ogg">'+
	// 	'</audio>'
	// );
	$('.startHidden').css('display','block');
	window.setTimeout(function(){
		change_color();
	},1000);
	window.setInterval(function(){
		change_color();
	},4000);
}


function change_color() {
	color.change();
	var newColor = 'hsla('+color.hue+','+color.saturation+'%,'+color.lightness+'%,'+color.opacity+')'; 
	var wordsColor = 'hsl('+color.hue2+','+color.saturation+'%,'+color.lightness2+'%)'; 
	$('#mainBlur').css('background-color', newColor);
	$('#titleDiv').css('color', wordsColor);
	$('#linksDiv').css('color', wordsColor);
}

window.onresize = function(e) {
	var fontSize;
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var aspectRatio = windowWidth/windowHeight;
	if ( aspectRatio > 1.7 )
		fontSize = Math.round( windowHeight*1.7/magicRatio );
	else if ( aspectRatio < 1.5 )
		fontSize = Math.round( windowHeight*1.5/magicRatio );
	else
		fontSize = Math.round( windowWidth/magicRatio);
	if( fontSize*7 > windowWidth )
		fontSize = Math.round( windowWidth/7);
	$('#titleDiv').css('font-size', fontSize + 'px');
	$('#linksDiv').css('font-size', fontSize/2 + 'px');
	$('#titleDiv, #linksDiv').css('width', fontSize*6.5 + 'px');
	$('#linksDiv').css('margin-top', fontSize/2 + 'px');
}

function add_handlers() {
	$('#linksDiv a').on('mouseenter', function(){
		var highlightColor = 'hsla('+color.hue2+',100%,'+color.lightness+'%,0.5)';
		$(this).css('color', highlightColor);
	});
	$('#linksDiv a').on('mouseleave', function(){
		var highlightColor = 'inherit';
		$(this).css('color', highlightColor);
	});
	$('#play').on('click', function(){
		if( $(this).text() == 'Play') {
			song.play();
			$(this).text('Stop');
		}
		else {
			song.pause();
			$(this).text('Play');
		}
	});
	$(song).on('ended', function(){
		$('#play').text('Play');
	});
	$(song).on('loadeddata', function(){
		console.log('loaded');
		$('#play').css('display','inline-block');
	});
}
