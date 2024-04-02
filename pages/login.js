import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomLink from "@/components/CustomLink";
import { getUser, setUser } from "@/utils/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const user = getUser();
    if (data.email == user.email && data.password == user.password) {
      setUser({ ...user, loggedIn: true });
      reset();
      router.push("/");
    } else {
      toast.error("Entered details are wrong. Try again.");
    }
  };

  return (
    <main className="w-full max-w-lg mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-[32px] font-bold text-gray-800 dark:text-white">
              Login
            </h1>
            <br />
            <h3 className="text-2xl mb-2">Welcome back to ECOMMERCE</h3>
            <p>The next gen business marketplace</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <CustomInput
                  type="email"
                  name="email"
                  label="Email"
                  control={control}
                  isRequired={true}
                  error={errors.email}
                  rules={{ required: "Email is required" }}
                />
                <CustomInput
                  name="password"
                  label="Password"
                  control={control}
                  isRequired={true}
                  error={errors.password}
                  adorn={
                    <span
                      className="underline absolute top-[30%] right-0 mr-4 text-xs cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </span>
                  }
                  rules={{ required: "Password is required" }}
                  type={showPassword ? "text" : "password"}
                />
                <CustomButton>Sign in</CustomButton>
              </div>
            </form>

            <div className="text-center mt-4 ">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-x-2">
                <span>Don’t have an Account?</span>
                <CustomLink
                  className="text-black decoration-2 hover:underline font-medium
                dark:focus:outline-none dark:focus:ring-1
                dark:focus:ring-gray-600 uppercase"
                  href="/sign-up"
                >
                  Sign up
                </CustomLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
