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
			global: false,
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
		o = $.extend({}, $.loadProgress.defaults, $.isFunction(options) ? {load:options} : options),
			
		loaded = function () {
			
			if (!!o.debug) {
				console.log('window loaded at 100%, ' + o.count + '/' + o.total);
			}
			
			o.percent = 100;
			o.global = true;
			
			if ($.isFunction(o.load)) {
				o.load.call(t, o);
			}
		},
		
		loadElem = function () {
			var t = $(this),
				src = t.attr('src') || t.attr('data-src');
			
			o.count++;
			
			if (!o.global) { // global load was raised, forget about the last elements
				o.percent = parseInt( (o.count / o.total) * 100, 10) || 0;
			
				if (!!o.debug) {
					console.log( o.count + '/' + o.total + ' ' + src );
				}
				
				if ($.isFunction(o.load)) {
					o.load.call(t, o);
				}
			}
		},
		
		loading = function (elems) {
			var loadElems = []; 
				
			elems.each(function (index, elem) {
				var t = $(elem),
					src = t.attr('src') || t.attr('data-src');
				
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