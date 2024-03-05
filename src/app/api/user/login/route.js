import bcrypt from 'bcrypt';
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import { SendMail } from '@/utility/EmailUtility';

export async function POST(req,res) {

    try {

        const reqBody = await req.json();

        const prisma = new PrismaClient();

        const result = await prisma.users.findUnique({
            where : {email: reqBody['email']}
        });

        
        if(result.length === 0){
            return NextResponse.json({status: 'failed', message: 'User Unauthorized!'});
        }else{

            // Matching Password
            const passwordMatch = await bcrypt.compare(reqBody.password, result.password);

            if(passwordMatch){

                // Create OTP
                let code = Math.floor(100000 + Math.random() * 900000);
                let EmailText = `Your OTP Code is : ${code}`;
                let EmailSubject = "Your OTP Verification Code.";
                await SendMail(reqBody['email'],EmailText,EmailSubject);

                // Update OTP into DB
                await prisma.users.update({
                    where: {
                        email : reqBody['email'],
                    },
                    data: {
                        otp : code.toString(),
                    }
                });

                return NextResponse.json({status: 'success', message: 'OTP Sent Successfully! Please Check Your Email!', data: code});
            }else{
                return NextResponse.json({status: 'failed', message: 'Wrong Password!'});
            }
        }

    }catch (e) {
        return NextResponse.json({status: 'failed', data: e.toString()});
    }

}