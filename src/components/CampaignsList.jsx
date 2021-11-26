import { Container } from 'reactstrap';
import { Campaign } from './Campaign';
export const CampaignsList = ({ campaigns, contract }) => {
  return (
    <Container>
      {campaigns.map((campaign) => {
        return (
          <Campaign key={campaign.index} data={campaign} contract={contract} />
        );
      })}
    </Container>
  );
};
