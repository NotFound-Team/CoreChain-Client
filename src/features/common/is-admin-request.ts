import { jwtVerify, importPKCS8, JWTPayload } from "jose";
import { NextRequest } from "next/server";

interface JWTPayloadToken extends JWTPayload {
  _id?: string;
  role?: {
    _id: string;
    name: string;
  };
  email?: string;
  name?: string;
}

// const privateKeyPem = process.env.JWT_ACCESS_TOKEN_SECRET!;

// const privateKey = await importPKCS8(privateKeyPem, "RS256");
const secret = new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET!);

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function isAdminRequest(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return false;

  const token = auth.split(" ")[1];

  try {
    const payload: JWTPayloadToken = await verifyToken(token);

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) return false;

    if (payload.role?.name !== "ADMIN") return false;

    return true;
  } catch (e) {
    return false;
  }
}
