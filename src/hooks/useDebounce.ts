import { useEffect, useState } from 'react';

export const useDebouce = (value: string, timeout: number = 500): string => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        if (value === '') return setDebouncedValue('');

        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, timeout);

        return () => {
            clearTimeout(timerId);
        };
    }, [value]);

    return debouncedValue;
};
