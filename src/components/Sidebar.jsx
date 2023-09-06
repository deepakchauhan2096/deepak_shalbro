import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME, active}) => {
  const drawerWidth = 250;
  return (
    <div>

<Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <Link
            to={`/company/projects/${COMPANY_ID}&${COMPANY_USERNAME}&${COMPANY_PARENT_ID}&${COMPANY_PARENT_USERNAME}`}
            className="nav-link"
            style={{ background: active == 1 ? "#f3f3f3" : ""}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"My Projects"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to={`/company/employees/${COMPANY_ID}&${COMPANY_USERNAME}&${COMPANY_PARENT_ID}&${COMPANY_PARENT_USERNAME}`}
            className="nav-link"
            style={{ background: active == 2 ? "#f3f3f3" : ""}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"My Employees"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to={`/company/attendance/${COMPANY_ID}&${COMPANY_USERNAME}&${COMPANY_PARENT_ID}&${COMPANY_PARENT_USERNAME}`}
            className="nav-link"
            style={{ background: active == 3 ? "#f3f3f3" : ""}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"Attendance"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to={`/company/documents/${COMPANY_ID}&${COMPANY_USERNAME}&${COMPANY_PARENT_ID}&${COMPANY_PARENT_USERNAME}`}
            className="nav-link"
            style={{ background: active == 4 ? "#f3f3f3" : ""}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"Documents"} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>

    </div>
  )
}

export default Sidebar