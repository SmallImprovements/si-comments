import { forEach } from 'lodash/fp';
import TextParser from './text-parser';

export function fixArticle(str) {
    return parseAndCorrect(str, parseArticles);
}

function parseAndCorrect(str, functions) {
    forEach(function(fn) {
        str = fn(new TextParser(str));
    }, functions);
    return str;
}

var ARTICLES = {
    a: function(parser) {
        if (parser.peek().match(/^[aeoiu]/i)) {
            parser.replaceWord('an');
        }
    },
};

function parseArticles(parser) {
    var articles = Object.keys(ARTICLES);
    parser.forEachWord(function() {
        var i = articles.indexOf(parser.currentWord());
        if (i !== -1) {
            ARTICLES[articles[i]](parser);
        }
    });
    return parser.toString();
}
