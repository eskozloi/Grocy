import { Link } from "react-router-dom";
import type { ButtonInterface, HeaderInterface } from "@/composables/interfaces";

interface NotFoundInterface {
  msg?: string;
  body?: string | ButtonInterface;
}

export default function NotFound({
  msg = "404",
  body = { title: "Go back to the homepage", href: "/" },
}: NotFoundInterface) {
  return (
    <div className="w-full h-full">
      <div className="parrentCenter flex flex-col justify-center items-center">
        {msg.length < 9 ? (
          <h1 className="font-medium text-black-40">{msg}</h1>
        ) : (
          <h2 className="font-medium text-black-40">{msg}</h2>
        )}
        {typeof body === "string" ? (
          <p>{body}</p>
        ) : (
          <Link to="body.href">
            <button>
              <h3 className="font-medium">{body.title}</h3>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
