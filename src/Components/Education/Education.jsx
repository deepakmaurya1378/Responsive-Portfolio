const Education = () => {
  return (
    <section
      id="Education"
      className="bg-gray-900 m-20 text-white py-16 px-6 md:px-20 rounded-lg shadow-xl"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Education
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {/* High School */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-xl  gap-5 md:text-2xl font-bold mb-2 ">
              High School
            </h3>
            <p className="text-sm md:text-base">
              <strong>School:</strong> L.S.M Inter College, Lucknow
            </p>
            <p className="text-sm md:text-base">
              <strong>Year of Completion:</strong> 2017
            </p>
            <p className="text-sm md:text-base">
              <strong>Percentage:</strong> 72.67%
            </p>
          </div>

          {/* Intermediate */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-xl gap-5  md:text-2xl font-bold mb-2">
              Intermediate
            </h3>
            <p className="text-sm md:text-base">
              <strong>School:</strong> Indian Public Inter College, Lucknow
            </p>
            <p className="text-sm md:text-base">
              <strong>Year of Completion:</strong> 2019
            </p>
            <p className="text-sm md:text-base">
              <strong>Percentage:</strong> 72.20%
            </p>
          </div>

          {/* College */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-xl gap-5 md:text-2xl font-bold mb-2">
              College
            </h3>
            <p className="text-sm  md:text-base">
              <strong>College:</strong> Noida Institute Of Engineering & Technology
            </p>
            <p className="text-sm md:text-base">
              <strong>Year of Completion:</strong> 2024
            </p>
            <p className="text-sm md:text-base">
              <strong>CGPA:</strong> 7.01
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
