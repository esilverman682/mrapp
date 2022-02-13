import { getNextStaticProps } from '@faustjs/next';
 import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
 import { client, Page as PageType } from 'client';
import Page from './[...pageUri]';
 
 
 export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}
export function PageComponent({ page }: PageProps) {
 
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Products Services - {generalSettings.title}</title>
      </Head>

      <Hero title="Products Services" />
      <Hero
       // title={page?.title()}
       // bgImage={page?.featuredImage.node.sourceUrl()}
       title={page?.standardPage?.heroTitle}
       subtitle={page?.standardPage?.heroDescription}
       buttonText={page?.standardPage?.buttonLink?.title}
       buttonURL={page?.standardPage?.buttonLink?.url}
       bgImage={page?.standardPage?.heroBanner?.mediaItemUrl}
      />
      <main className="content content-single">
        <div className="wrap">
          <p>
            You can still create pages just as you would in{' '}
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              target="_blank"
              rel="noreferrer">
              Next.js
            </a>
            . Take a look at <code>src/pages/custom-page.tsx</code> for an
            example.
          </p>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
