// h1, h2, h3 { margin: auto; color: #cc0000; }
// div.note { margin-bottom: 20px; padding: 10px; }
// #answer { display: none; }

const rAZ = new RegExp("([A-Z])");
const raz = new RegExp("([a-z])");
const r09 = new RegExp("([0-9])");

type HStyleSheet = {
  rules: Array<Rule>;
};

type Rule = {
  selector: Array<Selector>;
  declarations: Array<Declaration>;
};

type Selector = {
  tagName?: string;
  id?: string;
  class: Array<string>;
};

type Declaration = {
  name: string;
  value: Value;
};

type Value = string | Length | Color;

// Length contains all the css properties containing numbers.
type Length = {
  value: number;
  unit: Unit;
};

enum Unit {
  Px,
}

// Color props
type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

// PARSER:
export default class CssParser {
  // the html string input
  input: string;
  // string position pointer
  pos: number;
  // inputSz represent size of input
  inputSz: number;
  constructor(input: string) {
    this.input = input;
    this.pos = 0;
    this.inputSz = input.length;
  }

  // nextChar  returns next character without consuming it
  nextChar(): string {
    if (this.pos + 1 < this.inputSz) {
      return this.input[this.pos];
    }
    return "NOCHAR";
  }

  // currChar returns the char without conusming
  currChar(): string {
    return this.input[this.pos];
  }

  // startsWith checks if next character start with the given string
  startsWith(s: string): boolean {
    return this.input[this.pos].startsWith(s);
  }

  // eof returns true if all the character is consumed
  eof(): boolean {
    return this.pos >= this.inputSz;
  }

  // consumeChar consume the character and increment the position counter
  consumeChar(): string {
    let ch = this.input[this.pos];
    this.pos = this.pos + 1;
    return ch;
  }

  consumeWhile(test: Function): string {
    let result = "";
    while (!this.eof() && test(this.currChar())) {
      result += this.consumeChar();
    }

    return result;
  }

  private whiteSpaceCheck(input: string): boolean {
    return input === " " || input.charCodeAt(0) === 10;
  }

  consumeWhiteSpace() {
    this.consumeWhile(this.whiteSpaceCheck);
  }

  private validIdentifier(input: string): boolean {
    if (
      rAZ.test(input) ||
      raz.test(input) ||
      r09.test(input) ||
      input === "-" ||
      input === "_"
    ) {
      return true;
    }
    return false;
  }

  parseIdentifier(): string {
    return this.consumeWhile(this.validIdentifier);
  }

  parseSelector(): Selector {
    let selector: Selector = { class: [] };

    // while(!this.eof()){
    let ch = this.currChar();
    switch (ch) {
      case "#":
        this.consumeChar();
        selector.id = this.parseIdentifier();
        break;
      case ".":
        this.consumeChar();
        selector.class.push(this.parseIdentifier());
        break;
      case "*":
        this.consumeChar();
        break;
      default:
        if (this.validIdentifier(ch)) {
          selector.tagName = this.parseIdentifier();
        }
        break;
    }
    // }

    return selector;
  }

  parseSelectors(): Array<Selector> {
    let selectors: Array<Selector> = [];

    while (!this.eof() && !(this.currChar() === "{")) {
      selectors.push(this.parseSelector());
      this.consumeWhiteSpace();

      if (this.currChar() === ",") {
        this.consumeChar();
        this.consumeWhiteSpace();
      }
    }
    this.consumeChar();

    return selectors;
  }

  parseHexPair(): number {
    let s = this.input[(this.pos, this.pos + 2)];
    this.pos += 2;
    return parseInt(s, 16);
  }

  parseColor(): Color {
    let color: Color = { r: 0, g: 0, b: 0, a: 255 };

    color.r = this.parseHexPair();
    color.g = this.parseHexPair();
    color.b = this.parseHexPair();
    color.a = 255;
    return color;
  }

  private floatcheck(input: string): boolean {
    if (r09.test(input) || input === ".") {
      return true;
    }
    return false;
  }

  parseFloat(): number {
    return parseFloat(this.consumeWhile(this.floatcheck));
  }

  parseLength(): Length {
    let ln: Length = {
      value: this.parseFloat(),
      unit: Unit.Px,
    };
    return ln;
  }

  parseValue(): Value {
    if (r09.test(this.nextChar())) {
      return this.parseLength();
    }

    if (this.nextChar() === "#") {
      return this.parseColor();
    }

    return this.parseIdentifier();
  }

  parseDeclaration(): Declaration {
    let declaration: Declaration = {
      name: "",
      value: "",
    };

    declaration.name = this.parseIdentifier();
    this.consumeWhiteSpace();
    if (this.currChar() == ":") {
      this.consumeChar();
    }
    this.consumeWhiteSpace();
    declaration.value = this.parseValue();
    this.consumeWhiteSpace();
    if (this.currChar() == ";") {
      this.consumeChar();
    }
    return declaration;
  }

  parseDeclarations(): Array<Declaration> {
    let declarations: Array<Declaration> = [];
    while (!this.eof() && !(this.currChar() === "}")) {
      this.consumeWhiteSpace();
      declarations.push(this.parseDeclaration());
    }
    this.consumeChar();
    return declarations;
  }

  parseRule(): Rule {
    let rule: Rule = {
      selector: this.parseSelectors(),
      declarations: this.parseDeclarations(),
    };

    return rule;
  }

  parseRules(): Array<Rule> {
    let rules: Array<Rule> = [];

    while (!this.eof()) {
      this.consumeWhiteSpace();
      rules.push(this.parseRule());
    }

    return rules;
  }

  parse(): HStyleSheet {
    let sty: HStyleSheet = {
      rules: this.parseRules(),
    };

    return sty;
  }
}

// showNode recursive version
export function showCssNode(nd: HStyleSheet) {
  if (nd === null) {
    return;
  }

  if (nd.rules.length === 0) {
    return;
  }

  for (let i = 0; i < nd.rules.length; i++) {
    // selection
    let sec = nd.rules[i].selector;
    if (sec !== null || sec.length !== 0) {
      for (let k = 0; k < sec.length; k++) {
        if (sec[k] === null){
          continue;
        }
        console.log("SELECTOR");
        console.log(sec[k].class, sec[k].id || "", sec[k].tagName || "");
      } 
    }

    // declaration
    let dec = nd.rules[i].declarations;
    if (dec !== null || dec.length !== 0) {
      for (let j = 0; j < dec.length; j++) {
        if (dec[j] === null) {
          continue;
        }
        console.log("DECLARATION");
        console.log(dec[j].name, dec[j].value);
      }
    }
  }
}
