import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';

export const Campaign = ({ data }) => {
  return (
    <div className='mt-5 gt-5'>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>{data.name}</CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {/* @TODO: parse to eth and calculate usd value*/}
            {`Target: ${data.target} ETH`}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {`Ends at: ${new Date(data.deadline * 1000).toString()}`}
          </CardSubtitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            {/* @TODO: format to ETH */}
            {`Total raised: ${data.totalRaised} ETH with ${data.totalDonations} donations`}
          </CardSubtitle>
          <CardText>
            Here could be a campaign's description stored on IPFS
          </CardText>
          <Button>Back this campaign</Button>
          <Button>Back this campaign</Button>
        </CardBody>
      </Card>
    </div>
  );
};
