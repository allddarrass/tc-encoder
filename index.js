export default class TCEncoder {
  constructor() {
    this.mapping = {};

    this.fillDigits();
  }

  fillDigits() {
    for (let number = 0; number < 10; number++) {
      if (number === 0) this.mapping[number] = '+[]';
      if (number !== 0) this.mapping[number] = '+!+[]'.repeat(number);
    }
  }

  cacheValue(string, encodedString) {
    if (!this.mapping[string]) return this.mapping[string] = encodedString;

    return encodedString;
  }

  encodeNumber(number) {
    const string = `${number}`;

    if (this.mapping[string]) return this.mapping[string];

    const splittedString = string.split('');

    const output = splittedString
      .map((diget, i) => {
        const dozens = Math.pow(10, splittedString.length - i - 1); // e.g 10^3

        this.mapping[diget].repeat(dozens);
      })
      .join('');

    return this.cacheValue(string, output);
  }
}