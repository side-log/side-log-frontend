'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '../../../styled-system/css';
import Text from '../Text';

export default function HeaderNav() {
  const pathname = usePathname();

  const menus = [
    { title: '체크리스트', href: '/checklist' },
    { title: '장비탐색', href: '/not-found' },
    { title: '나의장비', href: '/not-found' },
  ];

  return (
    <ul className={css({ display: 'flex' })}>
      {menus.map(menu => {
        const isActive = pathname === menu.href;
        return (
          <li key={menu.title} className={css({ px: 2.5, py: 4 })}>
            <Link href={menu.href}>
              <Text color={isActive ? 'content.strong' : 'content.subtle'} typography={isActive ? 'b4' : 'b5'}>
                {menu.title}
              </Text>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
