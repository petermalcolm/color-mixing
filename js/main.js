/**
 * Main JavaScript for the Color Mixing App
 */

'use strict';

(function iife(){
	console.log('ready to mix colors! ' + colors.length);

	var userColor = 'lightgray';
	var goalColor = 'lightgray';

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
		var newUserColor = '#' + hex;
		swatch.addEventListener('click', function(e) {
			updateUserColor(newUserColor);
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

	function updateUserColor(newColor) {
		// TODO: mix existing color with newColor
		userColor = newColor;
		setUserColor(newColor);
	}

	function nextColor(e) {
		// TODO: make goalColor something mixed
		goalColor = '#' + getRandomColorHex();
		setGoalColor(goalColor);
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

	document.querySelector('#nextColor').addEventListener('click', function(e) {
		nextColor(e);
	});

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
