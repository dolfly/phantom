/**
 * Phantom 0.0.2 - JavaScript Isometric Game Engine
 *
 * Copyright (c) 2010 Oliver Morgan (http://github.com/ollym)
 * Licensed under the MIT (http://raphaeljs.com/license.html) license.
 */
(function() {
	
	window.Phantom = function Phantom(canvas, background, size, tileWidth, tileHeight) {
		
		if ( ! (this instanceof Phantom)) {
			
			return new Phantom(canvas, background, size, tileWidth, tileHeight);
		}
		
		if ( ! (background instanceof Image)) {
			
			var src = background;
			background = new Image();
			background.src = src;
		}
		
		this.size = size || 50;
		this.tileWidth = tileWidth || 160;
		this.tileHeight = tileHeight || 90;
		
		this.canvas = Raphael(canvas, size * tileWidth, size * tileHeight);
		this.tiles = [];
		
		var self = this;
		
		background.onload = function() {
			
			for (var x = 0; x < size; x++) {
				
				self.tiles[x] = [];
				
				for (var y = 0; y < size; y++) {
					
					self.tiles[x][y] = [];
					
					var obj = self.createObject(background, x, y);
					
					(function(a, b, c) {
						
						a.element.click(function() {
							
							self.onclick(b, c)
						});
						
					})(obj, x, y)
				}
			}
			
			self.onload();
			self.loaded = true;
		};
		
		if (background.complete) {
			
			background.onload();
		}
	}
	
	Phantom.version = '0.0.1';
	
	Phantom.prototype = {
		
		loaded: false,
		
		onload: function() { },
		
		load: function(callback) {
			
			this.onload = callback;
			
			if (this.loaded) {
				
				callback();
			}
		},
		
		createObject: function(image, x, y) {
			
			var obj = this.tiles[x][y] = new Phantom.Object(this, image, x, y);
			
			return obj;
		}
	}
	
	Phantom.Object = function(container, src, x, y) {
		
		if ( ! (this instanceof Phantom.Object)) {
			
			return new Phantom.Object(container, src, x, y);
		}
		
		this.container = container;
		
		var self = this;
		
		function onload() {
			
			self.element = container.canvas.image(image.src);
			self.attr('width', image.width);
			self.attr('height', image.height);
			self.element.attr('x', self.cartToIsoX(x, y));
			self.element.attr('y', self.cartToIsoY(y, x));
		}
		
		if ( ! (src instanceof Image)) {
			
			var image = new Image();
			image.onload = onload;
			image.src = src;
		}
		else {
			
			var image = src;
			
			image.onload = onload;
			
			if (image.complete) {
				
				image.onload();
			}
		}
	}

	Phantom.Object.prototype = {
		
		cartToIsoX: function(xpos, ypos) {
			return (this.container.tileWidth  / 2) * (xpos - ypos + (this.container.size - 1)) - ((this.attr('width') - this.container.tileWidth) / 2);
		},
		
		cartToIsoY: function(ypos, xpos) {
			return (this.container.tileHeight / 2) * (xpos + ypos) - (this.attr('height') - this.container.tileHeight);
		},
		
		attr: function(name, value) {
			
			switch (name) {
				
				case 'x': return (value === undefined) ? this.x : this.element.attr('x', this.cartToIsoX(this.x = value, this.attr('y')));
				case 'y': return (value === undefined) ? this.y : this.element.attr('y', this.cartToIsoY(this.y = value, this.attr('x')));
				default: return this.element.attr(name, value);
			}
		}
	}
})();