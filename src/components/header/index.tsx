'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

export default function Header({ navItems: navItems }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <header className={cn('header')}>
      <nav className={cn('nav')}>
        <ul className={cn('nav-list')}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={cn('nav-item')}
              onClick={() => setCurrentIndex(index)}
            >
              <a
                href={item.href}
                className={cn('nav-link', { active: currentIndex === index })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
