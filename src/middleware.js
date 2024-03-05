import { NextResponse } from "next/server";
import { VerifyToken } from "./utility/JWTTokenHelper";
import { redirect } from "next/navigation";

export async function middleware(req, res, next){

    try{

        // Decode JWT Token
        const token = req.cookies.get('token');
        const payload = await VerifyToken(token['value']);

        const requestHeader = new Headers(req.headers);
        requestHeader.set('email', payload['email']);
        requestHeader.set('user_id', payload['id']);

        return NextResponse.next({request: {headers: requestHeader}});
    }catch(e){
        if(req.url.startsWith("/api/")){
            return NextResponse.json({status : "fail", data : "Unauthorized"},{status : 401});
        }else {
            return NextResponse.redirect(new URL("/",req.url));
        }
    }

}

export const config= {
    matcher:[
        "/user/dashboard",
        "/api/dashboard"
    ]
}