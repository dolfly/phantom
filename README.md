#Welcome to Phantom

Phantom is an isometric rendering engine build on-top of the fantastic Raphael vector rendering engine.

## Roadmap

* 0.1.0 - Rendering and basic animation support
* 0.2.0 - Full animation and plugin support
* 0.3.0 - Optimisations and code cleanup
* 1.0.0 - Networking and server-side support

## Quick-Start

Currently Phantom only supports square maps i.e. maps with the same rows as columns. This is an easy fix to change, and will be fixed in the near future.

	// Create a new phantom canvas with img/background as the default background tile 50x50 size and the default tile size to 160x90 pixels
	var canvas = Phantom(window.getElementById('canvas'), 'img/background.png', 50, 160, 90);
	
	// Wait for the canvas to load
	canvas.load(function() {
		
		// Add a house object at coordinates (3,5) where x=5 and y=5
		canvas.addObject('img/house.png', 3, 5);
	});
	
Make sure you have a valid HTML page with a div with ID canvas, add the script to the bottom of the page and see the results.

## Examples

Being a difficult library to write tests for, i test my code through examples. View my examples here: http://ollym.github.com/phantom