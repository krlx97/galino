export interface Menu {
  title:string,
  items:Item[]
}

interface Item {
  name:string,
  ingredients:string,
  price:number
}