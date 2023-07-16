export const deepEqualArray = <T>(arr1: T[], arr2: T[]): boolean => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (!deepEqual(arr1[i], arr2[i])) return false;
    }

    return true;
};

export const deepEqualObject = <T extends object>(
    obj1: T,
    obj2: T
): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (
            !keys2.includes(key) ||
            !deepEqual((obj1 as any)[key], (obj2 as any)[key])
        )
            return false;
    }

    return true;
};

export const deepEqual = <T>(val1: T, val2: T): boolean => {
    if (val1 === val2) return true;

    if (typeof val1 !== typeof val2) return false;

    if (Array.isArray(val1) && Array.isArray(val2)) {
        return deepEqualArray(val1, val2);
    }

    if (
        typeof val1 === 'object' &&
        typeof val2 === 'object' &&
        val1 !== null &&
        val2 !== null
    ) {
        return deepEqualObject(val1, val2);
    }

    return false;
};
