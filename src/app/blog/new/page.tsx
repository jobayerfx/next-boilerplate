"use client";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import useDidMountEffect from "@/utils/useDidMountEffect";

export default function NewBlog() {
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTag] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  //   useEffect(() => {
  //     if (sessionStatus === "authenticated") {
  //       router.replace("/");
  //     }
  //   }, [sessionStatus, router]);

  useEffect(() => {
    validateForm();
  }, [title, category, content, tags]);

  const validateForm = () => {
    let errors: Object = {};

    if (!title) {
      errors.title = "Title is required.";
    }
    if (!category) {
      errors.category = "Blog Category is required.";
    }
    if (!content) {
      errors.content = "Content is required.";
    }
    if (!tags) {
      errors.tags = "Tags is required.";
    }
    // console.log(errors);
    setError(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("object");
    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          content,
          tags,
        }),
      });
      if (res.status === 400) {
        setError({ general: "Something went wrong!" });
      }
      if (res.status === 200) {
        setError({});
        router.push("/");
      }
    } catch (error) {
      setError({ general: "Something went wrong!" });
      console.log(error);
    }
  };

  //   if (sessionStatus === "loading") {
  //     return <h1>Loading...</h1>;
  //   }

  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32 text-center">
        <div className="mx-auto max-w-[700px] md:px-3">
          <h2 className="mb-12 text-3xl font-bold">Create a new blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
              >
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {error.title && (
                <p
                  id="outlined_error_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400 text-left"
                >
                  <span className="font-medium">Oh, Error! {error.title}</span>
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-left"
              >
                Blog Category
              </label>
              <input
                type="text"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Blog Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {error.category && (
                <p
                  id="outlined_error_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400 text-left"
                >
                  <span className="font-medium">
                    Oh, Error! {error.category}
                  </span>
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
              >
                Message
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="content"
                rows={3}
                placeholder="Your blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {error.content && (
                <p
                  id="outlined_error_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400 text-left"
                >
                  <span className="font-medium">
                    Oh, Error! {error.content}
                  </span>
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
              >
                Blog Tags
              </label>
              <input
                type="text"
                id="tags"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Blog tags"
                value={tags}
                onChange={(e) => setTag(e.target.value)}
              />
              {error.tags && (
                <p
                  id="outlined_error_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400 text-left"
                >
                  <span className="font-medium">Oh, Error! {error.tags}</span>
                </p>
              )}
            </div>
            <button
              type="submit"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mb-6 inline-block w-full rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
