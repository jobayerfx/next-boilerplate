import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Blog from "@/components/Blog";

export default async function Home(props: any) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const posts = await getData();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Blog
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {posts.map((post: any) => (
            <Blog
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category}
              content={post.content}
              tags={post.tags}
              timestrap={post.timestrap}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export async function getData() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const postCollection = client.db("next-app").collection("posts");
  const postArray = await postCollection.find().toArray();
  client.close();

  return postArray.map((item) => ({
    title: item.title,
    category: item.category,
    content: item.content,
    tags: item.tags,
    timestrap: item.timestrap,
    id: JSON.stringify(item._id).replace(/^"(.+)"$/, "$1"),
  }));
}
