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
  Badge,
  Spinner,
} from 'reactstrap';
import { ethers } from 'ethers';
import { useEthers } from '@usedapp/core';
import './Campaign.css';
import { CampaignStatus } from '../utils/CampaignStatus';

export const Campaign = ({ data, contract }) => {
  const { account, library } = useEthers();
  const [fundingAmount, setFundingAmount] = useState(0);
  const [fundingInProgress, setFundingInProgress] = useState(false);
  const [totalDonations, setTotalDonations] = useState(data.totalDonations);
  const [totalRaised, setTotalRaised] = useState(data.totalRaised);

  const handleAmountChange = (e) => {
    setFundingAmount(e.target.value);
  };

  const fundCampaign = async (e) => {
    setFundingInProgress(true);
    try {
      const index = ethers.BigNumber.from(data.index).toString();
      const signer = contract.connect(library.getSigner());
      const tx = await signer.fundCampaign(index, {
        value: fundingAmount,
      });

      await tx.wait();

      const newState = await contract.campaigns(data.index);
      setTotalDonations(newState.totalDonations);
      setTotalRaised(newState.totalRaised);
      // @TODO: Use modal to confirm transaction success
      // @TODO: Frontend validation
      // @TODO: Handle errors
      setFundingInProgress(false);
      alert('Campaign successfully funded!');
    } catch (error) {
      setFundingInProgress(false);
    }
  };

  const getStatusString = (status) => {
    let string;
    let color;
    switch (status) {
      case CampaignStatus.IN_PROGRESS:
        string = 'In progress';
        color = 'primary';
        break;
      case CampaignStatus.SUCCESS:
        string = 'Successful';
        color = 'success';
        break;
      case CampaignStatus.UNSUCCESSFUL:
        string = 'Unsuccessful';
        color = 'danger';
        break;
      case CampaignStatus.WITHDRAWN:
        string = 'Withdrawn';
        color = 'warning';
        break;
      default:
        string = "Couldn't retrieve status";
        break;
    }

    return { status: string, type: color };
  };

  const { status, type } = getStatusString(data.status);
  return (
    <div className='mb-5 gt-5'>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>{data.name}</CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {/* @TODO: Clickable link to see all campaign that given number created */}
            {/* Add timestamp and format it */}
            {`Created at --_--_-- by ${data.owner}`}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            <Badge color={type}>{status}</Badge>
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
            {`Total raised: ${totalRaised} wei with ${totalDonations} ${
              totalDonations === 1 ? 'donation' : 'donations'
            }`}
            {/* {`Total raised: ${ethers.utils.formatEther(data.totalRaised, {
              commify: true,
              pad: true,
            })} ETH with ${data.totalDonations} donations`} */}
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
              <Button
                color='primary'
                onClick={fundCampaign}
                className={fundingInProgress ? 'disabled' : ''}
              >
                {fundingInProgress ? (
                  <Spinner color='light' size='sm'>
                    Loading...
                  </Spinner>
                ) : (
                  'Fund this campaign'
                )}
              </Button>
            </InputGroup>
          )}
          {!account && (
            <p className='text-danger'>
              Connect with your wallet to be able to back this campaign
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
