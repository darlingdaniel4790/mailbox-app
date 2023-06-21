import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useContext, useState } from "react";
import Context from "../store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./_app";
import { Router, useRouter } from "next/router";

export default function Home() {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState();
  const route = useRouter();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        context.setLoggedIn(true);
        context.setUser(userCredential.user);
        route.replace("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        context.setLoggedIn(true);
        context.setUser(userCredential.user);
        route.replace("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        // direction="column"
        style={{ height: "80vh" }}
        alignContent="center"
        justifyContent={"center"}
      >
        <Grid item xs={9} sm={6} md={4}>
          <Grid mb={5} mt={5}>
            <Typography gutterBottom variant="h3">
              Welcome to PorterMail
            </Typography>
            <Typography variant="h5" paragraph>
              Please enter your login details.
            </Typography>
            <Typography variant="h5">
              <span style={{ fontWeight: "bold" }}>New user?</span> Click the
              switch below to signup. It only takes a second.
            </Typography>
          </Grid>
          <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type={"email"}
              //   value={values.password}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton
              //       aria-label="toggle password visibility"
              //       onClick={handleClickShowPassword}
              //       onMouseDown={handleMouseDownPassword}
              //       edge="end"
              //     >
              //       {values.showPassword ? <VisibilityOff /> : <Visibility />}
              //     </IconButton>
              //   </InputAdornment>
              // }
              label="Email"
            />
          </FormControl>
          {/* </Grid> */}
          {/* <Grid item> */}
          <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={"password"}
              //   value={values.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton
              //       aria-label="toggle password visibility"
              //       onClick={handleClickShowPassword}
              //       onMouseDown={handleMouseDownPassword}
              //       edge="end"
              //     >
              //       {values.showPassword ? <VisibilityOff /> : <Visibility />}
              //     </IconButton>
              //   </InputAdornment>
              // }
              label="Password"
            />
          </FormControl>
          {/* </Grid> */}
          {/* <Grid item> */}
          <FormControl sx={{ m: 1 }} fullWidth>
            <Button
              variant="contained"
              onClick={checked ? handleSignup : handleLogin}
            >
              {checked ? "Signup" : "Login"}
            </Button>
          </FormControl>
          {/* </Grid> */}
          {error && (
            // <Grid item>
            <Alert severity="error">{error.message}</Alert>
            // </Grid>
          )}
          {/* <Grid item> */}
          <Grid container justifyContent={"center"}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Login</Typography>
              <Switch
                checked={checked}
                onChange={() => setChecked((prev) => !prev)}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography>Signup</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
