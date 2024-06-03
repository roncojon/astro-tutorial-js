import rss, { pagesGlobToRssItems } from '@astrojs/rss';

async function GET(context) {
  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: context.site,
    items: await pagesGlobToRssItems(/* #__PURE__ */ Object.assign({"./posts/post-1.md": () => import('./post-1_Dfs4UwYC.mjs').then(n => n.p),"./posts/post-2.md": () => import('./post-2_4IDHm-Bj.mjs'),"./posts/post-3.md": () => import('./post-3_CkZobVmu.mjs'),"./posts/post-4.md": () => import('./post-4_Bw16ie9B.mjs')})),
    customData: `<language>en-us</language>`,
  });
}

export { GET };
