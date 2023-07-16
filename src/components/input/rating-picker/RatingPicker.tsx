import classes from './RatingPicker.module.scss';

import { Rating } from '../../../data/types/Rating';
import { Heart, HeartHalf, IconProps } from '@phosphor-icons/react';
import {
    KeyboardEvent,
    PointerEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

interface RatingPicker {
    label: string;
    rating: Rating;
    onRatingChange: (rating: Rating) => void;
}

const RATING_ICON_PROPS: IconProps = {
    size: 48,
    color: 'var(--color-heart)',
};

const RatingPicker = ({ label, rating, onRatingChange }: RatingPicker) => {
    const [pointerStartPosition, setPointerStartPosition] = useState<number>(0);
    const [internalRating, setInternalRating] = useState<Rating>(rating);
    const [previousIndex, setPreviousIndex] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInternalRating(rating);
    }, [pointerStartPosition]);

    const handlePointerStart = (event: PointerEvent, index: number) => {
        const target = event.target as SVGElement;
        const rect = target.getBoundingClientRect();
        const pointerX = event.clientX;

        setPointerStartPosition(pointerX);
        setPreviousIndex(index);

        const isSameHeart =
            index <= rating && index + 1 >= rating && previousIndex === index;

        if (isSameHeart) {
            const isHalfHeart = rating % 1;
            const isEmptyHeart = rating === index;
            const isFullHeart = rating - index === 1;

            if (isEmptyHeart) onRatingChange((index + 0.5) as Rating);

            if (isHalfHeart) onRatingChange((index + 1) as Rating);

            if (isFullHeart) onRatingChange(index as Rating);

            return;
        }

        const clickedOnRightSide = pointerX - rect.left >= rect.width / 2;

        clickedOnRightSide
            ? onRatingChange((index + 1) as Rating)
            : onRatingChange((index + 0.5) as Rating);

        ref.current?.focus();
    };

    const handlePointerMove = (event: PointerEvent) => {
        if (!ref.current) return;

        if (event.pointerType === 'mouse' && event.pressure === 0) return;

        ref.current.setPointerCapture(event.pointerId);

        const ratingContainer = event.currentTarget as HTMLElement;
        const { width } = ratingContainer.getBoundingClientRect();
        const sensitivity = 0.2;
        const stepDistance = width / 10;

        const pointerX = event.clientX;
        const pointerDisplacement = pointerX - pointerStartPosition;

        const steps = Math.trunc(
            pointerDisplacement / (stepDistance * (1 - sensitivity))
        );
        const desiredRating = internalRating + steps * 0.5;

        if (desiredRating > 5 || desiredRating < 0) return;

        onRatingChange(desiredRating as Rating);
    };

    const handleArrowKeys = (event: KeyboardEvent) => {
        const { code } = event;
        switch (code) {
            case 'ArrowLeft':
                if (rating === 0) return;
                onRatingChange((rating - 0.5) as Rating);
                break;
            case 'ArrowRight':
                if (rating === 5) return;
                onRatingChange((rating + 0.5) as Rating);
                break;
        }
    };

    const getHeartIcon = (index: number) => {
        const fill = rating >= index + 1;
        const half = !fill && rating >= index + 0.5;

        return (
            <div
                key={index}
                onPointerDown={(e) => handlePointerStart(e, index)}
            >
                {fill && <Heart weight="fill" {...RATING_ICON_PROPS} />}
                {half && <HeartHalf weight="fill" {...RATING_ICON_PROPS} />}
                {!fill && !half && (
                    <Heart weight="regular" {...RATING_ICON_PROPS} />
                )}
            </div>
        );
    };

    return (
        <div
            className={classes.ratingPicker}
            onPointerMove={(event) => handlePointerMove(event)}
        >
            <div className={classes.label}>{label}</div>
            <div
                className={classes.hearts}
                tabIndex={0}
                onKeyDown={handleArrowKeys}
                ref={ref}
            >
                {Array.from({ length: 5 }, (_, index) => getHeartIcon(index))}
            </div>
        </div>
    );
};

export default RatingPicker;
