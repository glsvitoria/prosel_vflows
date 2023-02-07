import { UploadSimple } from 'phosphor-react'

export default function AttachFile() {
	return (
		<div className="flex items-center mt-12 ml-2">
			<button className="bg-button_green text-white flex items-center justify-around w-56 py-2 px-4 rounded-2xl hover:brightness-125 duration-300 mr-8">
				<UploadSimple size={32} color="#FFF" />
				Anexar Nota Fiscal
			</button>
			<div className="text-sm">
				<p>Nota Fiscal Anexada.pdf</p>
			</div>
		</div>
	)
}
