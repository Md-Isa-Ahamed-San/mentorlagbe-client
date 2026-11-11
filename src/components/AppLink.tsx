import Link, { LinkProps } from 'next/link';
import React from 'react';

interface AppLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  target?: string;
  rel?: string;
}

export default function AppLink({
  children,
  prefetch = false,
  ...props
}: AppLinkProps) {
  return (
    <Link prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}
