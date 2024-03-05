import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import { headers } from "next/headers";

export async function GET(req,res) {

    try {

        const headerList = headers();
        const user_id = parseInt(headerList.get('user_id'));

        const prisma = new PrismaClient();

        const result = await prisma.users.findMany({
            where: {
                id: user_id
            }
        });

        return NextResponse.json({status: 'success', message: 'Registration Completed Successfully!', data: result});
    }catch (e) {
        return NextResponse.json({status: 'failed', data: e.toString()});
    }

}