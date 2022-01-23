export class CalendarUtils {
  public static getCurrentMonth() {
    const current = new Date();
    return monthNames[current.getMonth()] + ' ' + current.getFullYear();
  }
}

const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
];


