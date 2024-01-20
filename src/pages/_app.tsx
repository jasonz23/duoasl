import { UserProvider } from "@auth0/nextjs-auth0/client";
import { type AppType } from "next/dist/shared/lib/utils";
import { MobileMenuProvider } from "~/contexts/useMobileMenu";
import FontWrapper from "~/molecules/fontWrapper/FontWrapper";
import Layout from "~/molecules/layout/Layout";
import { UserProvider as ClientUserProvider } from "~/contexts/useUserContext";
import { useUser } from "@auth0/nextjs-auth0/client";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <FontWrapper>
      <UserProvider>
        <ClientUserProvider>
          <MobileMenuProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MobileMenuProvider>
        </ClientUserProvider>
      </UserProvider>
    </FontWrapper>
  );
};

export default MyApp;
