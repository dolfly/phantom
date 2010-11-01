(function() {
	
	Phantom.Object.prototype.moveTo = function(x, y, duration, easing) {
		
		xpos = this.cartToIsoX(x, y);
		ypos = this.cartToIsoY(y, x);
		
		this.element.animate({
			x: xpos,
			y: ypos
		}, duration, easing);
	}
	
})();