export function debounce(func: (e?: Event) => unknown, delay: number = 100) {
    let timer: any;
    return function (event?: Event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay, event);
    };
}