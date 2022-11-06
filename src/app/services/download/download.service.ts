import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
    download(text: string, filename: string) {
        const file = new Blob([text], { type: 'text/javascript' });
        const aEl = document.createElement("a");
        const url = URL.createObjectURL(file);
        aEl.href = url;
        aEl.download = filename;
        document.body.appendChild(aEl);
        aEl.click();
        setTimeout(function () {
            document.body.removeChild(aEl);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
    downloadWithWM(code: string, filename: string) {
        const codeWithWM = `/*\n * Edited using TurtleJS\n * https://turtle-js.github.io\n */\n\n${code.trimStart()}`;
        this.download(codeWithWM, filename);
    }
}
