export function throttle<Params extends unknown[]>(
    func: (...args: Params) => void,
    delay: number,
): (...args: Params) => void {
    let inProgress = false;
    return function (this: unknown, ...args: Params) {
        if (inProgress) {
            return;
        }
        inProgress = true;
        func.apply(this, args);
        setTimeout(() => {
            inProgress = false;
        }, delay);
    };
}
