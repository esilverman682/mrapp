import type { Page, Post } from 'client';
import { client } from 'client';
import { PostComponent } from './posts/[postSlug]';
import { PageComponent } from './[...pageUri]';
//import { ProductsComponent } from './products-services/[postSlug]';

export default function Preview() {
  const isLoading = client.useIsLoading();
  const { typeName, node } = client.auth.usePreviewNode();

  if (isLoading || node === undefined) {
    return <p>Loading...</p>;
  }

  if (node === null) {
    return <p>Post not found</p>;
  }

  switch (typeName) {
    case 'Page': {
      const page = node as Page;
      return <PageComponent page={page} />;
    }
    case 'Post': {
      const post = node as Post;
      return <PostComponent post={post} />;
    }
 //   case 'ProductsComponent': {
   //   const post = node as Post;
  //    return <ProductsComponent post={post} />;
   // }
    // Add custom post types here as needed
    default: {
      throw new Error(`Unknown post type: ${typeName}`);
    }
  }
}
