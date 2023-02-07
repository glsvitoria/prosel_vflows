import { useContext, useEffect } from 'react'
import {
	UserInfoContextType,
	UserInfoContext,
} from '../../providers/userInfoContext'

import Header from '../Header/Header'
import Table from './Table'
import Footer from '../Footer/Footer'

export default function ContractPage() {
	const { userInfo, setUserInfo } = useContext(
		UserInfoContext
	) as UserInfoContextType

	useEffect(() => {
		if (userInfo == null) {
			const userInfoStorage = localStorage.getItem('userInfo')
			const userInfoParse = JSON.parse(userInfoStorage)
			setUserInfo(userInfoParse)
		}
	}, [])

	return (
		<main className="w-full h-full">
			<section className="bg-white mx-10 mt-10 rounded border-4 px-6">
				<Header
					title="Contratos Vinculados"
					company={userInfo?.company}
					isSuitcase={true}
				/>

				<Table contracts={userInfo?.contracts} />

				<Footer />
			</section>
		</main>
	)
}
