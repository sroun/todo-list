import { useState } from "react";
import InputComponent from "./components/InputComponent";
import ItemComponent from "./components/ItemComponent";

export default function Home() {
  const items:any = [
    {
      id: 'peripeoroi',
      todo: "Hello",
      isCompleted: false,
      createdAt: new Date().toLocaleString()
    }
  ]
  return (
    <main className="flex h-[90vh] flex-col justify-between">
      <div className="grow-1 space-y-2 py-8">
        { items.map((item:any, index:string) => ItemComponent(item, index) ) }
      </div>
      <div>
        <InputComponent />
      </div>
    </main>
  );
}
