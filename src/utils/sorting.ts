/**
 * Compares two strings.
 * Intended to be used as a comparator function in `Array.prototype.sort`.
 *
 * @param {string} a - The first string to compare.
 * @param {string} b - The second string to compare.
 * @param {boolean} [isAscending=true] - Whether to sort in ascending order.
 * @returns {number} Comparison result.
 */
const compareStrings = (
    a: string,
    b: string,
    isAscending: boolean = true
): number => {
    return isAscending ? a.localeCompare(b) : b.localeCompare(a);
};

/**
 * Compares two numbers.
 * Intended to be used as a comparator function in `Array.prototype.sort`.
 *
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @param {boolean} [isAscending=true] - Whether to sort in ascending order.
 * @returns {number} Comparison result.
 */
const compareNumbers = (
    a: number,
    b: number,
    isAscending: boolean = true
): number => {
    return isAscending ? a - b : b - a;
};

/**
 * Sorts an array of objects by a specified key.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} items - The array of objects to sort.
 * @param {keyof T} key - The key to sort by.
 * @param {boolean} [isAscending=true] - Whether to sort in ascending order.
 * @returns {T[]} Sorted array.
 */
export const sortObjectByKey = <T>(
    items: T[],
    key: keyof T,
    isAscending: boolean = true
): T[] => {
    return [...items].sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return compareStrings(valueA, valueB, isAscending);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return compareNumbers(valueA, valueB, isAscending);
        }

        return 0;
    });
};
