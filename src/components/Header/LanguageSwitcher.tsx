'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Check, ChevronsUpDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Locale } from '../../../i18n.config';

interface LanguageSwitcherProps {
  lang: Locale;
  label: string;
  availableLocales: Locale[];
}

export function LanguageSwitcher({ lang, label, availableLocales }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectLanguage = (locale: Locale) => {
    const pathSegments = (pathname ?? '').split('/');
    pathSegments[1] = locale;

    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    startTransition(() => {
      router.push(pathSegments.join('/'));
      setOpen(false);
    });
  };

  const langNames: Record<Locale, string> = {
    en: 'English',
    ar: 'العربية',
  };

  const langEmoji: Record<Locale, string> = {
    en: '🇺🇸',
    ar: '🇸🇦',
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={cn(
          'w-[150px] inline-flex justify-between items-center px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800',
          isPending && 'animate-pulse'
        )}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{langNames[lang]}</span>
        </div>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          {availableLocales.map((locale) => (
            <li
              key={locale}
              onClick={() => onSelectLanguage(locale)}
              className={cn(
                'cursor-pointer px-3 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                locale === lang ? 'font-medium bg-gray-50 dark:bg-gray-700' : ''
              )}
            >
              <span>{langEmoji[locale]}</span>
              <span>{langNames[locale]}</span>
              {locale === lang && <Check className="ml-auto h-4 w-4 text-green-500" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
