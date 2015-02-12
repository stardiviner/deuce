#!/usr/bin/env node
/*jslint node: true stupid: true nomen: true */

'use strict';

process.env.TERM = 'dumb';

var java = require('java');
java.classpath.push(__dirname + '/../../target/deuce-0.1.0-SNAPSHOT-standalone.jar');

var Clojure = java.import('clojure.java.api.Clojure'),
    cljRequire = Clojure.varSync('clojure.core/require'),
    cljSymbol = Clojure.varSync('clojure.core/symbol'),
    cljsReadString = Clojure.varSync('clojure.core/read-string'),
    cljsEval = Clojure.varSync('clojure.core/eval');

cljRequire.invokeSync(cljSymbol.invokeSync('deuce.main'));
Clojure.varSync('deuce.emacs.lread/load').invokeSync('deuce-loadup.el');

console.log(Clojure.varSync('deuce.emacs/emacs-version').invokeSync());

module.exports.Clojure = Clojure;
module.exports.evalClojure = function (s, f) {
    cljsReadString.invoke(s, function (form) {
        cljsEval.invoke(form, f);
    });
};
module.exports.evalClojureSync = function (s) {
    return cljsEval.invokeSync(cljsReadString.invokeSync(s));
};