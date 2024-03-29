import React, { memo } from 'react';
import { useTheme } from 'App/providers/ThemeProvider';
import ThemeDark from 'shared/assets/icons/theme-dark.svg?react';
import ThemeLight from 'shared/assets/icons/theme-light.svg?react';
import { Theme } from 'App/providers/ThemeProvider';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';

interface ThemeSwitcherProps {
  className?: string | undefined;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, switchTheme } = useTheme();
  return (
    <Button
      theme={ButtonTheme.CLEAR}
      //className={classNames(cls.ThemeSwitcher, {}, [className as string])}
      onClick={switchTheme}
    >
      {theme === Theme.dark ? (
        <ThemeLight className={className} />
      ) : (
        <ThemeDark className={className} />
      )}
    </Button>
  );
});

export default ThemeSwitcher;

{
  /* <div
className={classNames(cls.ThemeSwitcher, {}, [className as string])}
onClick={switchTheme}
>

Switch
</div> */
}
