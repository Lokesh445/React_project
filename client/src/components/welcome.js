import React from 'react';

const Welcome = () => {
  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return token;
  };

  const handleLogout = () => {

    localStorage.removeItem('token');

    window.location.href = '/';
  };

  if (!getToken()) {
    console.log('No token found. Redirecting...');

    window.location.href = '/login';
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-[500px] h-[500px]">
        <h2 className="text-2xl text-center font-semibold mb-12">Welcome!</h2>
        <p className="text-center">You are now logged in. This is your welcome page.</p>
        <button
          type="button"
          className="w-full bg-red-500 text-white mt-6 py-4 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
