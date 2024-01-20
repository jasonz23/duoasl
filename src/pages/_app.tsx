import { type AppType } from "next/dist/shared/lib/utils";
import { MobileMenuProvider } from "~/contexts/useMobileMenu";
import Layout from "~/molecules/layout/Layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MobileMenuProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MobileMenuProvider>
  );
};

export default MyApp;
