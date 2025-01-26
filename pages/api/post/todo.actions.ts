// import { todoSchema } from "./todo.shema";
// import { prisma } from "@/src/lib/prisma";

// export const createTodoAction = async (input: any, userId: string) => {
//   // Validate input against the schema
//   const parsedInput = todoSchema.parse(input);

//   // Assurez-vous que le userId est fourni
//   if (!userId) {
//     throw new Error("User ID is required to create a Todo.");
//   }

//   // Créer le Todo dans la base de données
//   const todo = await prisma.todo.create({
//     data: {
//       ...parsedInput,
//       userId, // Associer le Todo à l'utilisateur connecté
//     },
//   });

//   return todo;
// };
