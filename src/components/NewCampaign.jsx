import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  Col,
  Container,
} from 'reactstrap';
import { useEthers } from '@usedapp/core';
const moment = require('moment-timezone');

export const NewCampaign = ({ contract }) => {
  const { account, library } = useEthers();
  const [folded, setFolded] = useState(true);
  const handleFolded = () => {
    setFolded(!folded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, target, deadline } = e.target.elements;

    const deadlineEpoch = moment
      .utc(deadline.value, 'YYYY-MM-DD')
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .unix();

    const signer = contract.connect(library.getSigner());
    const tx = await signer.createCampaign(
      name.value,
      target.value,
      deadlineEpoch
    );
    const receipt = await tx.wait();
    console.log(receipt);
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
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label for='name' sm={{ offset: 2, size: 2 }}>
                    Name
                  </Label>
                  <Col sm={5}>
                    <Input id='name' name='name' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='target' sm={{ offset: 2, size: 2 }}>
                    Target amount
                  </Label>
                  <Col sm={5}>
                    <Input id='target' name='target' type='number' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='deadline' sm={{ offset: 2, size: 2 }}>
                    End date
                  </Label>
                  <Col sm={5}>
                    <Input id='deadline' name='deadline' type='date' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col
                    sm={{
                      offset: 2,
                      size: 10,
                    }}
                  >
                    <Button color='primary'>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      )}
    </div>
  );
};
