import { TrashSimple, UploadSimple } from 'phosphor-react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

interface AttachFileProps {
   filesName: string[]
   setFilesName: Dispatch<SetStateAction<string[]>>
}

export default function AttachFile({filesName, setFilesName}: AttachFileProps) {

	const inputRef = useRef(null)

   function deleteFile(file: string) {
      const newFileNameArray = filesName.filter(fileName => fileName != file)

      setFilesName(newFileNameArray)
   }
	return (
		<div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-4 items-center md:mt-12 md:ml-2">
			<label className="bg-button_green text-white flex items-center justify-around xs:w-56 w-full py-2 px-4 rounded-2xl hover:brightness-125 hover:cursor-pointer duration-300 sm:mr-8 md:text-base text-sm">
				<UploadSimple size={24} color="#FFF" />
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
