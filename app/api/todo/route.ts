import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/libs/firebase";
import { get, ref, push } from "firebase/database";
import { uuid } from "@/libs/uuid";
import { z } from "zod";


/***
 * Note this controller no prepare architecture by have 
 * domain or subdomain base on busseniss required. 
 * by create simple controller api
 * 
 */
export async function GET(req: Request, res: Response) {
  try {
    const docRef = ref(db, "tasks");
    const docSnap = await get(docRef);

    return NextResponse.json({ tasks: docSnap.val() });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error }.error, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const schema = z.object({
      todo: z.string().min(1),
    });

    const res = await request.json();
    const response = schema.safeParse(res);

    if (!response.success) {
      const { errors } = response.error;
      return NextResponse.json({ message: "Invalid request", errors }.errors, {
        status: 500,
      });
    }

    push(ref(db, "/tasks"), {
      id: uuid(),
      todo: res.todo,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Action completed successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error }.error, {
      status: 500,
    });
  }
}
