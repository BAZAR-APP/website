import { getMessages } from '@/lib/i18n';
import { Locale } from '../../../../../../i18n.config';
import PrivacyPolicyPageClient from './PrivacyPolicyPageClient';

const PrivacyPolicyPageServer = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params; 
  const messages = getMessages(lang); 

  return <PrivacyPolicyPageClient lang={lang} downloadAppMessages={messages.downloadApp} />;
};

export default PrivacyPolicyPageServer;