import {Item} from "../data-models/Item";

export class ItemUtils {
  public static computeExpirationDate(item: Item): Date | null {
    if (item.expirationAfter && item.expirationDate && item.openDate) {
      const openDate = new Date(item.openDate);
      const expirationAfterOpenDate = new Date(openDate.getTime() + ItemUtils.durationToMs(item.expirationAfter));
      const productExpirationDate = new Date(item.expirationDate);

      if (productExpirationDate.getTime() - expirationAfterOpenDate.getTime() < 0) {
        return productExpirationDate;
      } else {
        return expirationAfterOpenDate;
      }
    }
    return !!item?.expirationDate ? new Date(item.expirationDate) : null;
  }


  public static getStat(item: Item, expirationDate: Date): 'open' | 'default' | 'expired' | 'finish' {
    if (expirationDate) {
      const now = new Date();

      if (item.remaining == 0) {
        return 'finish';
      }

      // if expiration date < now => expired
      if (expirationDate.getTime() - now.getTime() < 0) {
        return 'expired';
      }

      if (!!item.openDate) {
        return 'open';
      }
    }
    return 'default'
  }

  public static durationToMs(duration: { days?: number, hours?: number, minutes?: number }) {
    let res = 0;
    if (duration.days) {
      res += duration.days * 24 * 60;
    }
    if (duration.hours) {
      res += duration.hours * 60;
    }
    if (duration.minutes) {
      res += duration.minutes;
    }
    return res * 60000;
  }

}
