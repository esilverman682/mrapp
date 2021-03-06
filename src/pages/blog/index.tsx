import { getNextStaticProps } from '@faustjs/next';
import { client, OrderEnum, PostObjectsConnectionOrderbyEnum } from 'client';
import { Footer, Header, Pagination, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Blog from '../../components/Blog'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styles from 'scss/pages/posts.module.scss';

const POSTS_PER_PAGE = 6;

export default function Page() {
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const isBefore = postSlug === 'before';
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  });

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content content-index">
  
      <Hero
          title="Get Started with Faust.js"
          buttonText={"Developer Docs"}
          buttonURL="https://faustjs.org"
          button2Text="Faust.js on GitHub"
          button2URL="https://github.com/wpengine/faustjs"
          bgImage="/images/headless_hero_background.webp"
          id={styles.home_hero}
        />

        <Blog
          posts={posts.nodes}
          heading="Blog Posts"
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
 
        <Pagination pageInfo={posts.pageInfo} basePath="/blog" />
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
