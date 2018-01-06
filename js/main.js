/**
 * Main JavaScript for the Color Mixing App
 */

'use strict';

(function iife(){
	console.log('ready to mix colors! ' + colors.length);

	var goalColor = 'lightblue';

	function initPalette() {
		var palette = document.querySelector('#palette');
		palette.innerHTML ='<h2>Your Colors</h2>';
		for (var i = 0; i < colors.length; i++) {
			var el = document.createElement('div');
			el.id = colors[i].name;
			el.className = 'colorChoice';
			var elName = document.createElement('span');
			elName.innerHTML = colors[i].name;
			var elSwatch = document.createElement('div');
			elSwatch.className = 'colorSwatch';
			elSwatch.style.backgroundColor = '#' + colors[i].hex;
			eventListenerForSwatch(elSwatch,colors[i].hex);
			el.appendChild(elName);
			el.appendChild(elSwatch);
			palette.appendChild(el);
		}
	}

	function eventListenerForSwatch(swatch,hex) {
		var newUserColor = '#' + hex;
		swatch.addEventListener('click', function(e) {
			updateUserColor(newUserColor);
		})
	}

	function updateUserColor(newColor) {
		// TODO: mix existing color with newColor
		setUserColor(newColor);
	}

	function initGoalColor() {
		setGoalColor(goalColor);
	}

	function nextColor(e) {
		setGoalColor('yellow');
	}

	function setGoalColor(newColor) {
		document.querySelector('#goal').style.backgroundColor = newColor;
	}

	function setUserColor(newColor) {
		document.querySelector('#userColor').style.backgroundColor = newColor;
	}

	document.addEventListener("DOMContentLoaded", function(event) { 
		initPalette();
		initGoalColor();
	});

	document.querySelector('#nextColor').addEventListener('click', function(e) {
		nextColor(e);
	});

}());
