import { Money, Percent } from "phosphor-react";

interface ModalTechnicalRetentionProps {
   technicalRetention: {
      amount: number
      percentage: number
   }
}

export default function ModalTechnicalRetention({technicalRetention}: ModalTechnicalRetentionProps) {
	return (
		<div className="grid md:grid-cols-2 grid-cols-1 text-xl relative justify-items-center">
			<div className="absolute -top-8 w-full">
				<h2 className=" text-no_black xl:w-2/5 lg:w-3/5 xs:w-4/5 w-11/12 text-center border-2 mx-auto border-no_black/25 -top-8 m-auto md:text-lg text-base bg-white">
					Retenção Técnica
				</h2>
			</div>
			<p className="flex items-center gap-3 md:mt-8 mt-4 xl:text-xl lg:text-lg text-sm">
				<Money size={24} color="#030303" /> Valor:{' '}
				<span className="lg:text-sm text-xs font-bold">
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(technicalRetention.amount / 100)}
				</span>
			</p>
			<p className="flex items-center gap-3 md:mt-8 mt-4 xl:text-xl lg:text-lg text-sm">
				<Percent size={24} color="#030303" /> Percentual:{' '}
				<span className="lg:text-sm text-xs font-bold">
					{technicalRetention.percentage}%
				</span>
			</p>
		</div>
	)
}
