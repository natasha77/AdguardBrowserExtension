/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Balalaika library
 *
 * https://github.com/finom/balalaika/blob/master/balalaika.js
 */
//var balalaika=function(t,e,n,i,o,r,s,u,c,f,l,h){return h=function(t,e){return new h.i(t,e)},h.i=function(i,o){n.push.apply(this,i?i.nodeType||i==t?[i]:""+i===i?/</.test(i)?((u=e.createElement(o||"q")).innerHTML=i,u.children):(o&&h(o)[0]||e).querySelectorAll(i):/f/.test(typeof i)?/c/.test(e.readyState)?i():h(e).on("DOMContentLoaded",i):i:n)},h.i[l="prototype"]=(h.extend=function(t){for(f=arguments,u=1;u<f.length;u++)if(l=f[u])for(c in l)t[c]=l[c];return t})(h.fn=h[l]=n,{on:function(t,e){return t=t.split(i),this.map(function(n){(i[u=t[0]+(n.b$=n.b$||++o)]=i[u]||[]).push([e,t[1]]),n["add"+r](t[0],e)}),this},off:function(t,e){return t=t.split(i),l="remove"+r,this.map(function(n){if(f=i[t[0]+n.b$],u=f&&f.length)for(;c=f[--u];)e&&e!=c[0]||t[1]&&t[1]!=c[1]||(n[l](t[0],c[0]),f.splice(u,1));else!t[1]&&n[l](t[0],e)}),this},is:function(t){return u=this[0],(u.matches||u["webkit"+s]||u["moz"+s]||u["ms"+s]).call(u,t)}}),h}(window,document,[],/\.(.+)/,0,"EventListener","MatchesSelector");

