import { type NextRequest, NextResponse } from "next/server";
import firebase from "@/libs/firebase";

export async function GET(req:NextRequest) {
    try {
        const database = firebase.database();
        const todoListRef = database.ref('todo')
        return NextResponse.json({ message: 'hello world', statusbar: false });
    } catch(error:any){
        return  NextResponse.json({ error, status: 500 })
    }
}