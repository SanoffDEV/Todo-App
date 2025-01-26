import { DropDownMenu } from "@/_component/DropDownMenu";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/src/auth/LoginButton";
import { CreateTodo } from "@/src/ui/theme/components/CreateTodo";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);
  return (
    <div>
      {session ? (
        <div className="absolute top-5 right-7">{<DropDownMenu />}</div>
      ) : (
        <div className="absolute top-5 right-7">
          <LoginButton />
        </div>
      )}
      {session ? (
        <div className="absolute top-5 left-7">
          <CreateTodo />
        </div>
      ) : (
        <div className="">
          <h1 className="flex items-center justify-center text-center text-xl  ">
            Your Best Todo App
          </h1>
        </div>
      )}
    </div>
  );
}
