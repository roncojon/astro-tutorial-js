import {serverAllPosts} from "../firebase/database/serverAllPosts";
import rss from '@astrojs/rss';

export async function GET(context) {
  const items = serverAllPosts.map(post => ({
    title: post.title,
    description: post.content.substring(0, 200), // Use a substring as a description
    link: `/posts/${post.id}`,
    pubDate: post?.createdAt?.toDateString() ?? "2024", // Assuming you have a createdAt field
  }));

  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: context.site,
    items: items,
    customData: `<language>en-us</language>`,
  });
}

/////// OLD (GETTING DATA FROM ACTUAL POSTS .MD FILES) ///// 
// import rss, { pagesGlobToRssItems } from '@astrojs/rss';


// export async function GET(context) {
//   return rss({
//     title: 'Astro Learner | Blog',
//     description: 'My journey learning Astro',
//     site: context.site,
//     items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
//     customData: `<language>en-us</language>`,
//   });
// }