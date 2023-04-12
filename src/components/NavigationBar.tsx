import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '@/styles/NavigationBar.module.css'
import { useRouter } from 'next/router';

interface NavigationMenuItem {
  page: string;
  link: string;
}
const pages: Array<NavigationMenuItem> = [
  { page: 'Books', link: "book/available-books" },
  { page: 'Requests', link: "book/requests" },
  { page: 'Add Book', link: "book/list-book" },
  { page: 'About', link: "about" },
];
const settings = ['Profile', 'Logout'];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { data: session } = useSession()
  const router = useRouter()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSettingClick = (setting: string) => {
    if (setting === 'Logout') {
      signOut(); // Call the signOut function from next-auth when 'Logout' is clicked
    }
    if (setting === 'Profile') {
      router.push('/profile')
    }
    handleCloseUserMenu();
  };

  const handleCloseNavMenu = (navClicked: NavigationMenuItem) => {
    router.push('/' + navClicked.link)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StorySwap
          </Typography> */}
          <Link href="/" style={{ margin: 0, display: 'flex' }}>
            <Image src='/storySwap.png' alt="StorySwap" width={100} height={68} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((item: NavigationMenuItem) => (
                <MenuItem key={item.page} onClick={() => handleCloseNavMenu(item)}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StorySwap
          </Typography> */}
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item: NavigationMenuItem) => (
              <Button
                key={item.page}
                onClick={() => handleCloseNavMenu(item)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.page}
              </Button>
            ))}
          </Box>

          {session && session.user ?
            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings"> */}
                <div className={styles.profileButton} onClick={handleOpenUserMenu}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={session?.user?.name || 'U'} src={session.user.image || ''} />
                  </IconButton>
                  <span className={styles.profileName}>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'inline' } }}>
                      {session?.user?.name}
                    </Box>
                  </span>
                </div>
              {/* </Tooltip> */}


              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> :
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={() => signIn()}>Sign In</Button>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
