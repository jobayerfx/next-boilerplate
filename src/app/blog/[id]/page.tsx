import { MongoClient, ObjectId } from "mongodb";
import { formatDate } from "@/utils/timeSince";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function BlogDetails({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/slides/198.jpg"
          className="mb-6 w-full rounded-lg shadow-lg dark:shadow-black/20"
          alt="image"
        />

        <div className="mb-6 flex items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (23).jpg"
            className="mr-2 h-8 rounded-full"
            alt="avatar"
            loading="lazy"
          />
          <div>
            {data.timestrap && (
              <span>
                {" "}
                Published <u>{formatDate(data.timestrap)}</u> by{" "}
              </span>
            )}
            <a href="#!" className="font-medium">
              Annonimous User
            </a>
          </div>
        </div>

        <h1 className="mb-6 text-3xl font-bold">{data.title}</h1>

        <p>{data.content}</p>
        <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
          {data.tags}
        </span>
      </section>
    </div>
  );
}
export async function getData(id: string) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const postCollection = client.db("next-app").collection("posts");
  const data = await postCollection.findOne({ _id: new ObjectId(id.trim()) });
  client.close();
  //   console.log(data);
  return data;
}
