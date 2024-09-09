import { ListType } from "@/types";

export default function List<T>({ data = [], renderer }: ListType<T>) {
  const items = data.map<T>((d: T, i: number) => renderer(d, i));
  return items;
}
