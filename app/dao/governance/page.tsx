'use client';

import type {ReactNode} from 'react';

/************************************************************************************************
 ** DAO Governance Page Component:

 ** This component renders the main page for the governance section within the DAO
 ** (Decentralized Autonomous Organization) area of the ShapeShift application.
 ** Currently, it displays a simple heading "Governance".
 ************************************************************************************************/

export default function GovernancePage(): ReactNode {
	return <h1 className={'text-3xl font-bold'}>{'Governance'}</h1>;
}
