import Router from "next/dist/server/router";
import Head from "next/head";
import { useContext, useEffect } from "react";
import Context from "../store";
import { useRouter } from "next/router";
import { Grid, List } from "@mui/material";
import AlignItemsList from "../components/AlignItemsList";
import Link from "next/link";

export default function Home() {
  const context = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (!context.loggedIn) {
      router.replace("/login");
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Inbox page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {context.loggedIn && (
        <Grid
          container
          justifyContent={"center"}
          style={{ padding: "1rem" }}
          textAlign="center"
        >
          <Grid item xs={12} md={8}>
            <List>
              {context.messages.map((message) => {
                return (
                  <Link href={"/" + message.id} key={message.id}>
                    <a>
                      <AlignItemsList message={message} />
                    </a>
                  </Link>
                );
              })}
            </List>
          </Grid>
        </Grid>
      )}
    </>
  );
}
