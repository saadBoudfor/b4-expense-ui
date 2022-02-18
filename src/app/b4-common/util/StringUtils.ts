export class StringUtils {
  public static isNotEmpty(str: string | undefined | null): boolean {
    return !!str && str.length !== 0;
  }

  public static extractNumber(str: string): string {
    let number = '';
    for (let i of str) {
      if (i.match('^([0-9]|\\.|,)$')) {
        number += i;
      }
    }
    return number;
  }

  public static removeNumber(str: string): string {
    let number = '';
    for (let i of str) {
      if (!i.match('^([0-9]|\\.|,)$')) {
        number += i;
      }
    }
    return number.replace(',', '.');
  }
}
