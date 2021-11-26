import { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  InputGroup,
  Input,
} from 'reactstrap';
import { ethers } from 'ethers';
import { useEthers } from '@usedapp/core';
import './Campaign.css';
import { CampaignStatus } from '../utils/CampaignStatus';

export const Campaign = ({ data, contract }) => {
  const { account, library } = useEthers();
  const [fundingAmount, setFundingAmount] = useState(0);
  const handleAmountChange = (e) => {
    setFundingAmount(e.target.value);
  };

  const fundCampaign = async (e) => {
    const index = ethers.BigNumber.from(data.index).toString();
    const signer = contract.connect(library.getSigner());
    const tx = await signer.fundCampaign(index, {
      value: fundingAmount,
    });
  };

  const getStatusString = (status) => {
    let string;
    switch (status) {
      case CampaignStatus.IN_PROGRESS:
        string = 'In progress';
        break;
      case CampaignStatus.SUCCESS:
        string = 'Successful';
        break;
      case CampaignStatus.UNSUCCESSFUL:
        string = 'Unsuccessful';
        break;
      case CampaignStatus.WITHDRAWN:
        string = 'Withdrawn';
        break;
      default:
        string = "Couldn't retrieve status";
        break;
    }

    return string;
  };
  return (
    <div className='mt-5 gt-5'>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>{data.name}</CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {/* @TODO: Clickable link to see all campaign that given number created */}
            {/* Add timestamp and format it */}
            {`Created at --_--_-- by ${data.owner}`}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {getStatusString(data.status)}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {/* @TODO: calculate usd value*/}
            {`Target: ${ethers.utils.formatEther(data.target, {
              commify: true,
              pad: true,
            })} ETH`}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {`Ends at: ${new Date(data.deadline * 1000).toString()}`}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {`Total raised: ${ethers.utils.formatEther(data.totalRaised, {
              commify: true,
              pad: true,
            })} ETH with ${data.totalDonations} donations`}
          </CardSubtitle>
          <CardText>
            {/* Here could be a campaign's description stored on IPFS */}
          </CardText>
          {account && (
            <InputGroup className='fund-campaign-input'>
              {/* @TODO: Dropdown with a unit */}
              <Input
                type='number'
                placeholder='Amount in wei'
                onChange={handleAmountChange}
              />
              <Button color='primary' onClick={fundCampaign}>
                Fund this campaign
              </Button>
            </InputGroup>
          )}
          {!account && (
            <p className='text-muted'>
              Connect with your wallet to be able to back this campaign
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
