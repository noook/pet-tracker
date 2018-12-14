import fr from './fr.json';

export default class Translation {
  constructor(language) {
    this.lang = language;
    // Don't forget to add languages after an import
    this.keys = {
      fr,
    };
    this.setKeys();
  }

  setLang(language) {
    this.lang = language;
    this.setKeys();
  }

  setKeys() {
    for (const i in this.keys[this.lang]) {
      this[i] = this.keys[this.lang][i];
    }
  }

  params(entry, fields) {
    let string = this.keys[this.lang][entry];
    for (const i in fields) {
      string = string.replace(`{:${i}}`, fields[i]);
    }
    return string;
  }
}
