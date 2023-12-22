
import { db } from "@/libs/firebase";
import { ref, remove, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function DELETE(request:Request, context: { params: any }) {
  try {
    const id = context.params.id;

    const taskRef = ref(db, `/tasks/${id}`)
    remove(taskRef);

    return NextResponse.json({ message: 'Action completed! Successfully! '});

  } catch (error: any) {
    return NextResponse.json({ message: "Error", error }.error, {
      status: 500,
    });
  }
}

export async function PUT(request: Request, context: { params: any }) {
  try {
    const taskId = context.params.id;
    const req = await request.json()
  
    const taskRef = ref(db, `/tasks/${taskId}`);
    update(taskRef, { todo: req.todo });

    return NextResponse.json({ message: "Action completed! Successfully! " });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error }.error, {
      status: 500,
    });
  }
}