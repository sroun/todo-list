
import { db } from "@/libs/firebase";
import { ref, update, get } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(request:Request, context: { params: any }) {
  try {
    const taskId = context.params.id;

    const taskRef = ref(db, `/tasks/${taskId}`);

    const taskSnapshot = await get(taskRef);

    const task = taskSnapshot.val();

    update(taskRef, { isCompleted: !task.isCompleted });

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