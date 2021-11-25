import { useContractCall } from '@usedapp/core';
import { ethers } from 'ethers';
const contractAddress = '0x426609fFe4c943152742979329B68A55D2dF8099';
const cryptStarter = require('../utils/abi/CryptStarter.json');

export const CampaignsList = () => {
  const useCampaignsList = () => {
    // const campaigns = [];
    const abi = new ethers.utils.Interface(cryptStarter.abi);
    const [numberOfCampaigns] =
      useContractCall({
        abi: abi,
        address: contractAddress,
        method: 'getNumberOfCampaigns',
        args: [],
      }) ?? [];

    const number = ethers.BigNumber.from(numberOfCampaigns._hex);
    // for (let i = 0; i <= numberOfCampaigns, )
    // const [campai] = useContractCall({
    //     abi: ABI,
    //     address: contractAddress,
    //     method: 'campaigns',
    //     args: [],
    // }) ?? [];
  };
  const campaignsList = useCampaignsList();
  console.log(campaignsList);
  return <div></div>;
};
