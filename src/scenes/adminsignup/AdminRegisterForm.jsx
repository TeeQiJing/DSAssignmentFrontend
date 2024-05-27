import React, { useState } from "react";
import "./AdminRegisterForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgRename } from "react-icons/cg";

// import { useAuth } from "../../AuthProvider";

const AdminRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // const { login } = useAuth();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const goblinAccount = {
      account_type: 'Goblin',
      password: password,
      username: username,
      email: email,
    }
  
    try{
      const emailResponse = await axios.get(`http://localhost:8080/account/getByEmail/${email}`);
      if(!emailResponse.data){
        try {
          const response = await axios.post('http://localhost:8080/account/adminsignup', JSON.stringify(goblinAccount), {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
    
          alert('Account Registered Successfully! You will be Redirected to Login Page.');
          console.log(response.data); // Handle response if needed
        } catch (error) {
          alert('Account Registered Failed! This Admin Account is Already Registered, Please Login.');
        }

      }else{
        alert('Account Registered Failed! This Magical User Email is Already Registered, Please Login!');
      }

    }catch(error){
      console.error(error);
    }

    navigate("/login");

   

    // try {
    //   console.log(card);
    //   const response = await axios.post('http://localhost:8080/card/add', JSON.stringify(card), {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   console.log(response.data); // Handle response if needed
    //   console.log(fileData);
    //   const formData = new FormData();
    //   formData.append('accountNumber', accountData.accountNumber);
    //   formData.append('image_path', fileData);
  
    //   try {
    //     await axios.post('http://localhost:8080/uploadimage', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     alert('Account Registered Successfully Please Check Your Email to get the Verification Token!');


    //     try {

          
    //       var userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');

    //       const resp = await axios.get(`http://localhost:8080/account/gettoken/${accountPayload.account_number}`);
    //       const confirmationToken = resp.data.confirmationToken;
  
    //       while(userInput != confirmationToken || userInput==null){
    //         alert('Verification token Incorrect! Please Try Again!');
    //         userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');
    //       }
  
    //       if(userInput==confirmationToken){
    //         alert('Your email has been verified, and will be redirect to Login Page');
    //         const response = await axios.get(`http://localhost:8080/account/verify/${confirmationToken}`);
    //         console.log(response);
    //         navigate("/login");
            
    //       }
    //     } catch (error) {
    //       console.error("Error :", error);
    //     }

    //     // var userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');
  



    //   } catch (error) {
    //     alert('Image Upload Failed !');
    //   }


      
    // } catch (error) {
    //     alert('Card Number already exists, Please try a new one!');
    // }

    // User Avatar Upload

    

    // while(userInput == null || userInput=='') {
    //   alert('Verification token entered is Empty!');
    //   userInput = prompt('Please enter 6 characters verification tokens (Case Sensitive): ');
    // }

    

  


      
    
   

  };
  return (
    <div className="wrapper">
      <form action="" autoComplete="false" onSubmit={register}>
        <h1>Admin SignUp</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <CgRename className="icon" />

        </div>

        {/* <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div> */}

        <button type="submit" name="register">
          Register
        </button>

        <div className="login-link"></div>
        <p>
          Already have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegisterForm;
