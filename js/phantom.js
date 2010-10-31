/**
 * Phantom 0.0.1 - JavaScript Isometric Game Engine
 *
 * Copyright (c) 2010 Oliver Morgan (http://github.com/ollym)
 * Licensed under the MIT (http://raphaeljs.com/license.html) license.
 */
(function() {
	
	window.Phantom = function Phantom(canvas, background, size, width, height) {
		
		background = new Phantom.Object(background);
		
		this.size = size;
		this.width = width;
		this.height = height;
		this.canvas = Raphael(canvas, size * width, size * height);
		this.tiles = [];
		
		var self = this;
		
		background.load(function() {
			
			for (var x = 0; x < size; x++) {
				
				self.tiles[x] = [];
				
				for (var y = 0; y < size; y++) {
					
					self.tiles[x][y] = [];
					self.addObject(background, x, y);
				}
			}
			
			self.onload();
			self.loaded = true;
		});
	}
	
	Phantom.version = '0.0.1';
	
	Phantom.createObject = function(sprite, width, height) {
		
		return new Phantom.Object(sprite, width, height);
	}
	
	Phantom.Object = function(sprite, width, height) {
		
		if (width == undefined || height == undefined) {
			
			if (typeof sprite === 'string') {
				
				var src = sprite;

				sprite = new Image();
				sprite.src = src;
			}

			if (sprite instanceof Image) {

				if ( ! sprite.complete) {

					(function(image, object, width, height) {

						image.onload = function() {

							object.width = width || image.width;
							object.height = height || image.height;
							object.loaded = true;

							object.onload();
							object
						}

					})(sprite, this, width, height);
				}
				else {

					this.width = width || sprite.width;
					this.height = height || sprite.height;
					this.loaded = true;

					this.onload();
				}
			}
			
			this.src = sprite.src;
		}
		else {
			
			this.src = sprite;
		}
	}

	Phantom.Object.prototype = {
		
		loaded: false,

		onload: function() { },
		
		load: function(callback) {
			
			this.onload = callback;
			
			if (this.loaded) {
				
				callback();
			}
		}
	}

	Phantom.prototype = {
		
		loaded: false,
		
		onload: function() { },
		
		load: function(callback) {
			
			this.onload = callback;
			
			if (this.loaded) {
				
				callback();
			}
		},
		
		addObject: function(object, x, y) {
			
			if ( ! (object instanceof Phantom.Object)) {
				
				object = Phantom.createObject(object);
			}
			
			var self = this;
			
			object.load(function() {
				
				xpos = (self.width  / 2) * (x - y + self.size) - ((object.width - self.width) / 2);
				ypos = (self.height / 2) * (x + y) - (object.height - self.height);

				object = self.canvas.image(object.src, xpos, ypos, object.width, object.height);
				self.tiles[x][y].push(object);
			});
		}
	}
})();