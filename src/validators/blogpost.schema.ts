import { array, number, object, string } from "zod";

export const createBlogpostSchema = object({
  title: string().min(1),
  description: string().min(1),
  post: string().min(1),
  publishDate: string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return (
        !isNaN(parsedDate.getTime()) &&
        parsedDate.getTime() >= new Date().getTime()
      );
    },
    {
      message:
        "publishDate must be a valid DateTime and equal or larger than now",
    },
  ),
  productIds: array(number()).optional(),
  collectionIds: array(number()).optional(),
});

export const updateGeneralPostInfoschema = object({
  title: string().nonempty(),
  description: string().nonempty(),
  productIds: array(number()).optional(),
  collectionIds: array(number()).optional(),
  publishDate: string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return (
        !isNaN(parsedDate.getTime()) &&
        parsedDate.getTime() >= new Date().getTime()
      );
    },
    {
      message:
        "publishDate must be a valid DateTime and equal or larger than now",
    },
  ),
});

export const updatPostSchema = object({
  post: string().nonempty(),
});
