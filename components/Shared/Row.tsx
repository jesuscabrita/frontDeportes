import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grid, useMediaQuery } from "@mui/material";
import Context from "../../context/contextPrincipal";

export const Row =({homeTeam, awayTeam})=> {
    const [light] = useContext(Context);
    const [open, setOpen] = useState(false);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset',background:light ? 'rgba(0, 0, 0, 0.04)':'var(--dark3)' } }}>
            <TableCell sx={{color:light ? 'black': 'var(--cero)'}}>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{color:light ? 'black': 'var(--cero)'}}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)'}}>{homeTeam.fecha}</TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)'}}>{'10:00am'}</TableCell>
            <TableCell align="center" sx={{whiteSpace: 'nowrap', paddingRight:mobile? '90px': '0px',color:light ? 'black': 'var(--cero)'}}>{homeTeam.estadio}</TableCell>
            <TableCell sx={{color:light ? 'black': 'var(--cero)'}}>
                <Grid sx={{display:'flex',alignItems:'center',whiteSpace: 'nowrap', gap:'6px', justifyContent:'right'}}>
                    <Grid sx={{color:light ? 'black': 'var(--cero)'}}>{homeTeam.name} </Grid>
                    <img style={{height:'30px'}} src={homeTeam.logo} alt="" />
                </Grid>
            </TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)'}}>{'vs'}</TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)'}}>
                <Grid sx={{display:'flex',alignItems:'center',whiteSpace: 'nowrap', gap:'6px', justifyContent:'left'}}>
                    <img style={{height:'30px'}} src={awayTeam.logo} alt="" />
                    <Grid sx={{color:light ? 'black': 'var(--cero)'}}>{awayTeam.name} </Grid>
                </Grid>
            </TableCell>
            <TableCell align="left" sx={{whiteSpace: 'nowrap',paddingLeft:mobile? '90px': '0px',color:light ? 'black': 'var(--cero)'}}>{homeTeam.arbitro}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0,background:light ? 'var(--cero)':'var(--dark)' }} colSpan={8}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        <Typography variant="h6" gutterBottom component="div">
                            History
                        </Typography>
                        <Table size="small" aria-label="purchases"> sin datos</Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
    );
}