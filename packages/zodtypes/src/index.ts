import { z } from "zod";

export const createItemInput = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).nonnegative({
        message: "Price must be non-negative"
    }).finite({
        message: "Price must be finite"
    })
})

export type createItemInputType = z.infer<typeof createItemInput>;