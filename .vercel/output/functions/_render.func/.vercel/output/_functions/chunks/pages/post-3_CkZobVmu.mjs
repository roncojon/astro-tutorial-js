import { d as createComponent, r as renderTemplate, e as renderComponent, u as unescapeHTML } from '../astro_C0MNhuhG.mjs';
import 'kleur/colors';
import { $ as $$MarkdownPostLayout } from './post-1_Dfs4UwYC.mjs';

const html = "<p>It wasn’t always smooth sailing, but I’m enjoying building with Astro. And, the <a href=\"https://astro.build/chat\">Discord community</a> is really friendly and helpful!</p>";

				const frontmatter = {"layout":"../../layouts/MarkdownPostLayout.astro","title":"My Third Blog Post","author":"Astro Learner","description":"I had some challenges, but asking in the community really helped!","image":{"url":"https://docs.astro.build/assets/rays.webp","alt":"Thumbnail of Astro rays."},"pubDate":"2022-07-15T00:00:00.000Z","tags":["astro","learning in public","setbacks","community"]};
				const file = "C:/Users/RonWin10/Documents/Ronald/StudyFromMSI/Astro Basics/tutorial/src/pages/posts/post-3.md";
				const url = "/posts/post-3";
				function rawContent() {
					return "It wasn't always smooth sailing, but I'm enjoying building with Astro. And, the [Discord community](https://astro.build/chat) is really friendly and helpful!";
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
