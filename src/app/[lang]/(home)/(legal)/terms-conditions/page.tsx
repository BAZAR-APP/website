import { Locale } from '../../../../../../i18n.config';
import { getMessages } from '@/lib/i18n';
import TermsConditionsPageClient from './TermsConditionsPageClient';

const TermsConditionsPageServer = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params; 
  const messages = getMessages(lang); 

  return <TermsConditionsPageClient lang={lang} downloadAppMessages={messages.downloadApp} />;
};

export default TermsConditionsPageServer;
