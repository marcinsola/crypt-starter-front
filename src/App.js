import { useState, useEffect } from 'react';
import { CampaignsList } from './components/CampaignsList';
import { Header } from './components/Header';
import { ethers } from 'ethers';
const cryptStarter = require('./utils/abi/CryptStarter.json');
const connectionData = require('./utils/connectionData.json');

function App() {
  const [campaignsList, setCampaignsList] = useState();

  const provider = new ethers.providers.AlchemyProvider('rinkeby');
  const contract = new ethers.Contract(
    connectionData.contractAddresses.rinkeby,
    cryptStarter.abi,
    provider
  );

  useEffect(() => {
    const retrieveCampaigns = async () => {
      const campaignsList = [];

      const numberOfCampaignsBN = await contract.getNumberOfCampaigns();
      const numberOfCampaigns = ethers.BigNumber.from(
        numberOfCampaignsBN._hex
      ).toNumber();

      if (numberOfCampaigns === 0) {
        setCampaignsList([]);
        return;
      }

      for (let i = 0; i < numberOfCampaigns; i++) {
        const campaign = await contract.campaigns(i);
        campaignsList.push(campaign);
      }

      setCampaignsList(campaignsList);
    };

    retrieveCampaigns();
  }, []);

  return (
    <div>
      <Header />
      <CampaignsList campaigns={campaignsList ?? []} contract={contract} />
    </div>
  );
}

export default App;
