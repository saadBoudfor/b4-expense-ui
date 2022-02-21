export class IdValidator {
  public static isValid(id: number): boolean {
    return !!id && id > 0;
  }

  public static isValidStr(id?: string | null): boolean {
    try {
      return IdValidator.isValid(parseInt(typeof id === "string" ? id :''));
    } catch (error) {
      return false;
    }
  }

}
