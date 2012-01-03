/*!
 * Casper is a navigation utility for PhantomJS.
 *
 * Documentation: http://n1k0.github.com/casperjs/
 * Repository:    http://github.com/n1k0/casperjs
 *
 * Copyright (c) 2011-2012 Nicolas Perriault
 *
 * Part of source code is Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

exports.create = function() {
    return new Colorizer();
};

/**
 * This is a port of lime colorizer.
 * http://trac.symfony-project.org/browser/tools/lime/trunk/lib/lime.php)
 *
 * (c) Fabien Potencier, Symfony project, MIT license
 */
var Colorizer = function() {
    var options    = { bold: 1, underscore: 4, blink: 5, reverse: 7, conceal: 8 };
    var foreground = { black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 };
    var background = { black: 40, red: 41, green: 42, yellow: 43, blue: 44, magenta: 45, cyan: 46, white: 47 };
    var styles     = {
        'ERROR':     { bg: 'red', fg: 'white', bold: true },
        'INFO':      { fg: 'green', bold: true },
        'TRACE':     { fg: 'green', bold: true },
        'PARAMETER': { fg: 'cyan' },
        'COMMENT':   { fg: 'yellow' },
        'WARNING':   { fg: 'red', bold: true },
        'GREEN_BAR': { fg: 'white', bg: 'green', bold: true },
        'RED_BAR':   { fg: 'white', bg: 'red', bold: true },
        'INFO_BAR':  { bg: 'cyan', fg: 'white', bold: true }
    };

    /**
     * Adds a style to provided text.
     *
     * @params  String  text
     * @params  String  styleName
     * @return  String
     */
    this.colorize = function(text, styleName) {
        if (styleName in styles) {
            return this.format(text, styles[styleName]);
        }
        return text;
    };

    /**
     * Formats a text using a style declaration object.
     *
     * @param  String  text
     * @param  Object  style
     * @return String
     */
    this.format = function(text, style) {
        if (typeof style !== "object") {
            return text;
        }
        var codes = [];
        if (style.fg && foreground[style.fg]) {
            codes.push(foreground[style.fg]);
        }
        if (style.bg && background[style.bg]) {
            codes.push(background[style.bg]);
        }
        for (var option in options) {
            if (style[option] === true) {
                codes.push(options[option]);
            }
        }
        return "\033[" + codes.join(';') + 'm' + text + "\033[0m";
    };
};
exports.Colorizer = Colorizer;
