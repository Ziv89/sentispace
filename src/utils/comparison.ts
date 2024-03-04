/**
 * Checks if two arrays are deeply equal.
 *
 * @template T The type of elements in the arrays.
 * @param {T[]} arr1 The first array to compare.
 * @param {T[]} arr2 The second array to compare.
 * @returns {boolean} True if the arrays are deeply equal, false otherwise.
 */

export const deepEqualArray = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) return false
  }

  return true
}

/**
 * Checks if two objects, including Date objects, are deeply equal.
 *
 * @template T The type of the objects.
 * @param {T} obj1 The first object to compare.
 * @param {T} obj2 The second object to compare.
 * @returns {boolean} True if the objects are deeply equal, false otherwise.
 */
export const deepEqualObject = <T extends object>(
  obj1: T,
  obj2: T,
): boolean => {
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !deepEqual((obj1 as any)[key], (obj2 as any)[key])
    )
      return false
  }

  return true
}

/**
 * Checks if two values are deeply equal. This function uses recursion
 * to handle nested structures (arrays or objects). For date comparisons,
 * it compares the timestamps returned by the getTime method.
 *
 * @template T The type of the values.
 * @param {T} val1 The first value to compare.
 * @param {T} val2 The second value to compare.
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 */
export const deepEqual = <T>(val1: T, val2: T): boolean => {
  if (val1 === val2) return true

  if (typeof val1 !== typeof val2) return false

  if (Array.isArray(val1) && Array.isArray(val2)) {
    return deepEqualArray(val1, val2)
  }

  if (
    typeof val1 === 'object' &&
    typeof val2 === 'object' &&
    val1 !== null &&
    val2 !== null
  ) {
    return deepEqualObject(val1, val2)
  }

  return false
}
