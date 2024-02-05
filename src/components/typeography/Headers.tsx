import { cn } from '@/utilities/ui/classNames';

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingType: HeaderType;
}

const HEADER_MAP: Record<
  HeaderType,
  { Component: React.FC<HeadingProps>; className: string }
> = {
  h1: {
    Component: (props: HeadingProps) => <h1 {...props}>{props.children}</h1>,
    className: 'text-4xl',
  },
  h2: {
    Component: (props: HeadingProps) => <h2 {...props}>{props.children}</h2>,
    className: 'text-3xl',
  },
  h3: {
    Component: (props: HeadingProps) => <h3 {...props}>{props.children}</h3>,
    className: 'text-2xl',
  },
  h4: {
    Component: (props: HeadingProps) => <h4 {...props}>{props.children}</h4>,
    className: 'text-xl',
  },
  h5: {
    Component: (props: HeadingProps) => <h5 {...props}>{props.children}</h5>,
    className: 'text-lg',
  },
  h6: {
    Component: (props: HeadingProps) => <h6 {...props}>{props.children}</h6>,
    className: 'text-base',
  },
};

const Heading: React.FC<HeadingProps> = ({
  children,
  headingType,
  ...rest
}) => {
  const { Component, className } = HEADER_MAP[headingType];

  return (
    <Component
      headingType={headingType}
      className={cn(className, 'font-bold')}
      {...rest}
    >
      {children}
    </Component>
  );
};

const Text: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="text-base">{children}</p>
);

export { Heading, Text };
