import { Result } from "antd";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Custom404() {
  return (
    <h1>
      <Layout title="404">
        <div className="border-black border-l border-r w-full max-w-screen-md	">
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4   rounded ">
                <Link href="/">
                  <a>Back Home</a>
                </Link>
              </button>
            }
          />
        </div>
      </Layout>
    </h1>
  );
}
