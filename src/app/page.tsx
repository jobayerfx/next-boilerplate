import Image from "next/image";

export default function Home() {
  return (
    <section className="banner">
      <div className="container">
        <div className="row">
          <div className="lg:col-6">
            <h1 className="h2 mb-8">
              {" "}
              Hi, I’m John Smith Doe. I help people make the worlds best
              software{" "}
            </h1>
          </div>
        </div>
        <div className="banner-illustration">
          <Image
            src="/images/banner/illustration.png"
            width={768}
            height={385}
            alt="Banner"
          />
        </div>
      </div>
    </section>
  );
}
