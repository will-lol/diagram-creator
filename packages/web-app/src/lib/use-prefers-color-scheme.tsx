import { useLayoutEffect, useState } from 'react';

export function usePrefersDark() {
  const [prefersDark, setPrefersDark] = useState(false);

  const handlePrefChange = (e: MediaQueryListEvent) => {
    console.log(e);
    setPrefersDark(e.matches);
  };

  useLayoutEffect(() => {
    const pref = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(pref.matches);

    pref.addEventListener('change', handlePrefChange);

    return () => pref.removeEventListener('change', handlePrefChange);
  }, []);

  return prefersDark;
}
