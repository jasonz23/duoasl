import Head from "next/head";
import Link from "next/link";
import LoginPage from "~/organisms/loginPage/LoginPage";
import MainPage from "~/organisms/mainPage/MainPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Duoasl</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginPage />
    </>
  );
}