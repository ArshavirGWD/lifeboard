import z from "zod";

export const registerSchema = z.object({
    email : z.string().email("Invaild Email!").nonempty('Email Could Not Be Empty!'),
    password : z.string().min(6,'Password Must Has At Least 6 Chars').nonempty('Password Could Not Be Empty!'),
    confirmPass : z.string().nonempty('Please Confirm Your Passsword')
}).refine((data) => data.password === data.confirmPass , {
    path : ['confirmPass'],
    message : 'Passwords Do Not Match!'
})
export type registerInputValid = z.infer<typeof registerSchema>
export const loginSchema = z.object({
    email : z.string().email('Invalid Email!'),
    password : z.string().nonempty('Password Could Not Be Empty!')
}) 
export type loginInputValid = z.infer<typeof loginSchema>