import { createContext, useState } from "react";
import { UserInfo, UserInfoContextType } from "../@types/interfaces";

export const UserInfoContext = createContext<UserInfoContextType | {}>({})

export const UserInfoProvider = (props: any) => {
   const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
   return (
      <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
         {props.children}
      </UserInfoContext.Provider>
   )
}