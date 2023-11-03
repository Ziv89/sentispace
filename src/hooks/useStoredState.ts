import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ReactStateTuple<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>]

export function useStoredState<T>(storage: Storage, key: string, initValue?: T): ReactStateTuple<T> {

    const [state, setState] = useState<T | undefined>(initValue);

    useEffect(() => {
        const storedJson = storage.getItem(key);
        if (storedJson) {
            setState(JSON.parse(storedJson));
        } else {
            storage.setItem(key, JSON.stringify(state));
        }
    }, []);

    useEffect(() => {
        storage.setItem(key, JSON.stringify(state));
    }, [state])

    return [state!, setState];
}