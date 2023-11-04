import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type ReactStateTuple<T> = [
    T | undefined,
    Dispatch<SetStateAction<T | undefined>>
];

export function useStoredState<T>(
    storage: Storage,
    key: string,
    initialValue?: T
): ReactStateTuple<T> {
    const [state, setState] = useState<T | undefined>(() => {
        const storedItem = storage.getItem(key);

        if (storedItem != null) {
            return JSON.parse(storedItem);
        }

        return initialValue;
    });

    useEffect(() => {
        const storedItem = storage.getItem(key);
        if (storedItem === null) {
            storage.setItem(key, JSON.stringify(initialValue));
        }
    }, [storage, key, initialValue]);

    useEffect(() => {
        const serializedState = JSON.stringify(state);
        storage.setItem(key, serializedState);
    }, [state, storage, key]);

    return [state, setState];
}
