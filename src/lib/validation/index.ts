import * as z  from "zod";

 export const SignUpValidation = z.object({
     name : z.string().min(2, {message: "Too Short!"}),
     username: z.string().min(2, {message: "Too Short"}),
     email: z.string().email(),
     password: z.string().min(8, {message: "Too Short"}).max(12, {message: "Password must be under 8 to 12 characters"})
   });
 