export class DownloadUtils {
  public static run(url: string, filename: string): any {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    });
  }

}
