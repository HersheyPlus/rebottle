import { FaSadCry } from "react-icons/fa";
const ErrorPage = () => {
  return (
    <section id="error" className="section-container h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-5xl space-y-12 font-bold">
          <h1>! Oops, Something went wrong,</h1>
          <h1 className="text-center">Please Try again.</h1>
          <FaSadCry className="mt-4" size={124} />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
