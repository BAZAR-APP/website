"use client";

import { DownloadApp, Terms } from '@/components'; 
import { Locale } from '../../../../../../i18n.config';

interface DownloadAppProps {
  messages: {
    heading: string;
    description: string;
  };
}
interface TermsConditionsPageClientProps {
  lang: Locale;
  downloadAppMessages: DownloadAppProps['messages']; 
}

const TermsConditionsPageClient: React.FC<TermsConditionsPageClientProps> = ({ lang, downloadAppMessages }) => {
  return (
    <>
      <Terms lang={lang} />
      <DownloadApp messages={downloadAppMessages} />
    </>
  );
};

export default TermsConditionsPageClient;