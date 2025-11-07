"use client";

import { DownloadApp, Privacy } from '@/components';
import { Locale } from '../../../../../../i18n.config';
interface DownloadAppProps {
  messages: {
    heading: string;
    description: string;
  };
}

interface PrivacyPolicyPageClientProps {
  lang: Locale; 
  downloadAppMessages: DownloadAppProps['messages']; 
}

const PrivacyPolicyPageClient: React.FC<PrivacyPolicyPageClientProps> = ({ lang, downloadAppMessages }) => {
  return (
    <>
      <Privacy lang={lang} />
      <DownloadApp messages={downloadAppMessages} />
    </>
  );
};

export default PrivacyPolicyPageClient;