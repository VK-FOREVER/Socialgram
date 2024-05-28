import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "../ui/textarea";
import { Models } from "appwrite";
import { PostValidation } from "@/lib/validation";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";
import FileUploader from "../shared/FileUploader";
// import { useState } from "react";

// PostFrom type
type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  // Queries and mutations
  const { mutateAsync: createPost, isPending: creatingPost } = useCreatePost();
  const { mutateAsync: updatePost, isPending: updatingPost } = useUpdatePost();

  // Diffining Form
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tag: post ? post.tag.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      console.log(values);

      // Update Posts
      const updatedPost = await updatePost({
        ...values,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: "Can't update the Post",
          description: "please try again...",
        });
      }
      return navigate(`/posts/${post.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Unable to submit form, Please try again.",
      });
    }
    navigate("/");

    console.log(values);
  }

  const cancleForm = () => {
    form.reset();
    navigate(-1);
  };

  // console.log(fileUrl);

  return (
    <div className="w-full capitalize">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl "
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Caption</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Post Caption"
                    className="shad-textarea custom-scrollbar"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Image</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Location</FormLabel>
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
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Add Tags (separated by comma " , ")
                </FormLabel>
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
          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              className="shad-button_dark_4 "
              onClick={cancleForm}
            >
              Cancel
            </Button>
            <Button
              className="shad-button_primary whitespace-nowrap "
              type="submit"
              disabled={updatingPost || creatingPost}
            >
              {updatingPost || creatingPost ? (
                <Loader showTxt={false} />
              ) : (
                `${action} Post`
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
