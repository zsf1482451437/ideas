import React from 'react';

import type { NavItem } from '@/components/header';
import Header from '@/components/header';

const navItems: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '工具集', href: '/utils' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header navItems={navItems} />
        <main>{children}</main>
      </body>
    </html>
  );
}
