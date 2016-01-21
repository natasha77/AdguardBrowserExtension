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
 * Adguard rules constructor library
 */
var AdguardRulesConstructorLib = {

        /**
         * Constructs adguard rule text from element node and specified options
         *
         * var options = {
		 *  isBlockByUrl: boolean,
		 *	urlBlockAttribute: url mask,
		 *	isBlockSimilar : boolean,
		 *	isBlockOneDomain: boolean,
		 *	domain: domain string
		 * }
         *
         * @param element
         * @param options
         * @returns {*}
         */
        constructRuleText: function (element, options) {
            if (options.isBlockByUrl) {
                var blockUrlRuleText = this._constructUrlBlockRuleText(element, options.urlMask, options.isBlockOneDomain, options.domain);
                if (blockUrlRuleText) {
                    return blockUrlRuleText;
                }
            }

            var result;
            if (options.isBlockSimilar) {
                result = this._createSimilarRuleText(element);
            } else {
                result = this._createRuleText(element);
            }

            if (!options.isBlockOneDomain) {
                result = options.domain + result;
            }

            return result;
        },

        _createRuleText: function (element) {
            if (!element) {
                return;
            }

            var selector = this.makeCssNthChildFilter(element);
            return selector ? "##" + selector : "";
        },

        _createSimilarRuleText: function (element) {
            if (!element) {
                return "";
            }

            var className = element.className;
            if (!className) {
                return "";
            }

            var selector = className.trim().replace(/\s+/g, ', .');
            return selector ? "##" + '.' + selector : "";
        },

        _constructUrlBlockRuleText: function (element, urlBlockAttribute, oneDomain, domain) {
            if (!urlBlockAttribute || urlBlockAttribute == '') {
                return null;
            }

            var blockUrlRuleText = urlBlockAttribute.replace(/^http:\/\/(www\.)?/, "||");
            if (blockUrlRuleText.indexOf('.') == 0) {
                blockUrlRuleText = blockUrlRuleText.substring(1);
            }

            if (!oneDomain) {
                blockUrlRuleText = blockUrlRuleText + "$" + "domain=" + domain;
            }

            return blockUrlRuleText;
        },

        /**
         * Utility method
         *
         * @param element
         * @returns {string}
         */
        makeCssNthChildFilter: function (element) {

            var path = [];
            var el = element;
            while (el.parentNode) {
                var nodeName = el && el.nodeName ? el.nodeName.toUpperCase() : "";
                if (nodeName == "BODY") {
                    break;
                }
                if (el.id) {
                    var id = el.id.split(':').join('\\:');//case of colon in id. Need to escape
                    if (el.id.indexOf('.') > -1) {
                        path.unshift('[id="' + id + '"]');
                    } else {
                        path.unshift('#' + id);
                    }
                    break;
                } else {
                    var c = 1;
                    for (var e = el; e.previousSibling; e = e.previousSibling) {
                        if (e.previousSibling.nodeType === 1) {
                            c++;
                        }
                    }

                    var cldCount = 0;
                    for (var i = 0; el.parentNode && i < el.parentNode.childNodes.length; i++) {
                        cldCount += el.parentNode.childNodes[i].nodeType == 1 ? 1 : 0;
                    }

                    var ch;
                    if (cldCount == 0 || cldCount == 1) {
                        ch = "";
                    } else if (c == 1) {
                        ch = ":first-child";
                    } else if (c == cldCount) {
                        ch = ":last-child";
                    } else {
                        ch = ":nth-child(" + c + ")";
                    }

                    var className = el.className;
                    if (className) {
                        if (className.indexOf('.') > 0) {
                            className = '[class="' + className + '"]';
                        } else {
                            className = className.trim().replace(/ +(?= )/g, ''); //delete more than one space between classes;
                            className = '.' + className.replace(/\s/g, ".");
                        }
                    } else {
                        className = '';
                    }
                    path.unshift(el.tagName + className + ch);

                    el = el.parentNode;
                }
            }
            return path.join(" > ");
        }
    }
    ;