import { RefObject, useCallback, useEffect } from 'react';

const handlePointerDown = (
    event: MouseEvent | TouchEvent,
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(callback, 0);
    }
};

export const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    callback: () => void
) => {
    const memoizedHandler = useCallback(
        (event: MouseEvent | TouchEvent) => {
            handlePointerDown(event, ref, callback);
        },
        [ref, callback]
    );

    useEffect(() => {
        document.addEventListener('click', memoizedHandler);

        return () => {
            document.removeEventListener('click', memoizedHandler);
        };
    }, [memoizedHandler]);
};
