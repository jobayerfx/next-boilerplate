import { getSession, useSession } from "next-auth";

function Blog({ data: any }) {
  const [session] = useSession();
  console.log({ session });

  return <h1>Blog page - {data}</h1>;
}

export default Blog;

export async function getData(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blog",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "List of 100 personalized blogs",
      session,
    },
  };
}
