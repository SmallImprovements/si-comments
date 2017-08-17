function textParser(str) {
    var self = this;
    var words = str.split(' ');

    this.str = str;
    this.currentIndex = 0;
    this.startOfString = true;
    this.endOfString = false;
    this.words = words;

    var start = 0;
    var end = this.words.length - 1;

    this.currentWord = currentWord;
    this.nextWord = nextWord;
    this.prevWord = prevWord;
    this.forEachWord = forEachWord;

    this.peek = peek;
    this.lookBehind = lookBehind;

    this.replaceWord = replaceWord;

    this.toString = toString;

    function currentWord() {
        return words[self.currentIndex];
    }

    function nextWord() {
        if (self.currentIndex === end) {
            return;
        } else {
            self.currentIndex += 1;
            self.startOfString = false;
            if (self.currentIndex === end) {
                self.endOfString = true;
            }
            return currentWord();
        }
    }

    function prevWord() {
        if (self.currentIndex === start) {
            return;
        } else {
            self.currentIndex -= 1;
            self.endOfString = false;
            if (self.currentIndex === start) {
                self.startOfString = true;
            }
            return currentWord();
        }
    }

    function peek() {
        return words[self.currentIndex + 1];
    }

    function lookBehind() {
        return words[self.currentIndex - 1];
    }

    function replaceWord(val) {
        words[self.currentIndex] = val;
        return val;
    }

    function toString() {
        return words.join(' ');
    }

    function forEachWord(fn) {
        goToStart();
        do {
            fn(self);
        } while (nextWord());
    }

    function goToStart() {
        self.currentIndex = 0;
    }
}

export default function TextParser() {
    return textParser;
}
