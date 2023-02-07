import { createContext, Dispatch, useState } from "react";
import { Company, Contract } from "../@types/interfaces";

export type UserInfoContextType = {
   userInfo: UserInfo | null
   setUserInfo: Dispatch<React.SetStateAction<UserInfo | null>>
}

export type UserInfo = {
   company: Company | null
   contracts: Contract | Contract[] | null
}

export const UserInfoContext = createContext<UserInfoContextType | {}>({})

export const CompanyLoggedProvider = (props: any) => {
   const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
   return (
      <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
         {props.children}
      </UserInfoContext.Provider>
   )
}