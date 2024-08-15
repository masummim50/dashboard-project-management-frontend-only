export type containerType = {
  id: "todo" | "in-progress" | "under-review" | "ready";
  title: string;
};

export type itemType = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "under-review" | "ready";
  tags: { tag: string; color: number }[];
  date: string;
  members: number[];
  comments: number;
};
