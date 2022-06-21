import { Link } from "react-router-dom";
import type { ButtonInterface } from "@/composables/interfaces";

interface NotFoundInterface {
  msg?: string;
  body?: string | ButtonInterface;
}

export default function NotFound({
  msg = "404",
  body = { title: "Go back to the homepage", href: "/" },
}: NotFoundInterface) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
      {msg.length < 9 ? (
        <h1 className="font-medium text-black-40">{msg}</h1>
      ) : (
        <h2 className="font-medium text-black-40">{msg}</h2>
      )}
      {typeof body === "string" ? (
        <p>{body}</p>
      ) : (
        <Link to={body.href}>
          <button className="rounded-8px">
            <h3 className="font-medium">{body.title}</h3>
          </button>
        </Link>
      )}
    </div>
  );
}
