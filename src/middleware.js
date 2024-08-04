import { NextResponse } from "next/server";

const middleware = (request) => {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export default middleware;
