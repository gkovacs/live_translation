// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('script started running!')
    // Your code here...
    var replacements = {
        'a': 'á',
        'A': 'Á',
        'b': 'ḃ',
        'B': 'Ḃ',
        'c': 'ç',
        'C': 'Ç',
        'd': 'đ',
        'D': 'Đ',
        'e': 'é',
        'E': 'É',
        'f': 'ḟ',
        'F': 'Ḟ',
        'g': 'ğ',
        'G': 'Ğ',
        'h': 'ĥ',
        'H': 'Ĥ',
        'i': 'í',
        'I': 'Í',
        'j': 'ĵ',
        'J': 'Ĵ',
        'k': 'ḱ',
        'K': 'Ḱ',
        'l': 'ł',
        'L': 'Ł',
        'm': 'ṁ',
        'M': 'Ṁ',
        'n': 'ñ',
        'N': 'Ñ',
        'o': 'ó',
        'O': 'Ó',
        'p': 'ṕ',
        'P': 'Ṕ',
        'q': 'q̇',
        'Q': 'Q̇',
        'r': 'ř',
        'R': 'Ř',
        's': 'ŝ',
        'S': 'Ŝ',
        't': 'ṫ',
        'T': 'Ṫ',
        'u': 'ú',
        'U': 'Ú',
        'v': 'ṽ',
        'V': 'Ṽ',
        'w': 'ẃ',
        'W': 'Ẃ',
        'x': 'ẋ',
        'X': 'Ẋ',
        'y': 'ý',
        'Y': 'Ý',
        'z': 'ž',
        'Z': 'Ž',
    }
    function replaceWithTranslation(s) {
      var output = [];
      for (let c of s) {
          var replacement = replacements[c]
          if (replacement !== undefined) {
              output.push(replacement)
          } else {
              output.push(c)
          }
      }
      return output.join('')
    }
    function textNodesUnder(el){
        var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
        while(n=walk.nextNode()) a.push(n);
        return a;
    }
    function replaceAllTextNodesUnder(rootElem) {
        var n, walk=document.createTreeWalker(rootElem,NodeFilter.SHOW_TEXT,null,false);
        while(n=walk.nextNode()) {
            if (n.replacedTextContent === n.textContent) {
                continue;
            }
            if (n.parentElement.nodeName === 'STYLE' || n.parentElement.nodeName === 'SCRIPT') {
                continue
            }
            n.replacedTextContent = replaceWithTranslation(n.textContent);
            n.textContent = n.replacedTextContent
        }
    }
    function replaceAllTextNodes() {
    	if (document.body === null) {
    		return
    	}
        for (var x of document.body.children) {
            if (x.nodeName === 'STYLE' || x.nodeName === 'SCRIPT') {
                continue
            }
            replaceAllTextNodesUnder(x)
        }
    }
    function sleep(ms) {
	  return new Promise(function(resolve, reject) {
	    setTimeout(resolve, ms);
	  })
	}
    // keep counts of how many times users are interacting with each piece of text (hovering over, clicking on).
    // the most interacted with pieces of text are most likely the most valuable text to translate
    (async function() {
      while (true) {
        replaceAllTextNodes();
        await sleep(50);
      }
    })();
    //setInterval(replaceAllTextNodes, 100);
    console.log('script finished running!')
})();