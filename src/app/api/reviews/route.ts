import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return NextResponse.json({ error: "Reviews unavailable" }, { status: 503 });

  try {
    const response = await fetch("https://places.googleapis.com/v1/places/ChIJdxknPKEwWSERkfHqzPwURyc", {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Reviews unavailable");
    return NextResponse.json(await response.json(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Reviews unavailable" }, { status: 503 });
  }
}
