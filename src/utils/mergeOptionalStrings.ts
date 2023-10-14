export function mergeOptionalStrings(str1: string, ...args: (string|undefined)[]) {
    let strOut = str1;
    args.forEach(str => {
        strOut += str? ' ' + str : '';
    });
    return strOut;
}