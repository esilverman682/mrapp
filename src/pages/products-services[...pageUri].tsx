import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { client, Page as PageType } from 'client';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function ProductComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
      </Head>

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
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();
 // const page = usePage({
//    id: 'hello-world'
//});
  return <ProductComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
