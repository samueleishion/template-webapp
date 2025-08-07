import { useEffect } from 'react';

/* Global Data */ 
import useLocalState from '../../../data/local-state';

/* Shared Components */
import Button, { ButtonGroup } from '../../../components/button';
import Flex from '../../../components/flex';

/* Assets */ 
import {
  HalfMoon,
  KeyCommand,
  SunLight
} from 'iconoir-react';

const AccountSettings = () => {
  const [accountTheme, setAccountTheme] = useLocalState('accountTheme', 'system');
  
  const handleThemeChange = (theme) => {
    console.log("AccountSettings.handleThemeChange()", theme);
    setAccountTheme(theme);
  }

  useEffect(() => {
    // This effect can be used to apply the theme change immediately
    // document.documentElement.setAttribute('data-theme', accountTheme);
    if (accountTheme === "system") {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', accountTheme);
    }
    console.log("AccountSettings:useEffect([accountTheme])", accountTheme);
  }, [accountTheme]);

  return (
    <>
      <section>
        <h2>Account</h2>
        <p>Manage your account settings here.</p>
      </section>
      <section>
        <h3>Theme Settings</h3>
        <Flex direction="column" gap={12}>
          <p>Choose your preferred theme for the application.</p>
          <ButtonGroup>
            <Button 
              variant={accountTheme === "system" ? "filled" : "outlined"} 
              size="small" 
              onClick={() => handleThemeChange('system')}
            >
              <KeyCommand />
              <span>
                System
              </span>
            </Button>
            <Button 
              variant={accountTheme === "light" ? "filled" : "outlined"} 
              size="small" 
              onClick={() => handleThemeChange('light')}
            >
              <SunLight />
              Light
            </Button>
            <Button 
              variant={accountTheme === "dark" ? "filled" : "outlined"} 
              size="small" 
              onClick={() => handleThemeChange('dark')}
            >
              <HalfMoon />
              Dark
            </Button>
          </ButtonGroup>
        </Flex>
      </section>
    </>
  );
};

export default AccountSettings;