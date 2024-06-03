import { d as createComponent, r as renderTemplate, e as renderComponent, u as unescapeHTML } from '../astro_C0MNhuhG.mjs';
import 'kleur/colors';
import { $ as $$MarkdownPostLayout } from './post-1_Dfs4UwYC.mjs';

const html = "<p>After a successful first week learning Astro, I decided to try some more. I wrote and imported a small component from memory!</p>";

				const frontmatter = {"layout":"../../layouts/MarkdownPostLayout.astro","title":"My Second Blog Post","author":"Astro Learner","description":"After learning some Astro, I couldn't stop!","image":{"url":"https://docs.astro.build/assets/arc.webp","alt":"Thumbnail of Astro arcs."},"pubDate":"2022-07-08T00:00:00.000Z","tags":["astro","blogging","learning in public","successes"]};
				const file = "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/posts/post-2.md";
				const url = "/posts/post-2";
				function rawContent() {
					return "After a successful first week learning Astro, I decided to try some more. I wrote and imported a small component from memory!";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$MarkdownPostLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
