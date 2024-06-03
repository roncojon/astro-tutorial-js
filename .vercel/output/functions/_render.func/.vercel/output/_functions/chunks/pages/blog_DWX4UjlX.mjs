import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_C0MNhuhG.mjs';
import 'kleur/colors';
import { a as $$BlogPost, $ as $$BaseLayout } from './_tag__B7p_nj5p.mjs';

const $$Astro = createAstro("https://example.com");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./posts/post-1.md": () => import('./post-1_Dfs4UwYC.mjs').then(n => n.p),"./posts/post-2.md": () => import('./post-2_4IDHm-Bj.mjs'),"./posts/post-3.md": () => import('./post-3_CkZobVmu.mjs'),"./posts/post-4.md": () => import('./post-4_Bw16ie9B.mjs')}), () => "../pages/posts/*.md");
  console.log("allPosts", allPosts);
  console.log("singlePost", allPosts[0]);
  console.log("frontmatterrr", allPosts[0].frontmatter);
  const pageTitle = "My Astro Learning Blog";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>This is where I will post about my journey learning Astro.</p> <ul> <!-- <li><a href="/posts/post-1/">Post 1</a></li>
    <li><a href="/posts/post-2/">Post 2</a></li>
    <li><a href="/posts/post-3/">Post 3</a></li> --> ${allPosts.map((post) => renderTemplate`${renderComponent($$result2, "BlogPost", $$BlogPost, { "url": post.url, "title": post.frontmatter.title })}`)} </ul> ` })}`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/blog.astro", void 0);

const $$file = "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/blog.astro";
const $$url = "/blog";

export { $$Blog as default, $$file as file, $$url as url };
