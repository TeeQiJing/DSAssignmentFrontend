import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Component.css';
import { Container, Paper, Button } from '@mui/material';

import SignUpCheckbox from './SignUpCheckBox';

export default function RegisterForm() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" }
    const [name, setName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [students, setStudents] = React.useState([])

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     const student = { name, address }
    //     console.log(student)
    //     fetch("http://localhost:8080/account/add", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(student)
    //     }
    //     ).then(() => {
    //         console.log("New Student added")

    //     })


    // }

   
   
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "black" }}><u>ACCOUNT REGISTRATION</u></h1>
                <br />
                <Box
                    component="form"
                    // sx={{
                    //     '& > :not(style)': { m: 1, width: '25ch' },
                    // }}
                    noValidate
                    autoComplete="off"
                >
                    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                    {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                        value={name}
                        // onChange={(e) => setName(e.target.value)}
                    />

                    <br />
                    <br />
                    <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    
                    <br /><br /><br />
                    <Button variant="contained" fullWidth
                        // onClick={handleClick}
                    >Submit</Button>

                    <br/><br/>
                    <div className='SignUpCheckBox'><SignUpCheckbox></SignUpCheckbox></div>

                </Box>


            </Paper>
            {/* <Paper elevation={3} style={paperStyle}>
                {students.map(student=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                        Id : {student.id} <br/>
                        Name : {student.name}<br/>
                        Address : {student.address}
                    </Paper>
                ))}
            </Paper> */}
        </Container>
    );
}
