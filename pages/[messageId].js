import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Context from "../store";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { collection, doc, getDocs, orderBy, setDoc } from "firebase/firestore";
import { db } from "./_app";

export default function Home() {
  const context = useContext(Context);
  const router = useRouter();
  const [message, setMessage] = useState(() => {
    let value;
    if (context.messages) {
      value = context.messages.find(
        (message) => message.id === router.query.messageId
      );
    }
    return value;
  });

  const fetch = async () => {
    const querySnapshot = await getDocs(
      collection(db, "dummyInbox"),
      orderBy("date", "desc")
    );
    const messagesTemp = [],
      unreadTemp = 0;
    querySnapshot.forEach((doc) => {
      messagesTemp.push({ id: doc.id, ...doc.data() });
      if (!doc.data().isRead) unreadTemp++;
    });
    context.setMessages(messagesTemp);
    context.setUnread(unreadTemp);
  };

  const update = async () => {
    await setDoc(doc(db, "dummyInbox", router.query.messageId), {
      ...message,
      isRead: true,
    });

    fetch();
  };

  useEffect(() => {
    if (!context.loggedIn) {
      router.replace("/login");
      return;
    }
  }, []);

  useEffect(() => {
    if (message) {
      if (!message.isRead) {
        update();
      }
    }
  }, [message]);

  return (
    <>
      <Head>
        <title>View Message</title>
        <meta name="description" content="Single message page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {context.loggedIn && message && (
        <Grid
          container
          justifyContent={"center"}
          style={{ padding: "1rem" }}
          // textAlign="center"
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              border: "1px solid #1976d2",
              borderRadius: "10px",
              padding: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h5">{message.subject}</Typography>
            <Typography variant="subtitle1" textAlign={"left"}>
              {message.content}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Link href={"/inbox"}>
              <Button variant="contained" fullWidth>
                Back
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
}
