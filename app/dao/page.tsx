'use client';

import type {ReactNode} from 'react';

/************************************************************************************************
 * DAO Page Component:

 * This component renders the main page for the DAO (Decentralized Autonomous Organization)
 * section of the ShapeShift application.
 * Currently, it displays a simple heading "DAO".
 ************************************************************************************************/

export default function DaoPage(): ReactNode {
	return <h1 className={'text-3xl font-bold'}>{'DAO'}</h1>;
}
