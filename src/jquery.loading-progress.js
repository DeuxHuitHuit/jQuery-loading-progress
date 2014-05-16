/*
 *  jQuery Loading Progress
 *
 *  Copyright (c) 2012-2014 Deux Huit Huit (http://www.deuxhuithuit.com/)
 *  Licensed under the MIT (https://github.com/DeuxHuitHuit/jQuery-loading-progress/blob/master/LICENSE.txt)
 */

(function ($, undefined) {
	
	'use strict';
	
	// defaults values
	$.loadProgress = {
		defaults: {
			load: null, // function (options)
			global: false,
			total: 0,
			count: 0,
			percent: 0,
			debug: false,
			fakeIncTimeout: 1000,
			timeBased: 0,
			timeBasedPercent: 0
		}
	};
	
	var plugin = function (options) {
		if (!this.length || !this.each) {
			return this;
		}
		
		var t = $(this);
		var o = $.extend({}, $.loadProgress.defaults, $.isFunction(options) ? 
			{load: options} : options
		);
		
		if (!!o.timeBased) {
			o.timeBased = Math.max(20, o.timeBased || 0);
		}
		
		var updatePercent = function () {
			o.percent = Math.max(Math.min(100, ~~((o.count / o.total) * 100) || 0), o.percent);
		};
		
		var loaded = function () {
			stopFakeIncTimer();
			
			if (!!o.debug && !!window.console) {
				console.log('window loaded at 100%, ' + o.count + '/' + o.total);
			}
			
			o.percent = 100;
			o.global = true;
			
			if ($.isFunction(o.load)) {
				o.load.call(t, o);
			}
		};
		
		var loadElem = function () {
			var t = $(this);
			var src = t.attr('src') || t.attr('data-src');
			
			stopFakeIncTimer();
			
			o.count++;
			
			if (!o.global) { // global load was raised, forget about the last elements
				updatePercent();
				
				if (!!o.debug && !!window.console) {
					console.log( o.count + '/' + o.total + ' ' + src );
				}
				
				if (!o.timeBased && $.isFunction(o.load)) {
					o.load.call(t, o);
				}
				
				startFakeIncTimer();
			}
		};
		
		var loading = function (elems) {
			var loadElems = []; 
				
			elems.each(function (index, elem) {
				var t = $(elem);
				var src = t.attr('src') || t.attr('data-src');
				
				if (!!src && !~$.inArray(src, loadElems)) {
					loadElems.push(src);
					t.load(loadElem);
				}
			});
			
			o.total = loadElems.length;
		};
		
		var timeBasedCallback = function () {
			
			// update timeBasedPercent
			o.timeBasedPercent = Math.min(o.percent, o.timeBasedPercent + 1);
			o.timeBasedGlobal = o.timeBasedPercent >= 100;
			
			if (!!o.debug && !!window.console) {
				console.log(o.percent, o.timeBasedPercent);
			}
			
			if ($.isFunction(o.load)) {
				o.load.call(t, o);
			}
			if (!o.timeBasedGlobal) {
				setTimeout(timeBasedCallback, o.timeBased);
			}
		};
		
		var fakeIncTimer = 0;
		
		var fakeIncCallback = function (modulo) {
			if (!!o.global) {
				return;
			}
			// simulate *some* download
			var random = (~~(Math.random() * 100000)) % (modulo || 3);
			o.percent = Math.min(100, o.percent + (random + 1));
			
			if (!!o.debug && !!window.console) {
				console.log( o.count + '/' + o.total + ' *FAKE*' );
			}
			
			if (!o.timeBased && $.isFunction(o.load)) {
				o.load.call(t, o);
			}
			
			startFakeIncTimer();
		};
		
		var startFakeIncTimer = function () {
			// start fake increment timer, if enabled and not running
			if (!!o.fakeIncTimeout && !o.global && !fakeIncTimer) {
				fakeIncTimer = setTimeout(fakeIncCallback, o.fakeIncTimeout);
			}
		};
		
		var stopFakeIncTimer = function () {
			if (!!fakeIncTimer) {
				clearTimeout(fakeIncTimer);
				fakeIncTimer = 0;
			}
		};
		
		// hook up event
		loading(t);
		
		// hook up global event
		$(window).load(loaded);
		
		if (!!o.timeBased) {
			timeBasedCallback();
		}
		
		fakeIncCallback(20);
		
		return t;
	};
	
	// actual plugin
	$.fn.extend({
		loadProgress: plugin
	});
	
})(jQuery);