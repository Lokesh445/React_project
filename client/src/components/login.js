import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });



  const onSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/welcome'
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('Unexpected error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-[500px] h-[600px]">
        <h2 className="text-2xl text-center font-semibold mb-12">Login</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-6">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-2 rounded-lg border ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-6">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full px-4 py-2 rounded-lg border ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-16 py-4 rounded-lg hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
