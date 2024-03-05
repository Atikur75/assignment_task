import bcrypt from 'bcrypt';
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function POST(req,res) {

    try {

        const reqBody = await req.json();
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        reqBody.password = hashedPassword;
        reqBody.otp = "0";

        const prisma = new PrismaClient();

        const result = await prisma.users.create({
            data : reqBody
        });

        return NextResponse.json({status: 'success', message: 'Registration Completed Successfully!', data: result});
    }catch (e) {
        return NextResponse.json({status: 'failed', data: e.toString()});
    }

}