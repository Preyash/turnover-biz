import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomLink from "@/components/CustomLink";
import { getUser, setUser } from "@/utils/auth";
import { fakedata, generateOTP } from "@/utils/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [otp] = useState(generateOTP());
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const emailHandler = async (data, otp) => {
    fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: data?.email,
        subject: "Sign up successful",
        body: `Your otp is ${otp}`,
      }),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          toast.success("Sign up successful. Check your email.");
          setUser(data);
          setNext(true);
          reset();
        } else {
          throw new Error("Failed to send email");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const onSubmit = (data) => {
    if (next) {
      const enteredOTP = Object.values(data).join("");
      if (otp == enteredOTP) {
        const user = getUser();
        toast.success("Verification done. Login to Continue.");
        setUser({ ...user, interests: fakedata });
        reset();
        router.push("/login");
      } else {
        toast.error("Entered otp is wrong. Try again.");
      }
    } else {
      setLoading(true);
      emailHandler(data, otp);
    }
  };

  return (
    <main className="w-full max-w-lg mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {next ? (
          <div className="p-4 sm:p-7 relative">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Verify your email
              </h1>
              <p>
                Enter the 8 digit code you have received on anu***@gmail.com
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-6">
                  <div className="flex justify-center gap-4">
                    {[...Array(4)].map((_, index) => (
                      <CustomInput
                        pin
                        key={index}
                        name={`pin${index + 1}`}
                        control={control}
                        required
                      />
                    ))}
                  </div>
                  <CustomButton>verify</CustomButton>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Create your account
              </h1>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-6">
                  <CustomInput
                    name="name"
                    label="Name"
                    control={control}
                    isRequired={true}
                    error={errors.name}
                    rules={{ required: "Name is required" }}
                  />
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
                    type="password"
                    name="password"
                    label="Password"
                    control={control}
                    isRequired={true}
                    error={errors.password}
                    rules={{ required: "Password is required" }}
                  />
                  <CustomButton loading={loading}>Create account</CustomButton>
                </div>
              </form>
              <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 flex justify-center gap-2">
                Have an Account?
                <CustomLink
                  className="text-black decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 uppercase"
                  href="/login"
                >
                  Login
                </CustomLink>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
