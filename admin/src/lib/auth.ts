const SECRET = process.env.AUTH_SECRET || "krt_729c577856ac76dcaf54d98c916d93ee2db85e1940c4221cc0";

export const ADMIN_EMAIL = "kritideveloper@gmail.com";
export const ADMIN_PASSWORD = "Create_innovate1";
export const AUTH_COOKIE_NAME = "kriti_admin_session";

export async function createSessionToken(email: string): Promise<string> {
  const payload = JSON.stringify({ email, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 });
  const encodedPayload = btoa(payload);
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(encodedPayload));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
    
  return `${encodedPayload}.${signatureHex}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const [encodedPayload, signatureHex] = token.split(".");
    if (!encodedPayload || !signatureHex) return false;
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    const matched = signatureHex.match(/.{1,2}/g);
    if (!matched) return false;
    
    const signatureBytes = new Uint8Array(matched.map((byte) => parseInt(byte, 16)));
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, encoder.encode(encodedPayload));
    
    if (!isValid) return false;
    
    const data = JSON.parse(atob(encodedPayload));
    if (data.exp < Date.now()) return false;
    
    return data.email === ADMIN_EMAIL;
  } catch {
    return false;
  }
}
