// import { createSafeActionClient } from "next-safe-action";
// import { getServerSession } from "next-auth";
// import { authConfig } from "../../pages/api/auth/[...nextauth]";

// export class ActionError extends Error {
//   // constructor(message) {
//   //   super(message);
//   //   this.name = "ActionError";
//   // }
// }

// const handleReturnedServerError = () => {
//   // if (error instanceof ActionError) {
//   //   return error.message;
//   // }
//   // return "An unexpected error occurred";
// };

// export const action = createSafeActionClient({
//   // handleReturnedServerError: handleReturnedServerError,
// });

// export const userAction = createSafeActionClient({
//   // handleReturnedServerError: handleReturnedServerError,
//   // middleware: async () => {
//   //   const user = await getServerSession(authConfig);
//   //   if (!user) {
//   //     throw new ActionError("You must be logged in");
//   //   }
//   //   return { user };
//   // },
// });
