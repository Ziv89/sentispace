import { ComponentProps } from 'react';
import classes from './Card.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

export default function Card({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cx(classes.card, className)} {...props}>
      {children}
    </div>
  );
}
