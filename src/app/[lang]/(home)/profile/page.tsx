"use client"
import { AccountDetails, PropertyCard } from "@/components"
import PasswordDetail from "@/components/ProfileDetails/PasswordDetail";
import ProfileBilling from "@/components/ProfileDetails/ProfileBilling";
import ProfileChaletListing from "@/components/ProfileDetails/ProfileChaletListing";
import ProfileHeader from "@/components/ProfileDetails/ProfileHeader";
import ProfileTabs from "@/components/ProfileDetails/ProfileTab"
import { useState } from "react";

const tabData = [
    { id: 'account', label: 'Account Details' },
    { id: 'save', label: 'Save List' },
    { id: 'password', label: 'Password' },
    { id: 'billing', label: 'Billing' },
];


const Profile = () => {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <>
            <div className="main-container flex  pt-[24px] pr-[160px] pb-[64px] pl-[160px] flex-col gap-[40px] items-start flex-nowrap bg-[#fdfdfe] relative mx-auto my-0">
                <ProfileHeader />
                <ProfileTabs
                    tabs={tabData}
                    activeTab={activeTab}
                    onTabClick={setActiveTab}
                />

                <div className="mt-6">
                    {activeTab === "account" && <div> <AccountDetails /></div>}
                    {activeTab === "save" && <div><ProfileChaletListing /></div>}
                    {activeTab === "password" && <div><PasswordDetail /> </div>}
                    {activeTab === "billing" && <div><ProfileBilling /></div>}
                </div>
            </div >
        </>
    )
}

export default Profile