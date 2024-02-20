import FileUploader from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditPostValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const EditProfile = () => {
  //   const formSchema = z.object({
  //     username: z.string().min(2).max(50),
  //   });

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditPostValidation>>({
    resolver: zodResolver(EditPostValidation),
    defaultValues: {
      image: [],
      name: "",
      username: "",
      email: "",
      bio: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EditPostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="edit-form_container">
      <div className="w-full flex items-center justify-start">
        <img
          src="/assets/icons/edit.svg"
          alt="saved-post"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-semibold ">Edit Profile</h1>
      </div>
      {/* <div className="w-full mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div> */}
      <div className="w-full capitalize ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-9 w-full  "
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Images</FormLabel>
                  <FormControl>
                    {/* <FileUploader fieldChange={field.onChange} mediaUrl={""} /> */}
                    Image
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Location"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Coding, Entertainment, Learinig"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your Bio"
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <Button type="button" className="shad-button_dark_4 ">
                Cancel
              </Button>
              <Button
                className="shad-button_primary whitespace-nowrap "
                type="submit"
                //  disabled={updatingPost || creatingPost}
              >
                {/* {updatingPost || creatingPost ? <Loader /> : `${action} Post`} */}
                update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
