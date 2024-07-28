import { getAllTags } from "../../firebase/database/serverAllPosts";

const prerender = false;
// @ts-ignore
export const GET: APIRoute = async ({ request, res }) => {
    console.log('GET /api/gettags');
    try {
        const tags = await getAllTags();
    console.log('tagstagstagstagstags',tags);

        return new Response(JSON.stringify({tags}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
}

