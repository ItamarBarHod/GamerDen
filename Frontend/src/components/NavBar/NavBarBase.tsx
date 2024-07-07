import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Grid } from "@mui/material";

import React from 'react';

type NavBarBaseProps = {
    links: {
        to: string;
        icon: React.ReactNode;
        label: string;
        onClick?: () => void
    }[];
}

const NavBarBase: React.FC<NavBarBaseProps> = ({ links }) => {
    return (
        <AppBar color="secondary" position="sticky">
            <Toolbar>
                <IconButton
                    sx={{
                        '&:hover': {
                            borderRadius: '15%',
                        },
                    }}
                >
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        <Link to="/">GamerDen</Link>
                    </Typography>
                </IconButton >
                <Grid style={{ flexGrow: 1 }} />
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.to}
                        onClick={link.onClick}
                    >
                        <IconButton
                            sx={{
                                color: 'text.primary',
                                '&:hover': {
                                    borderRadius: '15%',
                                },
                            }}>
                            {link.icon}
                            <Typography color="text.primary" sx={{ ml: 1, fontWeight: 'bold' }}>
                                {link.label}
                            </Typography>
                        </IconButton>
                    </Link>
                ))}
            </Toolbar>
        </AppBar>
    );
};

export default NavBarBase;
