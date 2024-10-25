import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Get theme from cookie & Set HTML class based on theme
  const theme = request.cookies.get("theme")?.value || "light";
  const html = `
    <script>
      document.documentElement.classList.${
        theme === "dark" ? "add" : "remove"
      }('dark');
    </script>
  `;
  // Inject script into response
  const responseHtml = await response.text();
  response.headers.set("Content-Type", "text/html");
  return new NextResponse(
    responseHtml.replace("</head>", `${html}</head>`),
    response
  );
}

export const config = {
  matcher: "/:path*",
};
