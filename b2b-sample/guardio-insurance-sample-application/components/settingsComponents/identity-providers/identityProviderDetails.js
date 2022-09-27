import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Nav, Panel, Stack, useToaster } from 'rsuite';
import styles from "../../../styles/idp.module.css";
import decodeGetDetailedIdentityProvider from '../../../util/apiDecode/settings/identityProvider/decodeGetDetailedIdentityProvider';
import ButtonGroupIdentityProviderDetails from './buttonGroupIdentityProviderDetails';
import Raw from './idpDetailsSections/raw';

export default function IdentityProviderDetails(props) {

  const toaster = useToaster();
  const [idpDetails, setIdpDetails] = useState({});
  const [activeKeyNav, setActiveKeyNav] = useState('1');

  const fetchData = useCallback(async () => {
    const res = await decodeGetDetailedIdentityProvider(props.session, props.id);
    setIdpDetails(res);
  }, [props])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const activeKeyNavSelect = (eventKey) => {
    setActiveKeyNav(eventKey);
  }

  const idpDetailsComponent = (activeKey) => {
    switch (activeKey) {
      case '1':
        return <Raw idpDetails={idpDetails} />;
      case '2':
        return <Raw idpDetails={idpDetails} />;
      case '3':
        return <Raw idpDetails={idpDetails} />;
    }
  }

  return (
    <Panel header={
      <IdentityProviderDetailsHeader idpDetails={idpDetails} />
    } eventKey={props.id} id={props.id}>
      <Stack direction='column' alignItems='left'>
        <ButtonGroupIdentityProviderDetails id={props.id} fetchAllIdPs={props.fetchAllIdPs} />
        <IdentityProviderDetailsNav activeKeyNav={activeKeyNav} activeKeyNavSelect={activeKeyNavSelect} />

        <div>
          {idpDetailsComponent(activeKeyNav)}
        </div>

      </Stack>
    </Panel>
  )
}

function IdentityProviderDetailsHeader(props) {
  return (
    <Stack>
      <Stack>
        <Avatar
          style={{ background: '#000', marginRight: "20px" }}
          size="lg"
          circle
          src={props.idpDetails.image}
          alt="IDP image"
        />
        <Stack direction='column' justifyContent='flex-start' alignItems='left'>
          <h4>{props.idpDetails.name}</h4>
          <p>{props.idpDetails.description}</p>
        </Stack>
      </Stack>

    </Stack>
  )
}

function IdentityProviderDetailsNav(props) {
  return (
    <Nav appearance="subtle" activeKey={props.activeKeyNav} style={{ marginBottom: 10 }}>
      <Nav.Item eventKey="1"
        onSelect={(eventKey) => props.activeKeyNavSelect(eventKey)}>General</Nav.Item>
      <Nav.Item eventKey="2"
        onSelect={(eventKey) => props.activeKeyNavSelect(eventKey)}>Settings</Nav.Item>
      <Nav.Item eventKey="3"
        onSelect={(eventKey) => props.activeKeyNavSelect(eventKey)}>Raw</Nav.Item>
    </Nav>
  );
}

/**
 * {
 *  General : {
 *              Name : "", Desc: ""
 *            },
 *  Settings : {
 *              Client Id, Client Secret, Authorized redirect URI, Additional Query Parameters
 *            }
 *  Raw : Full JSON object
 * }
 * 
 */