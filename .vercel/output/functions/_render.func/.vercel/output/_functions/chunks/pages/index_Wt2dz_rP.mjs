import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead, f as addAttribute } from '../astro_C0MNhuhG.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from './_tag__B7p_nj5p.mjs';
/* empty css                          */

const $$Astro$1 = createAstro("https://example.com");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../posts/post-1.md": () => import('./post-1_Dfs4UwYC.mjs').then(n => n.p),"../posts/post-2.md": () => import('./post-2_4IDHm-Bj.mjs'),"../posts/post-3.md": () => import('./post-3_CkZobVmu.mjs'),"../posts/post-4.md": () => import('./post-4_Bw16ie9B.mjs')}), () => "../posts/*.md");
  const tags = [...new Set(allPosts.map((post) => post.frontmatter.tags).flat())];
  const pageTitle = "Tag Index";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "data-astro-cid-os4i7owy": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tags" data-astro-cid-os4i7owy> ${tags.map((tag) => renderTemplate`<p class="tag" data-astro-cid-os4i7owy> <a${addAttribute(`/tags/${tag}`, "href")} data-astro-cid-os4i7owy>${tag}</a> </p>`)} </div> ` })} `;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/tags/index.astro", void 0);

const $$file$1 = "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/tags/index.astro";
const $$url$1 = "/tags";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageTitle = "Home Page";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2>My awesome blog subtitle</h2> ` })}`;
}, "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/index.astro", void 0);

const $$file = "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
