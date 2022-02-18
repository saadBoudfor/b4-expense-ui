export class IdValidator {
  public static isValid(id: number): boolean {
    return !!id && id > 0;
  }

  public static isValidStr(id: string): boolean {
    try {
      return IdValidator.isValid(parseInt(id));
    } catch (error) {
      return false;
    }
  }

}
