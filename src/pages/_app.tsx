import { type AppType } from "next/dist/shared/lib/utils";
import { MobileMenuProvider } from "~/contexts/useMobileMenu";
import FontWrapper from "~/molecules/fontWrapper/FontWrapper";
import Layout from "~/molecules/layout/Layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <FontWrapper>
      <MobileMenuProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MobileMenuProvider>
    </FontWrapper>
  );
};

export default MyApp;
