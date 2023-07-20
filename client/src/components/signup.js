import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });



  const onSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3005/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/'
      } else {
        const errorData = await response.json();
        console.error('Signup error:', errorData);

      }
    } catch (error) {
      console.error('Signup error:', error);

    }
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className='max-h-screen overflow-auto'>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-lg h-[600px] w-[500px]">
          <h2 className="text-2xl text-center font-semibold mb-6">Sign Up</h2>
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
                onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block font-medium mb-6">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`w-full px-4 py-2 rounded-lg border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirm your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-4 mt-12 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
