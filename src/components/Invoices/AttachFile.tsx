import { TrashSimple, UploadSimple } from 'phosphor-react'
import { useRef, useState } from 'react'

export default function AttachFile() {
	const [filesName, setFilesName] = useState<string[]>([])
	const inputRef = useRef(null)

   function deleteFile(file: string) {
      const newFileNameArray = filesName.filter(fileName => fileName != file)

      setFilesName(newFileNameArray)
   }
	return (
		<div className="flex items-center mt-12 ml-2">
			<label className="bg-button_green text-white flex items-center justify-around w-56 py-2 px-4 rounded-2xl hover:brightness-125 hover:cursor-pointer duration-300 mr-8">
				<UploadSimple size={32} color="#FFF" />
				Anexar Nota Fiscal
				<input
					ref={inputRef}
					type="file"
					className="w-0"
					onChange={(e) =>
						setFilesName([...filesName, inputRef.current.files[0].name])
					}
				/>
			</label>

			<div className="text-sm grid gap-4">
				{filesName && filesName.map((file, index) => 
               <div className='flex items-center gap-4' key={index}>
                  <p>{file}</p>
                  <TrashSimple size={16} color="#030303" onClick={() => deleteFile(file)} className="hover:cursor-pointer" />
               </div>
            )}
			</div>
		</div>
	)
}
