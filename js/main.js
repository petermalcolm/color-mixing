/**
 * Main JavaScript for the Color Mixing App
 */

'use strict';

(function iife(){
	console.log('ready to mix colors! ' + colors.length);

	var userColor = [];
	var goalColor = [];

	// INITIALIZATION 

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

	function initGoalColor() {
		setGoalColor(goalColor);
	}

	function initSuccessModal() {
		hideModal();
		document.querySelector("#successModal").addEventListener('click',function(e) {
			hideModal();
		})
	}

	// MODAL FUNCTIONS

	function hideModal() {
		getModalStyle().display = "none";
	}

	function showModal() {
		getModalStyle().display = "block";
	}

	function getModalStyle() {
		return document.querySelector("#successModal").style;
	}

	function setModalText(newText) {
		document.querySelector("#successModalContent").innerHTML = newText;
	}

	// EVENTS

	function eventListenerForSwatch(swatch,hex) {
		swatch.addEventListener('click', function(e) {
			updateUserColor(hex);
			evaluate();
		})
	}

	/**
	 * Evaluate how close the user is to the color 
	 */
	function evaluate() {
		if( userColor === goalColor ) {
			showModal();
			setModalText('You matched the color!');
		}
	}

	function updateUserColor(newColorHex) {
		// TODO: mix existing color with newColor
		userColor.push(newColorHex);
		setUserColor('#' + renderColorHex(userColor) );
	}

	function nextTry(e) {
		userColor = [];
		unsetUserColor();
	}

	function nextColor(e) {
		// TODO: make goalColor something mixed
		goalColor = [];
		for(var i = 0; i < 2; i++) {
			goalColor.push(getRandomColorHex());
		}
		setGoalColor('#' + renderColorHex(goalColor));
	}

	function getRandomColorHex() {
		return colors[getRandomInt(colors.length)].hex;
	}

	function setGoalColor(newColor) {
		document.querySelector('#goal').style.backgroundColor = newColor;
	}

	function setUserColor(newColor) {
		document.querySelector('#userColor').style.backgroundColor = newColor;
	}

	function unsetUserColor(newColor) {
		document.querySelector('#userColor').style.backgroundColor = '';
	}

	document.querySelector('#nextColor').addEventListener('click', function(e) {
		nextColor(e);
	});

	document.querySelector('#nextTry').addEventListener('click', function(e) {
		nextTry(e);
	});

	// COLOR MANIPULATION

	/**
	 * Returns a hex value based on an array of colors
	 */
	function renderColorHex(colorArray) {
		var r = 0 , g = 0, b = 0;
		var rMask = parseInt('FF0000',16);
		var gMask = parseInt('00FF00',16);
		var bMask = parseInt('0000FF',16);
		for (var i = colorArray.length - 1; i >= 0; i--) {
			r += ( rMask & parseInt(colorArray[i],16) );
			g += ( gMask & parseInt(colorArray[i],16) );
			b += ( bMask & parseInt(colorArray[i],16) );
		}
		r = (r/colorArray.length) & rMask;
		g = (g/colorArray.length) & gMask;
		b = (b/colorArray.length) & bMask;
		var result = (r|g|b).toString(16).padStart(6,'0');
		return result;
	}

	// UTILS
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	// ENTRY POINT
	document.addEventListener("DOMContentLoaded", function(event) { 
		initPalette();
		initGoalColor();
		initSuccessModal();
	});

}());
