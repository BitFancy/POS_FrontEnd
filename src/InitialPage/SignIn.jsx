import React, { useState } from 'react';
import {
  LoginImage,
  Logo,
  MailIcon,
  GoogleIcon,
  FacebookIcon,
} from '../EntryFile/imagePath';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Redirect, useHistory } from 'react-router-dom';
import api from '../utils/api';

const SignInPage = (props) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const [eye, seteye] = useState(true);

  let history = useHistory();

  const onEyeClick = () => {
    seteye(!eye);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    await api
      .post('/users/login', user)
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem('token', res.data.token);
        // if (res.data.message) {
        //   alert(res.data.message);
        // }
      })
      .then(() => {
        if (window.localStorage.token) {
          history.push('/dream-pos/product/productlist-product');
        }
      }).catch((err) => {
          alert(err)
      });
  };

  //   const onSubmit = (data) => {
  //     console.log(JSON.stringify(data, null, 2));
  //     // useNavigate('/dream-pos/dashboard')
  //   };

  return (
    <>
      <div className="main-wrapper">
        <Helmet>
          <title>SignIn - Restaurant POS</title>
          <meta name="description" content="SignIn page" />
        </Helmet>
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <div>
                  <div className="login-logo">
                    <img src={Logo} alt="img" />
                  </div>
                  <div className="login-userheading">
                    <h3>Sign In</h3>
                    <h4>Please login to your account</h4>
                  </div>
                  <div className="form-login">
                    <label>Email</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        {...register('email')}
                        className={` ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email address"
                        onChange={(event) => setemail(event.target.value)}
                        required
                      />
                      <img src={MailIcon} alt="img" />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <label>Password</label>
                    <div className="pass-group">
                      <input
                        type={eye ? 'password' : 'text'}
                        className={` ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        {...register('password')}
                        onChange={(event) => setpassword(event.target.value)}
                        required
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? 'fa-eye-slash' : 'fa-eye'
                        } `}
                      />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <div className="alreadyuser">
                      <h4>
                        <Link to="/forgetPassword" className="hover-a">
                          Forgot Password?
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="form-login">
                    <button className="btn btn-login" onClick={handleSubmit}>
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="login-img">
              <img src={LoginImage} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
