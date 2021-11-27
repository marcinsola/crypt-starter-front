import { useState } from 'react';
import { Button, Card, CardBody, Container } from 'reactstrap';
import { FundingForm } from './FundingForm';
import { useEthers } from '@usedapp/core';

export const NewCampaign = ({ contract }) => {
  const { account } = useEthers();
  const [folded, setFolded] = useState(true);
  const handleFolded = () => {
    setFolded(!folded);
  };

  return (
    <div className='row'>
      {account && (
        <div className='col text-center mt-5 mb-5'>
          <Button onClick={handleFolded} color={folded ? 'success' : 'warning'}>
            {folded ? 'Add campaign' : 'Cancel'}
          </Button>
        </div>
      )}
      {account && !folded && (
        <Container className='mb-5'>
          <Card>
            <CardBody>
              <FundingForm contract={contract} />
            </CardBody>
          </Card>
        </Container>
      )}
    </div>
  );
};
