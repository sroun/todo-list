export type TaskList = {
  id: string,
  todo: string,
  isCompleted: boolean
  createdAt: string
}

export type GroupTask = {
  [key:string] : TaskList
}