import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Loader from "../../components/Loader";
// import toast from "react-hot-toast";
import { useAuthState } from "../../context/AuthContext";
import { LoaderIcon } from "react-hot-toast";

function Login() {
  const { dispatch } = useAuthState();

  const { logInFn, isLoading } = useLogin();

  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit() {
    if (phone == "" || password == "") return;

    const data = { phone, password };

    logInFn(data, {
      onSuccess: (data) => {
        const userWithToken = {
          ...data.user,
          token: data.token,
          banner: data.banner,
        };
        dispatch({ type: "createAccount", payload: userWithToken });

        localStorage.setItem("user", JSON.stringify(userWithToken));

        if (data.user) {
          setPhone("");
          setPassword("");
        }
      },
      onError: (err) => {
        throw new Error(err || "Something went wrong");
      },
    });
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Message Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center text-white px-12">
        <div>
          <img src="/logo.svg" className="h-20" />
          <p className="mt-4 text-lg text-white max-w-md backdrop-blur-sm bg-black/5 p-4 rounded-md">
            Step into the future of iGaming — where every bet is smarter, every
            win is bigger, and the experience is crafted for champions. This is
            more than a platform — it’s where passion, precision, and technology
            come together to elevate your game.
          </p>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-opacity-95 p-6 sm:p-12">
        <div className="w-full max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="relative max-w-md mx-auto mt-8 md:mt-16"
          >
            {" "}
            <div className="overflow-hidden bg-white rounded-md shadow-md pt-10">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-1">
                Welcome Back!
              </h2>
              <p className="text-center text-gray-500 mb-6">
                Login to your account
              </p>
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <div>
                  <div className="space-y-5">
                    <div>
                      <label
                        for=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Phone Number
                      </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>

                        <input
                          onChange={(e) => setPhone(e.target.value)}
                          type="phone"
                          name=""
                          id=""
                          placeholder="Enter phone number to get started"
                          className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          for=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Password{" "}
                        </label>

                        {/* <p
                        onClick={handleForgotPassword}
                        className="text-sm cursor-pointer font-medium text-[#00ff7f] transition-all duration-200 hover:text-orange-600 focus:text-orange-600 hover:underline"
                      >
                        Forgot password?
                      </p> */}
                      </div>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                          </svg>
                        </div>

                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type=""
                          name=""
                          id=""
                          placeholder="Enter your password"
                          className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                    </div>
                    {/*  */}
                    <div>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#00ff7f",
                          marginTop: "12px",
                        }}
                        className="inline-flex bg-[#00ff7f] items-center outline-none justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200  border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                      >
                        {isLoading ? <LoaderIcon /> : "Log in"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
