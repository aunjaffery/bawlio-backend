(self.webpackChunkasad_strapi=self.webpackChunkasad_strapi||[]).push([[953],{96477:(n,r,e)=>{!function(n){"use strict";function r(n,r){if(!window.JSHINT)return window.console&&window.console.error("Error: window.JSHINT not defined, CodeMirror JavaScript linting cannot run."),[];r.indent||(r.indent=1),JSHINT(n,r,r.globals);var i=JSHINT.data().errors,o=[];return i&&e(i,o),o}function e(r,e){for(var i=0;i<r.length;i++){var o=r[i];if(o){if(o.line<=0){window.console&&window.console.warn("Cannot display JSHint error (invalid line "+o.line+")",o);continue}var a=o.character-1,s=a+1;if(o.evidence){var t=o.evidence.substring(a).search(/.\b/);t>-1&&(s+=t)}var c={message:o.reason,severity:o.code&&o.code.startsWith("W")?"warning":"error",from:n.Pos(o.line-1,a),to:n.Pos(o.line-1,s)};e.push(c)}}}n.registerHelper("lint","javascript",r)}(e(4631))}}]);