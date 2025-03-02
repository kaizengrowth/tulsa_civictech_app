import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Assignment as ProjectsIcon,
  Event as EventsIcon,
  GroupAdd as GetInvolvedIcon,
  Person as ProfileIcon,
  Edit as LetterIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    {
      text: 'Projects',
      path: '/projects',
      icon: <ProjectsIcon />,
      subItems: [
        { text: 'AI Letter Writer', path: '/projects/letter-writer', icon: <LetterIcon /> },
        { text: 'Get Involved', path: '/projects/get-involved', icon: <GetInvolvedIcon /> },
      ],
    },
    { text: 'Events', path: '/events', icon: <EventsIcon /> },
    {
      text: 'My Profile',
      path: '/profile',
      icon: <ProfileIcon />,
      subItems: [
        { text: 'Game Progress', path: '/profile', icon: <PersonIcon /> },
        { text: 'Learning Journey', path: '/profile/learning-journey', icon: <SchoolIcon /> },
      ],
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProjectsClick = () => {
    setProjectsOpen(!projectsOpen);
  };

  const isSelected = (path) => {
    if (path === '/projects') {
      return location.pathname.startsWith(path);
    }
    return location.pathname === path;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tulsa Civic Tech
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Box key={item.text}>
                  {item.subItems ? (
                    <Button
                      color="inherit"
                      onClick={handleProjectsClick}
                      sx={{
                        mx: 1,
                        backgroundColor: isSelected(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                      startIcon={item.icon}
                      endIcon={projectsOpen ? <ExpandLess /> : <ExpandMore />}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={item.path}
                      color="inherit"
                      sx={{
                        mx: 1,
                        backgroundColor: isSelected(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                      startIcon={item.icon}
                    >
                      {item.text}
                    </Button>
                  )}
                  {item.subItems && (
                    <Box
                      sx={{
                        position: 'absolute',
                        backgroundColor: 'primary.main',
                        display: projectsOpen ? 'block' : 'none',
                        zIndex: 1,
                      }}
                    >
                      {item.subItems.map((subItem) => (
                        <Button
                          key={subItem.text}
                          component={Link}
                          to={subItem.path}
                          color="inherit"
                          sx={{
                            display: 'flex',
                            width: '100%',
                            px: 2,
                            py: 1,
                            backgroundColor: location.pathname === subItem.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                          }}
                          startIcon={subItem.icon}
                        >
                          {subItem.text}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <Box key={item.text}>
              <ListItem
                button
                onClick={item.subItems ? handleProjectsClick : () => {
                  handleDrawerToggle();
                }}
                component={item.subItems ? 'div' : Link}
                to={item.subItems ? undefined : item.path}
                selected={isSelected(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: isSelected(item.path) ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    color: isSelected(item.path) ? 'primary.main' : 'inherit'
                  }}
                />
                {item.subItems && (projectsOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.subItems && (
                <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.text}
                        button
                        component={Link}
                        to={subItem.path}
                        onClick={handleDrawerToggle}
                        selected={location.pathname === subItem.path}
                        sx={{
                          pl: 4,
                          '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                            },
                          },
                        }}
                      >
                        <ListItemIcon sx={{
                          color: location.pathname === subItem.path ? 'primary.main' : 'inherit'
                        }}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.text}
                          sx={{
                            color: location.pathname === subItem.path ? 'primary.main' : 'inherit'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;