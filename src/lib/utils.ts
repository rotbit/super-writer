import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPointerPosition(event: any) {
  if (event.targetTouches) {
    if (event.targetTouches.length === 1) {
      return {
        x: event.targetTouches[0].clientX,
        y: event.targetTouches[0].clientY,
      }
    }
    return null
  }
  return { x: event.clientX, y: event.clientY }
}


export async function postData(url='', data={}) {
  // 默认选项被标记为 * 表明默认使用这些选项
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  const json = await response.json();
  console.log("json:", json);
  return json;
}

export async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {'Content-Type': 'application/json'},
  });
  const json = await response.json();
  return json;
}