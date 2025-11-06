// "use client"
// import { AccountDetails } from "@/components"
// import PasswordDetail from "@/components/ProfileDetails/PasswordDetail";
// import ProfileBilling from "@/components/ProfileDetails/ProfileBilling";
// import ProfileChaletListing from "@/components/ProfileDetails/ProfileChaletListing";
// import ProfileHeader from "@/components/ProfileDetails/ProfileHeader";
// import ProfileTabs from "@/components/ProfileDetails/ProfileTab"
// import { useState } from "react";

// const tabData = [
//     { id: 'account', label: 'Account Details' },
//     { id: 'save', label: 'Save List' },
//     { id: 'password', label: 'Password' },
//     { id: 'billing', label: 'Billing' },
// ];


// const Profile = () => {
//     const [activeTab, setActiveTab] = useState("account");

//     return (
//         <>
//             <div className="flex flex-col items-start flex-nowrap bg-[#fdfdfe] relative mx-auto my-0 pt-6 pb-16 px-4 sm:px-10 lg:px-[160px] gap-6 sm:gap-[40px]">

//                 <ProfileHeader />
//                 <ProfileTabs
//                     tabs={tabData}
//                     activeTab={activeTab}
//                     onTabClick={setActiveTab}
//                 />

//                 <div className="mt-6">
//                     {activeTab === "account" && <div> <AccountDetails /></div>}
//                     {activeTab === "save" && <div><ProfileChaletListing /></div>}
//                     {activeTab === "password" && <div><PasswordDetail /> </div>}
//                     {activeTab === "billing" && <div><ProfileBilling /></div>}
//                 </div>
//             </div >
//         </>
//     )
// }

// export default Profile
// src/app/[lang]/(home)/profile/page.tsx
import { Locale } from '../../../../../i18n.config'
import { getMessages } from '@/lib/i18n'
import ProfileClient from './ProfileClient'

export default async function ProfilePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const messages = getMessages(lang)

  return <ProfileClient lang={lang} messages={messages} />
}