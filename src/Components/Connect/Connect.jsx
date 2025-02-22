import { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const sendEmail = (event) => {
    event.preventDefault();  // Prevent form from reloading the page

    const userName = event.target.name.value;
    const userEmail = event.target.email.value;
    const userMessage = event.target.message.value;

    // Define recipient name
    const toName = "Deepak Maurya";

    // Send email using EmailJS
    emailjs
      .send(
        "service_5h0344g", // Replace with your actual Service ID
        "template_oviizwo", // Replace with your actual Template ID
        {
          to_name: toName,
          from_name: userName,
          email_id: userEmail,
          message: userMessage,
        },
        "hqrCcUjgV1VRMZh9H" // Replace with your actual API key
      )
      .then(
        () => {
          setStatusMessage("Email sent successfully!");
          event.target.reset(); // Reset form after successful submission
        },
        (error) => {
          setStatusMessage("Failed to send email. Please try again later.");
          console.error("EmailJS error:", error); // Log error for debugging
        }
      );
  };

  return (
    <div
      id="Contact"
      className="bg-gray-900 m-10 text-white py-12 px-6 md:px-20 flex flex-col items-center rounded-lg shadow-lg"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact</h2>
      <p className="text-center text-lg md:text-xl mb-8">
        Want to give some feedback? Looking to work together? Or just want to say hi? 
        Feel free to fill my inbox.
      </p>

      {statusMessage && (
        <div className="text-center mb-4 text-lg font-semibold">
          {statusMessage}
        </div>
      )}

      <form
        id="contact-form"
        onSubmit={sendEmail}
        className="w-full max-w-2xl flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-semibold">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="text-lg font-semibold">
            Write me out here...
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            required
            rows="5"
            className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-6 bg-blue-600 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          Mail Me
        </button>
      </form>
    </div>
  );
};

export default Contact;
