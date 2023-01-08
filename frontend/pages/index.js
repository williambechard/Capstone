import Head from "next/head";
import { Section } from "../components";

const Home = () => {
  return (
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        {/*
          PAGE CONTENT GOES HERE
        */}
      </Section>
    </>
  );
};

export default Home;
