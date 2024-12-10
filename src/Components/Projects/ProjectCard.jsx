/* eslint-disable react/prop-types */
export const ProjectCard = ({ title, main, image, demoLink, srcCode }) => {
  return (
    <div className="p-6 flex flex-col items-center bg-[#0c0e19] shadow-xl shadow-slate-900 rounded-2xl w-80">
      {/* Image */}
      <img
        className="w-60 h-40 object-cover rounded-md"
        src={image}
        alt={title}
      />

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold leading-normal text-center mt-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-md leading-tight text-center py-4">
        {main}
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Demo Button */}
        <a href={demoLink} target="_blank" rel="noopener noreferrer">
          <button
            type="button"
            className="text-white py-2 px-6 text-md font-semibold rounded-3xl bg-[#465697] hover:opacity-85 hover:scale-105 duration-300"
          >
            Demo
          </button>
        </a>

        {/* Source Code Button */}
        <button
          type="button"
          onClick={() => window.open(srcCode, "_blank")}
          className="text-white py-2 px-6 text-md font-semibold rounded-3xl bg-[#465697] hover:opacity-85 hover:scale-105 duration-300"
        >
          Source Code
        </button>
      </div>
    </div>
  );
};
