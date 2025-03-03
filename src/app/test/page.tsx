import React from "react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">
          Welcome to EduTrack
        </h1>
        <p className="text-xl mb-8">
          Your all-in-one solution to manage student information and track
          attendance effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
          <p className="mb-4">
            Easily add, update, and view student information. Keep all your
            student records in one place.
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
            Add Student
          </button>
        </div>

        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Track Attendance</h2>
          <p className="mb-4">
            Quickly mark attendance and generate reports to keep track of
            student participation.
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
            View Attendance
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">Ready to get started?</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
