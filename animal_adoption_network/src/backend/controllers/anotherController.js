import { NextResponse } from "next/server";

export const anotherControllers=(req,params)=>{

    console.log("Controller executed : 2 ------------------- ");

    return NextResponse.json({
        value:"Controller exectued 2 -------------------"
    })

}