import ModalTaxesItem from './ModalTaxesItem'

interface ModalTaxesProps {
	invoiceTaxes: {
		ISSQN: number
		IRRF: number
		CSLL: number
		COFINS: number
		INSS: number
		PIS: number
	}
}

export default function ModalTaxes({ invoiceTaxes }: ModalTaxesProps) {
	return (
		<ul className="grid md:grid-cols-3 xs:grid-cols-2 xl:gap-x-16 gap-x-8 xl:gap-y-8 text-center text-white relative">
			<div className="absolute -top-8 w-full">
				<h2 className=" text-no_black xl:w-2/5 lg:w-3/5 xs:w-4/5 w-11/12 text-center border-2 mx-auto border-no_black/25 -top-8 m-auto md:text-lg text-base bg-white">
					Retenção de Impostos
				</h2>
			</div>
			<ModalTaxesItem title="ISSQN" taxesValue={invoiceTaxes.ISSQN} color="green" />
			<ModalTaxesItem title="IRRF" taxesValue={invoiceTaxes.IRRF} color="blue" />
			<ModalTaxesItem title="CSLL" taxesValue={invoiceTaxes.CSLL} color="green" />
			<ModalTaxesItem
				title="COFINS"
				taxesValue={invoiceTaxes.COFINS}
				color="blue"
			/>
			<ModalTaxesItem title="INSS" taxesValue={invoiceTaxes.INSS} color="green" />
			<ModalTaxesItem title="PIS" taxesValue={invoiceTaxes.PIS} color="blue" />
		</ul>
	)
}
