import {NextResponse} from "next/server";

export async function GET(req,res) {

    try {

        let expireDuration = new Date(Date.now() - 24 * 60 * 60 * 1000);
        let cookieString = `token=" ";expires=${expireDuration.toUTCString()};path=/`;

        return NextResponse.json({status: 'success', message: 'Logout Successfull!'},{status: 200, headers:{'set-cookie': cookieString}});
    }catch (e) {
        return NextResponse.json({status: 'failed', data: e.toString()});
    }

}