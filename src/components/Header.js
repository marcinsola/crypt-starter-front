import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { useEthers } from '@usedapp/core';
export const Header = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  return (
    <Navbar light color='light'>
      <NavbarBrand href='/' light color='light'>
        CryptStarter
      </NavbarBrand>
      
      {!account && (
        <Button color='primary' onClick={activateBrowserWallet}>
          Connect wallet
        </Button>
      )}
      {account && (
        <Button color='primary' outline onClick={deactivate}>
          Disconnect wallet
        </Button>
      )}
    </Navbar>
  );
};
