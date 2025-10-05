import { ENV } from "@/contans/env";
import { createServerClient, CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = ENV.SUPABASE_URL;
const supabaseKey = ENV.SUPABASE_ANON_KEY;
export const createClient = (request) => {
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers
        }
    });

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() { return request.cookies.getAll },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))

                    supabaseResponse = NextResponse.next({ request, })

                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                }
            }
        }
    )
      return supabaseResponse

}