import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

// SignUp function
const SignUp = () => {
  // Variables
  const { toast } = useToast();
  const naviagte = useNavigate();
  ``;

  // Queries
  const { mutateAsync: createUserAccount, isPending: creatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: signingIn } =
    useSignInAccount();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  // 1. Defining the form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  //  Defining a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    try {
      // Having error 400
      const newUser = await createUserAccount(values);
      // console.log(newUser);

      if (!newUser) {
        return toast({
          title: "Sign up error.",
          description: "Please Sign up again.",
        });
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast({ title: "Sign in failed. Please try again." });
        naviagte("/sign-in");
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        naviagte("/");
      } else {
        return toast({ title: "Sign up failed, Please try again." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col ">
          <div className="flex flex-1 items-center justify-center flex-col w-full pt-4">
            <img src="/assets/images/logo.svg" alt="Social Gram" />
            <h2 className="h3-bold md:h2-bold pt-6 md:pt-4">
              Create an account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-4 ">
              Please enter your details to join SocialGram
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium" />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {creatingUser ? <Loader /> : "Signup"}
            </Button>
            <p className="text-small-regular text-light-2 text-center">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
