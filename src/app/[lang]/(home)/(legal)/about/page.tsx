import { AboutBanner, DownloadApp, OurStatistics, TestimonialsSection, WhyBookSection } from "@/components"
import { getMessages } from "@/lib/i18n";
import { Locale } from "../../../../../../i18n.config";

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
     const { lang } = await params;
  const messages = getMessages(lang);
    return (
        <>
            <AboutBanner />
            <OurStatistics />
            <WhyBookSection messages={messages.whyBookSection} />
            <TestimonialsSection />
            <DownloadApp messages={messages.downloadApp} />
        </>
    )

}
