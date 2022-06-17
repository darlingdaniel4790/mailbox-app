import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Context from "../store";
import { useRouter } from "next/router";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "./_app";

const dummyInbox = [
  {
    subject: "Go Time",
    content: "It's time to go. Get Ready",
    isRead: false,
  },
  {
    subject: "Ready",
    content: "Get ready, mom's coming over",
    isRead: false,
  },
  {
    subject: "Awake",
    content: "Wanted to talk about something. You awake?",
    isRead: false,
  },
  {
    subject: "Play",
    content:
      "Wanna play some quick games before bed. Power up the playstation!",
    isRead: false,
  },
  {
    subject: "Annie",
    content: "Annie needs some help. Give her a call immediately.",
    isRead: false,
  },
  {
    subject: "Project",
    content: "What's the progress on the project? Do you need my help?",
    isRead: false,
  },
  {
    subject: "Shopping",
    content: "We're going shopping at noon. I'll pick you up.",
    isRead: false,
  },
  {
    subject: "Jessie",
    content: "Jessie's video is trending on TikTok. Have you seen it?",
    isRead: false,
  },
  {
    subject: "Trailer",
    content:
      "Did you see the new Doctor Strange trailer. You've gotta check it out.",
    isRead: false,
  },
  {
    subject: "My Jam",
    content: "Yo, check out this link, it's my favorite jam right now.",
    isRead: false,
  },
];

export default function Home() {
  const context = useContext(Context);
  const router = useRouter();

  const upload = () => {
    dummyInbox.forEach((message) => {
      addDoc(collection(db, "dummyInbox"), {
        ...message,
        date: Timestamp.fromDate(new Date()),
      });
    });
  };

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

  useEffect(() => {
    if (!context.loggedIn) {
      router.replace("/login");
      return;
    }
    fetch();
  }, []);

  // console.log(context.user);
  return (
    <>
      <Head>
        <title>Mailbox App</title>
        <meta name="description" content="A quick mailbox app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {context.loggedIn && (
        <Grid
          container
          justifyContent={"center"}
          style={{ padding: "1rem" }}
          textAlign="center"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <Typography variant="h3">Hello</Typography>
            <Typography variant="body1">{context.user.email}</Typography>
            {context.messages && context.unread !== undefined ? (
              <Typography variant="h4">
                You have{" "}
                <span style={{ color: "#ff5722" }}>{context.unread}</span> new
                messages in your mailbox, out of a total of{" "}
                <span style={{ color: "#1976d2" }}>
                  {context.messages.length}
                </span>
                .
                <br />
              </Typography>
            ) : (
              <Skeleton />
            )}
          </Grid>
          <Grid item md={8}>
            <Button variant="contained" onClick={() => router.push("/inbox")}>
              View Messages
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
