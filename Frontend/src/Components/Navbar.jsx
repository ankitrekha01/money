import React from 'react'
import { Navbar, Typography, Button } from "@material-tailwind/react";

const NavBar = () => {
  // const logout = async() => {

  // }
  return (
    <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 rounded-none"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Name
          </Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <Button size="sm">Logout</Button>
          </div>
        </div>
      </Navbar>
  )
}

export default NavBar;