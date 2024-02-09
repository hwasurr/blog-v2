import { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

export const Typography = {
  h1: function H1(props: PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <h1
        className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-tight', className)}
        {...restProps}
      >
        {props.children}
      </h1>
    );
  },
  h2: function H2(props: PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <h2
        className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
        {...restProps}
      >
        {props.children}
      </h2>
    );
  },
  h3: function H3(props: PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...restProps}>
        {props.children}
      </h3>
    );
  },
  h4: function H4(props: PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...restProps}>
        {props.children}
      </h4>
    );
  },
  p: function p(props: PropsWithChildren<React.HTMLProps<HTMLParagraphElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <p className={cn('leading-7 [&:not(:first-child)]:mt-2', className)} {...restProps}>
        {props.children}
      </p>
    );
  },
  large: function large(props: PropsWithChildren<React.HTMLProps<HTMLDivElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <div className={cn('text-lg font-semibold', className)} {...restProps}>
        {props.children}
      </div>
    );
  },
  small: function small(props: PropsWithChildren<React.HTMLProps<HTMLParagraphElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <small className={cn('text-sm font-medium leading-none', className)} {...restProps}>
        {props.children}
      </small>
    );
  },
  muted: function muted(props: PropsWithChildren<React.HTMLProps<HTMLParagraphElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <p className={cn('text-sm text-muted-foreground', className)} {...restProps}>
        {props.children}
      </p>
    );
  },
  blockquote: function blockquote(props: PropsWithChildren<React.HTMLProps<HTMLQuoteElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...restProps}>
        {props.children}
      </blockquote>
    );
  },
  ul: function ul(props: PropsWithChildren<React.HTMLProps<HTMLUListElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...restProps}>
        {props.children}
      </ul>
    );
  },
  li: function li(props: PropsWithChildren<React.HTMLProps<HTMLLIElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <li className={cn('', className)} {...restProps}>
        {props.children}
      </li>
    );
  },
  code: function code(props: PropsWithChildren<React.HTMLProps<HTMLLIElement>>): JSX.Element {
    const { className, ...restProps } = props;
    return (
      <code
        className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}
        {...restProps}
      >
        {props.children}
      </code>
    );
  },
} as const;
