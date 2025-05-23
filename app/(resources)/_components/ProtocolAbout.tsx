/************************************************************************************************
 * ProtocolAbout Component:

 * This component renders a section that provides a detailed description of a specific
 * protocol. It typically includes the protocol's name and a paragraph of explanatory text.

 * Props:
 * - data: An object of type THeaderData, containing the name and description of the protocol.

 * Structure:
 * - A main div container with a top margin.
 * - A section element with a gradient background and responsive grid layout.
 *   - An h2 heading displaying "What is [Protocol Name]".
 *   - A div containing a paragraph with the protocol's description.
 ************************************************************************************************/
import type {ReactNode} from 'react';

/************************************************************************************************
 * THeaderData Type:

 * Defines the structure for the data prop of the ProtocolAbout component.

 * Fields:
 * - name: The name of the protocol.
 * - description: A textual description of the protocol.
 ************************************************************************************************/
type THeaderData = {
	name: string;
	description: string;
};

/************************************************************************************************
 * ProtocolAbout Function:

 * Renders the "About" section for a given protocol, displaying its name and description.

 * Args:
 * - data (THeaderData): An object containing the name and description of the protocol.

 * Returns:
 * - ReactNode: The JSX element representing the protocol about section.
 ************************************************************************************************/
export function ProtocolAbout(data: THeaderData): ReactNode {
	return (
		<div className={'mt-4'}>
			<section
				className={
					'grid grid-cols-1 items-center rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C] p-6 lg:grid-cols-2 lg:p-20'
				}>
				<h2 className={'col-span-1 mb-6 text-[28px] leading-[32px] lg:mb-0 lg:text-7xl'}>
					{`What is ${data.name}`}
				</h2>
				<div className={'col-span-1 flex max-w-[560px] flex-col gap-4'}>
					<p className={'whitespace-break-spaces break-keep text-gray-500'}>{data.description}</p>
				</div>
			</section>
		</div>
	);
}
