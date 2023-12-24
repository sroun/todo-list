'use client'

import https from "@/libs/http";
import { db } from "@/libs/firebase";
import { useState, useEffect, useCallback, useMemo } from "react";
import { onValue, ref } from "firebase/database";

import { GroupTask } from '@/app/types/tasks'
import InputComponent from "./components/InputComponent";
import ItemComponent from "./components/ItemComponent";
import debounce from "@/util/functionality";


export default function Home() {
  const [items, setItems] = useState<GroupTask>({})
  const [selectedItem, setSelectedItem] = useState(null)
  const [filterText, setFilterText] = useState('');

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
  }, [])

  const onClickTask = (props:any) => {
    setSelectedItem(props)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterChange = useCallback(debounce(
    (value: string) => setFilterText(value), 300),[]
  );

  const onFilterChange = (filterValue:string) => debouncedFilterChange(filterValue);

  const filteredItems = useMemo(() => {
    if(!items) return []
    return Object.keys(items).filter(
      (taskId) => items[taskId].todo.toLocaleLowerCase().trim().includes(filterText.toLocaleLowerCase().trim())
    )
  }, [filterText, items])


  const filteredExactItems = useMemo(() => {
    return Object.keys(items).filter(
      (taskId) => items[taskId].todo.toLocaleLowerCase().trim() == filterText.toLocaleLowerCase().trim()
    )
  }, [filterText, items])

  return (
    <main className="flex h-[90vh] flex-col justify-between">
      <div className="grow-1 space-y-2 py-8  h-full">
        { filteredItems.length > 0 ? (
            filteredItems.map((taskId: string) => ItemComponent(items[taskId], taskId, onClickTask) ) 
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-sm font-semibold text-gray-300">No result. Create a new one instead!</p>
          </div>
        ) }
      </div>
      <div>
        <InputComponent 
          selectedItem={selectedItem} 
          onFilterChange={onFilterChange}
          filteredExactItems={filteredExactItems}
        />
      </div>
    </main>
  );
}
