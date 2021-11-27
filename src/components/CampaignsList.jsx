import { Campaign } from './Campaign';
export const CampaignsList = ({ campaigns, contract }) => {
  return (
    <div>
      {/* Sort by the ones that end soon */}
      {campaigns.map((campaign) => {
        return (
          <Campaign key={campaign.index} data={campaign} contract={contract} />
        );
      })}
    </div>
  );
};
