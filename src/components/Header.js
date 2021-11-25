import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { useEthers, useLookupAddress } from '@usedapp/core';
export const Header = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const ens = useLookupAddress();

  return (
    <Navbar light color='light'>
      <NavbarBrand href='/' color='light'>
        CryptStarter
      </NavbarBrand>

      {account && <strong>Welcome, {ens ?? account}</strong>}
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
