/*
@Author: Benny Chen
*/

;(function($, window, document, undefined) {
    'use strict';

    var pluginName = "imgConverter",
        defaultOptions = {
            width:     300,
            height:    200,
            offsetElm: null		//jQuery element for offset, usually the parent / container element
        };

    function Plugin(element, options) {
        this.$element = element;
        this.options  = $.extend({}, defaultOptions, options);
        
        this._defaultOptions = defaultOptions;
        this._pluginName     = pluginName;

        this.init();
    }

    Plugin.prototype = {
        
        init: function() {
            var $elm      = this.$element,
				$frontImg = this.frontImg = $elm.find('.front'),
				$backImg  = this.backImg  = $elm.find('.back'),
				$divider  = this.divider  = $elm.find('.divider'),
				opts      = this.options,
				_self     = this;

			$elm.width(opts.width).height(opts.height);

			//add background images
			$frontImg.css('background-image', 'url("' + $frontImg.find('img').attr('src') + '")');
			$backImg.css('background-image', 'url("' + $backImg.find('img').attr('src') + '")');

			$elm.find('img').hide();

			_self.addEvent(opts);

			//set front image init width and divider init position
			_self.setFrontImgWidth(opts.width * 0.9);
			_self.setdividerPosition(opts.width * 0.9, opts.height * 0.5);
        },

        addEvent: function(opts) {
			this.mouseMoveEvent(opts);
		},

		//event to track mouse position
		mouseMoveEvent: function(opts) {
			var _self = this;

			_self.$element.mousemove(function(e) {
				var fixed_offset = (opts.offsetElm === null) ? { top: 0, left: 0 } : opts.offsetElm.offset(),
                               x = e.pageX - this.offsetLeft - fixed_offset.left,
                               y = e.pageY - this.offsetTop - fixed_offset.top;

				if(x <= opts.width) {
					_self.setFrontImgWidth(x);
					_self.setdividerPosition(x, y);
				}
			});
		},

		//set front image width
		setFrontImgWidth: function(width) {
			if(width >= 0) {
				this.frontImg.width(width);
			}
		},

		//set divider position
		setdividerPosition: function(x, y) {
			this.divider.css('left', x + 'px');
		}
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };

})(jQuery, window, document);