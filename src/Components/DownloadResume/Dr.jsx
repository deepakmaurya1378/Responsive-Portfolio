
const DownloadResume = () => {
  return (
    <section id="DownloadResume" className=" text-white py-16 px-6 md:px-20">
      <div className=" text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Download My Resume</h2>
        <p className="text-lg mb-8">
          Click the button below to download my most up-to-date resume.
        </p>
        <a
          href="https://drive.google.com/file/d/19CSsXuk3fGntAj7lMKjnIhUVKPZfs87w/view?usp=sharing" // path to your resume file
          download="Deepak_Maurya_Resume" // optional custom name for the downloaded file
          className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default DownloadResume;
