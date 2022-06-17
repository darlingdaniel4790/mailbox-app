import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import Context from "../store";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import { Badge } from "@mui/material";

// const pages = ["Inbox"];
// const settings = ["Login"];

const ResponsiveAppBar = () => {
  const context = React.useContext(Context);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();
  const [sideOpen, setSideOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setSideOpen(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const { loggedIn } = context;
  React.useEffect(() => {
    setAnchorElUser();

    return () => {};
  }, [loggedIn]);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setSideOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={"/"}>
            <a>
              <HomeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            </a>
          </Link>
          <Link href={"/"}>
            <a>
              <Typography
                variant="h6"
                noWrap
                //   component="a"
                // href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: router.route == "/" ? "cyan" : "inherit",
                  textDecoration: "none",
                }}
              >
                HOME
              </Typography>
            </a>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {!sideOpen ? (
                <Badge
                  badgeContent={context.unread && context.unread}
                  color="error"
                >
                  <MenuIcon />
                </Badge>
              ) : (
                <MenuIcon />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href="/inbox">
                <a
                  onClick={() => handleCloseNavMenu()}
                  style={{
                    color: router.route === "/inbox" ? "cyan" : "inherit",
                  }}
                >
                  <MenuItem>
                    <Badge
                      badgeContent={context.unread && context.unread}
                      color="error"
                    >
                      <Typography textAlign="center">Inbox</Typography>
                    </Badge>
                  </MenuItem>
                </a>
              </Link>
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Link href={"/"}>
              <a>
                <HomeIcon />
              </a>
            </Link>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: router.route === "/" ? "cyan" : "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                // href=""
              >
                HOME
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/inbox">
              <a
                onClick={() => handleCloseNavMenu("Inbox")}
                style={{
                  my: 2,
                  color: router.route === "/inbox" ? "cyan" : "inherit",
                  display: "block",
                }}
              >
                <MenuItem>
                  <Badge
                    badgeContent={context.unread && context.unread}
                    color="error"
                  >
                    <Typography textAlign="center">Inbox</Typography>
                  </Badge>
                </MenuItem>
              </a>
            </Link>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                
              >
                {page}
              </Button>
            ))} */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "white" }}>
                <PersonIcon fontSize="large" style={{ color: "#1976d2" }} />
              </Avatar>
            </IconButton>
            {context.loggedIn && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem style={{ color: "#1976d2", cursor: "default" }}>
                  {context.user.email}
                </MenuItem>
                <Link href={"/login"}>
                  <a>
                    <MenuItem
                      onClick={() => {
                        context.setLoggedIn(false);
                        context.setUser();
                        context.setMessages();
                        context.setUnread();
                        handleCloseUserMenu;
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </a>
                </Link>
                {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
