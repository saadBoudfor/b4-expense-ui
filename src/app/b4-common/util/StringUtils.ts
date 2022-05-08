export class StringUtils {
  public static isNotEmpty(str: string | undefined | null): boolean {
    return !!str && str.length !== 0;
  }
}
