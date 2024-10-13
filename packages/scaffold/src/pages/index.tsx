import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/landing",
      permanent: false,
    },
  };
};

const Page = () => {
  return null;
};

export default Page;
