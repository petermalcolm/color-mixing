/**
 * Main JavaScript for the Color Mixing App
 */

'use strict';

(function iife(){
	console.log('ready to mix colors! ' + colors.length);
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
		el.appendChild(elName);
		el.appendChild(elSwatch);
		palette.appendChild(el);
	}
}());
