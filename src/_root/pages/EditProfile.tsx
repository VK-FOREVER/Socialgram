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
import { toast } from "@/components/ui/use-toast";
import {
  useGetCurrentUser,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { EditPostValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ID } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const EditProfile = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: updateUser,
    isPending: updatingUser,
    isError,
  } = useUpdateUser();

  const { data: currentUser, isFetching: loading } = useGetCurrentUser();
  const form = useForm<z.infer<typeof EditPostValidation>>({
    resolver: zodResolver(EditPostValidation),
    defaultValues: {
      image: currentUser ? currentUser?.imageUrl : [],
      name: currentUser ? currentUser?.name : "",
      username: currentUser ? currentUser?.username : "",
      email: currentUser ? currentUser?.email : "",
      bio: "",
    },
  });

  console.log(currentUser);

  // ITypeUser
  // export type IUpdateUser = {
  //   userId: string;
  //   name: string;
  //   bio: string;
  //   imageId: string;
  //   imageUrl: URL | string;
  //   file: File[];
  // };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditPostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // update user

    // userId: string;
    // name: string;
    // bio: string;
    // imageId: string;
    // imageUrl: URL | string;
    // file: File[];

    const updatedPost = await updateUser({
      ...values,
      bio: values.bio,
      userId: currentUser?.$id,
      imageId: ID.unique(),
      imageUrl: values.image[0].
    });

    // if (!updatedPost) {
    //   toast({
    //     title: "Can't update the Post",
    //     description: "please try again...",
    //   });
    // }

    // return navigate(`/profile/${currentUser?.$id}`);

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
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser?.imageUrl}
                      rounded={true}
                    />
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
