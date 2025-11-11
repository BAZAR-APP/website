'use client'
import { AccountDetails } from '@/components'
import PasswordDetail from '@/components/ProfileDetails/PasswordDetail'
import ProfileBilling from '@/components/ProfileDetails/ProfileBilling'
import ProfileChaletListing from '@/components/ProfileDetails/ProfileChaletListing'
import ProfileHeader from '@/components/ProfileDetails/ProfileHeader'
import ProfileTabs from '@/components/ProfileDetails/ProfileTab'
import { useState } from 'react'
import { Locale } from '../../../../../i18n.config'

// interface ProfileClientProps {
//   lang: Locale
//   messages: {
//     profile: {
//       profile_title: string
//       profile_subtitle: string
//       refer_friend: string
//       points_label: string
//       refer_modal_title: string
//       tabs: {
//         account: string
//         save: string
//         password: string
//         billing: string
//       }
//       accountDetails: {
//         full_name_label: string
//         phone_label: string
//         email_label: string
//         address_label: string
//         save_changes_button: string
//         saving_button: string
//         modal_title: string
//       }
//     }
//     passwordDetail: {
//       old_password_label: string
//       new_password_label: string
//       confirm_new_password_label: string
//       forget_password_button: string
//       save_password_button: string
//     }
//     profileBilling: {
//       pick_billing_period: string
//     }
//   }
// }

interface BillingItem {
  id: string;
  imageUrl: string;
  title: string;
  location: string;
  locationIconUrl: string;
  dateRange: string;
  dateIconUrl: string;
  paymentDate: string;
  paymentIconUrl: string;
  amount: string;
  paymentStatus: {
    text: string;
    color: 'pink' | 'emerald';
    iconUrl: string;
  };
  detailsLinkIconUrl: string;
}

interface ProfileClientProps {
  lang: Locale
  messages: { 
    profile: {
      profile_title: string
      profile_subtitle: string
      refer_friend: string
      points_label: string
      refer_modal_title: string
      tabs: {
        account: string
        save: string
        password: string
        billing: string
      }
    },
    accountDetails: {
      full_name_label: string
      phone_label: string
      email_label: string
      address_label: string
      save_changes_button: string
      saving_button: string
      modal_title: string
    },
    profileChaletListing: {
      no_chalets_found: string;
      try_adjusting_filters: string;
    },
    passwordDetail: {
      old_password_label: string
      new_password_label: string
      confirm_new_password_label: string
      forget_password_button: string
      save_password_button: string
    },
    profileBilling: {
      pick_billing_period: string
      billing_items: BillingItem[];
    }
  }
}

const ProfileClient: React.FC<ProfileClientProps> = ({ lang, messages }) => {
  const tabData = [
    { id: 'account', label: messages.profile.tabs.account },
    { id: 'save', label: messages.profile.tabs.save },
    { id: 'password', label: messages.profile.tabs.password },
    { id: 'billing', label: messages.profile.tabs.billing },
  ]

  const [activeTab, setActiveTab] = useState('account')

  return (
    <>
      <div className="flex flex-col items-start flex-nowrap bg-[#fdfdfe] relative mx-auto my-0 pt-6 pb-16 px-4 sm:px-10 lg:px-[160px] gap-6 sm:gap-[40px]">
        <ProfileHeader lang={lang} messages={messages.profile} />
        <ProfileTabs tabs={tabData} activeTab={activeTab} onTabClick={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'account' && (
            <div>
              <AccountDetails messages={messages?.accountDetails} />
            </div>
          )}
          {activeTab === 'save' && (
            <div>
              <ProfileChaletListing messages={messages?.profileChaletListing} lang={lang} />
            </div>
          )}
          {activeTab === 'password' && (
            <div>
              <PasswordDetail messages={messages?.passwordDetail} />
            </div>
          )}
          {activeTab === 'billing' && (
            <div>
              <ProfileBilling messages={messages?.profileBilling} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileClient
