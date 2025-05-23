'use client';

import type {ReactNode} from 'react';

/************************************************************************************************
 ** DAO Docs Page Component:

 ** This component renders the main page for the documentation section within the DAO
 ** (Decentralized Autonomous Organization) area of the ShapeShift application.
 ** Currently, it displays a simple heading "Docs".
 ************************************************************************************************/

export default function DocsPage(): ReactNode {
	return <h1 className={'text-3xl font-bold'}>{'Docs'}</h1>;
}
