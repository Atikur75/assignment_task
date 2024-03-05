import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import { CreateToken } from "@/utility/JWTTokenHelper";


export async function POST(req,res) {

    try {

        const reqBody = await req.json();
        const {email, otp} = reqBody;

        const prisma = new PrismaClient();

        const result = await prisma.users.findUnique({
            where : {
                email : email
            }
        });

        if(result.length === 0){
            return NextResponse.json({status: 'failed', message: 'User Unauthorized!'});
        }else{

            // Matching OTP
            if(result['otp'] === otp){

                // Create JWT Token 
                let token = await CreateToken(result["email"], result["id"]);
                let expireDuration = new Date(Date.now()+24*60*60*1000);
                const cookieString = `token=${token};expires=${expireDuration.toUTCString()};path=/`;

                // Update OTP
                await prisma.users.update({
                    where: {
                        email : reqBody['email'],
                    },
                    data: {
                        otp : "0",
                    }
                });

                return NextResponse.json({status: 'success', message: 'Login Successfull!', data: token},{status: 200, headers:{'set-cookie':cookieString}});
            }else{
                return NextResponse.json({status: 'failed', message: 'Wrong OTP!'});
            }

        }
        

    }catch (e) {
        return NextResponse.json({status: 'failed', data: e.toString()});
    }

}