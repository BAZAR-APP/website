import { getDictionary } from '@/lib/dictionary'
import { Locale } from '../../../i18n.config'

export default async function About({ params }: { params: { lang: Locale } }) {
  const { lang } = await params
  const { page } = await getDictionary(lang)

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {page.about.title}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {page.about.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}