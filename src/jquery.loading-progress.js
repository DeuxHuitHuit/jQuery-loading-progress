/*
 *  Sizing v1.0 - jQuery Loading Progress
 *
 *  Copyright (c) 2012 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-loading-progress/blob/master/LICENSE.txt)
 */

(function ($, undefined) {
	
	"use strict";
	
	// defaults values
	$.loadProgress = {
		defaults: {
			load: null, // function (options)
			total: 0,
			count: 0,
			percent: 0,
			debug: false
		}
	};
	
	var 
	
	plugin = function (options) {
		if (!this.length || !this.each) {
			return this;
		}
		
		var
		
		t = $(this),
		o = $.extend({}, $.loadProgress.defaults, options),
			
		loaded = function () {
			
			if (!!o.debug) {
				console.log('100%');
			}
			
			o.percent = 100;
			
			if ($.isFunction(o.load)) {
				o.load.call(t, o);
			}
		},
		
		loadElem = function () {
			var t = $(this),
				src = t.attr('src');
			
			o.count++;
			
			o.percent = parseInt( (o.count / o.total) * 100, 10) || 0;
			
			if (!!o.debug) {
				console.log( o.count + '/' + o.total + ' ' + src );
			}
			
			if ($.isFunction(o.load)) {
				o.load.call(t, o);
			}
		},
		
		loading = function (elems) {
			var loadElems = []; 
				
			elems.each(function (index, elem) {
				var t = $(elem),
					src = t.attr('src');
				
				if (!!src && !~$.inArray(src, loadElems)) {
					loadElems.push(src);
					t.load(loadElem);
				}
			});
			
			o.total = loadElems.length;
		};
		
		// hook up event
		loading(t);
		
		// hook up global event
		$(window).load(loaded);
		
		return t;
	};
	
	// actual plugin
	$.fn.extend({
		loadProgress: plugin
	});
	
})(jQuery);