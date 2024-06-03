import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent, f as addAttribute, g as renderHead, h as renderSlot } from '../astro_C0MNhuhG.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                           */

const $$Astro$7 = createAstro("https://example.com");
const $$Hamburguer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Hamburguer;
  return renderTemplate`${maybeRenderHead()}<div class="hamburger"> <span class="line"></span> <span class="line"></span> <span class="line"></span> </div>`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/components/Hamburguer.astro", void 0);

const $$Astro$6 = createAstro("https://example.com");
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Navigation;
  return renderTemplate`${maybeRenderHead()}<div class="nav-links"> <a href="/">Home</a> <a href="/about/">About</a> <a href="/blog/">Blog</a> <a href="/tags/">Tags</a> </div>`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/components/Navigation.astro", void 0);

const $$Astro$5 = createAstro("https://example.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header> <nav> ${renderComponent($$result, "Navigation", $$Navigation, {})} ${renderComponent($$result, "Hamburguer", $$Hamburguer, {})} </nav> </header>`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/components/Header.astro", void 0);

const $$Astro$4 = createAstro("https://example.com");
const $$Social = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Social;
  const { platform, username } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`https://www.${platform}.com/${username}`, "href")} data-astro-cid-yxtifmrq>${platform}</a> `;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/components/Social.astro", void 0);

const $$Astro$3 = createAstro("https://example.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  const platform = "github";
  const username = "withastro";
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>
Learn more about my projects on <a${addAttribute(`https://www.${platform}.com/${username}`, "href")} data-astro-cid-sz7xmlte>${platform}</a>!
</p> ${renderComponent($$result, "Social", $$Social, { "platform": "twitter", "username": "astrodotbuild", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Social", $$Social, { "platform": "github", "username": "withastro", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Social", $$Social, { "platform": "youtube", "username": "astrodotbuild", "data-astro-cid-sz7xmlte": true })} </footer> `;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro("https://example.com");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { pageTitle } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${pageTitle}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <h1>${pageTitle}</h1> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})}  </body> </html>`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/layouts/BaseLayout.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$BlogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { url } = Astro2.props;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li><a${addAttribute(typeof url === "string" ? url : "bb", "href")}>${title}</a></li>`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/components/BlogPost.astro", void 0);

const $$Astro = createAstro("https://example.com");
const Astro = $$Astro;
async function getStaticPaths() {
  const allPosts = await Astro.glob(/* #__PURE__ */ Object.assign({"../posts/post-1.md": () => import('./post-1_Dfs4UwYC.mjs').then(n => n.p),"../posts/post-2.md": () => import('./post-2_4IDHm-Bj.mjs'),"../posts/post-3.md": () => import('./post-3_CkZobVmu.mjs'),"../posts/post-4.md": () => import('./post-4_Bw16ie9B.mjs')}), () => "../posts/*.md");
  const uniqueTags = [
    ...new Set(allPosts.map((post) => post.frontmatter.tags).flat())
  ];
  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts.filter(
      (post) => post.frontmatter.tags.includes(tag)
    );
    return {
      params: { tag },
      props: { posts: filteredPosts }
    };
  });
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { tag } = Astro2.params;
  const { posts } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": tag }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Posts tagged with "${tag}""</p> <ul> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogPost", $$BlogPost, { "url": post.url, "title": post.frontmatter.title })}`)} </ul> ` })}`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/tags/[tag].astro", void 0);

const $$file = "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/tags/[tag].astro";
const $$url = "/tags/[tag]";

const _tag_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseLayout as $, _tag_ as _, $$BlogPost as a };