var balalaika = (function (window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $) {
    $ = function (s, context) {
        return new $.i(s, context);
    };

    $.i = function (s, context) {
        fn.push.apply(this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test(s)
            ? ( ( i = document.createElement(context || 'q') ).innerHTML = s, i.children ) : (context && $(context)[0] || document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s);
    };

    $.i[l = 'prototype'] = ( $.extend = function (obj) {
        k = arguments;
        for (i = 1; i < k.length; i++) {
            if (l = k[i]) {
                for (j in l) {
                    obj[j] = l[j];
                }
            }
        }

        return obj;
    })($.fn = $[l] = fn, { // $.fn = $.prototype = fn
        on: function (n, f) {
            // n = [ eventName, nameSpace ]
            n = n.split(nsRegAndEvents);
            this.map(function (item) {
                // item.b$ is balalaika_id for an element
                // i is eventName + id ("click75")
                // nsRegAndEvents[ i ] is array of events (eg all click events for element#75) ([[namespace, handler], [namespace, handler]])
                ( nsRegAndEvents[i = n[0] + ( item.b$ = item.b$ || ++id )] = nsRegAndEvents[i] || [] ).push([f, n[1]]);
                // item.addEventListener( eventName, f )
                item['add' + s_EventListener](n[0], f);
            });
            return this;
        },
        off: function (n, f) {
            // n = [ eventName, nameSpace ]
            n = n.split(nsRegAndEvents);
            // l = 'removeEventListener'
            l = 'remove' + s_EventListener;
            this.map(function (item) {
                // k - array of events
                // item.b$ - balalaika_id for an element
                // n[ 0 ] + item.b$ - eventName + id ("click75")
                k = nsRegAndEvents[n[0] + item.b$];
                // if array of events exist then i = length of array of events
                if (i = k && k.length) {
                    // while j = one of array of events
                    while (j = k[--i]) {
                        // if( no f and no namespace || f but no namespace || no f but namespace || f and namespace )
                        if (( !f || f == j[0] ) && ( !n[1] || n[1] == j[1] )) {
                            // item.removeEventListener( eventName, handler );
                            item[l](n[0], j[0]);
                            // remove event from array of events
                            k.splice(i, 1);
                        }
                    }
                } else {
                    // if event added before using addEventListener, just remove it using item.removeEventListener( eventName, f )
                    !n[1] && item[l](n[0], f);
                }
            });
            return this;
        },
        is: function (s) {
            i = this[0];
            return (i.matches
            || i['webkit' + s_MatchesSelector]
            || i['moz' + s_MatchesSelector]
            || i['ms' + s_MatchesSelector]
            || i['o' + s_MatchesSelector]).call(i, s);
        }
    });
    return $;
})(window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector');

/**
 * Add some more functions to balalaika
 */
balalaika.fn.hasClass = function (className) {
    return !!this[0] && this[0].classList.contains(className);
};

balalaika.fn.addClass = function (className) {
    this.forEach(function (item) {
        var classList = item.classList;
        classList.add.apply(classList, className.split(/\s/));
    });
    return this;
};

balalaika.fn.removeClass = function (className) {
    this.forEach(function (item) {
        var classList = item.classList;
        classList.remove.apply(classList, className.split(/\s/));
    });
    return this;
};

balalaika.fn.get = function (index) {
    return this.length > index ? this[index] : null;
};


/**
 * Adguard selector library
 */
var AdguardSelectorLib = (function (api, $) {

    // PRIVATE FIELDS

    var BORDER_WIDTH = 5;
    var BORDER_PADDING = 2;
    var BORDER_CLASS = "sg_border";

    var borderTop = null;
    var borderLeft = null;
    var borderRight = null;
    var borderBottom = null;

    var PLACEHOLDER_PREFIX = 'adguard-placeholder';
    var placeholderElements = null;

    var restrictedElements = null;
    var predictionHelper = null;

    var SUGGESTED_CLASS = "sg_suggested";
    var SELECTED_CLASS = "sg_selected";
    var REJECTED_CLASS = "sg_rejected";
    var IGNORED_CLASS = "sg_ignore";

    var selectedElements = [];
    var rejectedElements = [];

    var selectMode = 'exact';
    var unbound = true;
    var onElementSelectedHandler = null;


    // PRIVATE METHODS

    var removeClassName = function (className) {
        $('.' + className).removeClass(className);
    };

    var suggestPredicted = function (prediction) {
        if (prediction) {
            var count = 0;
            $(prediction).each(function () {
                count += 1;
                if (!$(this).hasClass(SELECTED_CLASS)
                    && !$(this).hasClass(IGNORED_CLASS)
                    && !$(this).hasClass(REJECTED_CLASS)) {
                    $(this).addClass(SUGGESTED_CLASS);
                }
            });
        }
    };

    var makePredictionPath = function (elem) {
        var w_elem = $(elem);

        if (w_elem.hasClass(SELECTED_CLASS)) {
            w_elem.removeClass(SELECTED_CLASS);
            selectedElements.splice($.inArray(elem, selectedElements), 1);
        } else if (w_elem.hasClass(REJECTED_CLASS)) {
            w_elem.removeClass(REJECTED_CLASS);
            rejectedElements.splice($.inArray(elem, rejectedElements), 1);
        } else if (w_elem.hasClass(SUGGESTED_CLASS)) {
            w_elem.addClass(REJECTED_CLASS);
            rejectedElements.push(elem);
        } else {
            if (selectMode == 'exact' && selectedElements.length > 0) {
                removeClassName(SELECTED_CLASS);
                selectedElements = [];
            }
            //w_elem.addClass('sg_selected');
            selectedElements.push(elem);
        }

        var prediction = predictionHelper.predictCss(selectedElements,
            rejectedElements.concat(restrictedElements));

        if (selectMode == 'similar') {
            removeClassName(SUGGESTED_CLASS);
            suggestPredicted(prediction);
        }

        return prediction;
    };

    var firstSelectedOrSuggestedParent = function (element) {
        if ($(element).hasClass(SUGGESTED_CLASS) || $(element).hasClass(SELECTED_CLASS)) {
            return element;
        }

        while (element.parentNode && (element = element.parentNode)) {
            if ($.inArray(element, restrictedElements) == -1) {
                if ($(element).hasClass(SUGGESTED_CLASS) || $(element).hasClass(SELECTED_CLASS)) {
                    return element;
                }
            }
        }

        return null;
    };


    var px = function (p) {
        return p + 'px';
    };

    var getTagPath = function (element) {
        if (element.parentNode) {
            return element.parentNode.tagName.toLowerCase() + ' ' + element.tagName.toLowerCase();
        } else {
            return element.tagName.toLowerCase();
        }
    };

    var removeBorderFromDom = function () {
        if (borderTop) {
            borderTop.remove();
            borderBottom.remove();
            borderLeft.remove();
            borderRight.remove();
        }
    };

    var addBorderToDom = function () {
        document.body.appendChild(borderTop.get(0));
        document.body.appendChild(borderBottom.get(0));
        document.body.appendChild(borderLeft.get(0));
        document.body.appendChild(borderRight.get(0));
    };

    var showBorders = function () {
        borderTop.show();
        borderBottom.show();
        borderLeft.show();
        borderRight.show();
    };

    var removeBorders = function () {
        if (borderTop) {
            borderTop.hide();
            borderBottom.hide();
            borderLeft.hide();
            borderRight.hide();
        }
    };

    var clearSelected = function () {
        selectedElements = [];
        rejectedElements = [];

        removeClassName(SELECTED_CLASS);
        removeClassName(REJECTED_CLASS);

        removeBorders();
        removeClassName(SUGGESTED_CLASS);
    };

    /**
     * Adds borders to selected element.
     *
     * Default implementation of selection renderer.
     * Can be overwritten with custom implementation as a parameter of init function.
     *
     * @param element
     * @private
     */
    var selectionRenderer = function (element) {
        removeBorders();
        setupBorders();

        if (!element) {
            return;
        }

        var elem = $(element);
        var p = elem.offset();

        var top = p.top;
        var left = p.left;
        var width = elem.outerWidth();
        var height = elem.outerHeight();

        borderTop.css('width', px(width + BORDER_PADDING * 2 + BORDER_WIDTH * 2)).
            css('top', px(top - BORDER_WIDTH - BORDER_PADDING)).
            css('left', px(left - BORDER_PADDING - BORDER_WIDTH));
        borderBottom.css('width', px(width + BORDER_PADDING * 2 + BORDER_WIDTH * 2 - 5)).
            css('top', px(top + height + BORDER_PADDING)).
            css('left', px(left - BORDER_PADDING - BORDER_WIDTH)).text(getTagPath(element));
        borderLeft.css('height', px(height + BORDER_PADDING * 2)).
            css('top', px(top - BORDER_PADDING)).
            css('left', px(left - BORDER_PADDING - BORDER_WIDTH));
        borderRight.css('height', px(height + BORDER_PADDING * 2)).
            css('top', px(top - BORDER_PADDING)).
            css('left', px(left + width + BORDER_PADDING));

        borderRight.get(0).target_elem = borderLeft.get(0).target_elem = borderTop.get(0).target_elem = borderBottom.get(0).target_elem = element;

        showBorders();
    };

    var linkHelper = document.createElement('a');
    var getHost = function (url) {
        if (!url) {
            return "";
        }

        linkHelper.href = url;
        return linkHelper.hostname;
    };

    var makePlaceholderImage = function (element) {
        var jElement = $(element);

        var placeHolder = document.createElement('div');
        placeHolder.style.height = jElement.height() + 'px';
        placeHolder.style.width = jElement.width() + 'px';
        placeHolder.style.position = jElement.css('position');
        placeHolder.style.top = jElement.css('top');
        placeHolder.style.bottom = jElement.css('bottom');
        placeHolder.style.left = jElement.css('left');
        placeHolder.style.right = jElement.css('right');
        placeHolder.className += PLACEHOLDER_PREFIX;

        var icon = document.createElement('div');
        icon.className += PLACEHOLDER_PREFIX + "-icon " + IGNORED_CLASS;

        var domain = document.createElement('div');
        domain.textContent = getHost(element.src);
        domain.className += PLACEHOLDER_PREFIX + "-domain " + IGNORED_CLASS;

        icon.appendChild(domain);
        placeHolder.appendChild(icon);

        return placeHolder;
    };

    var removePlaceholders = function () {
        if (!placeholderElements) {
            return;
        }

        var elements = placeholderElements;
        for (var i = 0; i < elements.length; i++) {
            var current = elements[i];
            var id = PLACEHOLDER_PREFIX + i;
            $('#' + id).replaceWith($(current));
        }

        placeholderElements = null;
    };

    var placeholderClick = function (e) {
        var element = e.data.actualElement;

        removeBorders();
        removePlaceholders();

        onElementSelectedHandler(element);
    };

    var makeIFrameAndEmbededSelector = function () {
        placeholderElements = $('iframe:not(.' + IGNORED_CLASS + ',:hidden),embed,object');
        var elements = placeholderElements;
        for (var i = 0; i < elements.length; i++) {
            var current = elements[i];
            var placeHolder = makePlaceholderImage(current);
            var id = PLACEHOLDER_PREFIX + i;

            placeHolder.setAttribute("id", id);
            $(current).replaceWith(placeHolder);
            $('#' + id).on('click', {'self': this, 'actualElement': current}, placeholderClick);
        }
    };

    var sgMouseoverHandler = function () {
        if (unbound) {
            return true;
        }

        if (this == document.body || this == document.body.parentNode) {
            return false;
        }

        var parent = firstSelectedOrSuggestedParent(this);
        if (parent != null && parent != this) {
            selectionRenderer(parent, true);
        }
        else {
            selectionRenderer(this);
        }

        return false;
    };

    var sgMouseoutHandler = function () {
        if (unbound) {
            return true;
        }

        if (this == document.body || this == document.body.parentNode) {
            return false;
        }

        removeBorders();
        return false;
    };

    /**
     * Block clicks for a moment by covering this element with a div.
     *
     * @param elem
     * @returns {boolean}
     * @private
     */
    var blockClicksOn = function (elem) {
        elem = $(elem);
        var p = elem.offset();
        var block = $('<div>').css('position', 'absolute').css('z-index', '9999999').css('width', px(elem.outerWidth())).
            css('height', px(elem.outerHeight())).css('top', px(p.top)).css('left', px(p.left)).
            css('background-color', '');
        document.body.appendChild(block.get(0));

        setTimeout(function () {
            block.remove();
        }, 400);

        return false;
    };

    var sgMousedownHandler = function (e) {
        e.preventDefault();

        if (unbound) {
            return true;
        }

        var elem = this;
        var w_elem = $(elem);
        if (w_elem.hasClass(BORDER_CLASS)) {
            //Clicked on one of our floating borders, target the element that we are bordering.
            elem = elem.target_elem || elem;
        }

        if (elem == document.body || elem == document.body.parentNode) {
            return;
        }

        // Don't allow selection of elements that have a selected child.
        if ($('.' + SELECTED_CLASS, this).get(0)) {
            blockClicksOn(elem);
        }

        makePredictionPath(elem);

        removeBorders();
        blockClicksOn(elem);

        // Refresh the borders by triggering a new mouseover event.
        w_elem.trigger("mouseover", {'self': this});

        onElementSelectedHandler(elem);

        return false;
    };


    var setupEventHandlers = function () {
        makeIFrameAndEmbededSelector();

        var sgIgnore = $("body *:not(." + IGNORED_CLASS + ")");
        sgIgnore.on("mouseover", {'self': this}, sgMouseoverHandler);
        sgIgnore.on("mouseout", {'self': this}, sgMouseoutHandler);
        sgIgnore.on("click", {'self': this}, sgMousedownHandler);
    };

    var deleteEventHandlers = function () {
        removePlaceholders();

        var elements = $("body *");
        elements.off("mouseover", sgMouseoverHandler);
        elements.off("mouseout", sgMouseoutHandler);
        elements.off("click", sgMousedownHandler);
    };

    var setupBorders = function () {
        if (!borderTop) {
            var width = px(BORDER_WIDTH);

            borderTop = $('<div>').addClass(BORDER_CLASS).css('height', width).hide()
                .on("click", {'self': this}, sgMousedownHandler);
            borderBottom = $('<div>').addClass(BORDER_CLASS).addClass('sg_bottom_border')
                .css('height', px(BORDER_WIDTH + 6)).hide()
                .bind("click", {'self': this}, sgMousedownHandler);
            borderLeft = $('<div>').addClass(BORDER_CLASS).css('width', width).hide()
                .on("click", {'self': this}, sgMousedownHandler);
            borderRight = $('<div>').addClass(BORDER_CLASS).css('width', width).hide()
                .on("click", {'self': this}, sgMousedownHandler);

            addBorderToDom();
        }
    };


    // PUBLIC API

    /**
     * Starts selector module.
     *
     * @param onElementSelected callback function
     * @param selectionRenderFunc optional function contains selection presentation implementation
     */
    api.init = function (onElementSelected, selectionRenderFunc) {

        onElementSelectedHandler = onElementSelected;
        if (selectionRenderFunc && typeof selectionRenderFunc === "function") {
            selectionRenderer = selectionRenderFunc;
        }

        restrictedElements = ['html', 'body', 'head', 'base'].map(function (selector) {
            return $(selector).get(0);
        });
        predictionHelper = new DomPredictionHelper($, String);

        setupEventHandlers();
        unbound = false;
    };

    /**
     * Resets state of selector.
     * Clears current selection.
     */
    api.reset = function () {
        clearSelected();
    };

    /**
     * Destroys selector module.
     * Removes all selector elements and unbinds event handlers.
     */
    api.close = function () {
        unbound = true;

        removeBorderFromDom();
        deleteEventHandlers();
    };

    /**
     * Selects specified element.
     * Marks element as selected and holds selection on it.
     *
     * @param element
     */
    api.selectElement = function (element) {
        selectionRenderer(element);

        unbound = true;
        deleteEventHandlers();
    };

    return api;

})(AdguardSelectorLib || {}, balalaika);