'use client'

import https from "@/libs/http";
import { db } from "@/libs/firebase";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";

import { GroupTask } from '@/app/types/tasks'
import InputComponent from "./components/InputComponent";
import ItemComponent from "./components/ItemComponent";


export default function Home() {
  const [items, setItems] = useState<GroupTask>({})
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchData = () => {
      https.get('/api/todo', {
        signal: abortController.signal
      })
        .then(({ data }) => { 
          setItems(data.tasks)
        })
        .catch((error:any) => {
          if (!abortController.signal.aborted) {
            console.error('Error fetching data:', error);
          }
        })
    }
    fetchData()
    
    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const tasksRef = ref(db, '/tasks');

    const handleData = (querySnapshot:any) => {
      const tasksData: GroupTask = querySnapshot.val() || {};
      setItems(tasksData);
    };

    const unsubscribe = onValue(tasksRef, handleData);

    return () => {
      unsubscribe();
    };
  })

  const onClickTask = (props:any) => {
    setSelectedItem(props)
  }

  return (
    <main className="flex h-[90vh] flex-col justify-between">
      <div className="grow-1 space-y-2 py-8">
        {Object.keys(items).map((id: string) => ItemComponent(items[id], id, onClickTask) ) }
      </div>
      <div>
        <InputComponent selectedItem={selectedItem}/>
      </div>
    </main>
  );
}
