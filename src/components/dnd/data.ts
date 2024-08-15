import { containerType, itemType } from "./types";
import { v4 as uuidv4 } from "uuid";

export const initialContainers: containerType[] = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In-Progress" },
  { id: "under-review", title: "Under-Review" },
  { id: "ready", title: "Ready" },
];

export const inititalTodos: itemType[] = [
  {
    id: uuidv4(),
    title: "Fix login bug",
    description: "Resolve the issue where users cannot log in.",
    status: "todo",
    tags: [
      { tag: "bug", color: 3 },
      { tag: "priority", color: 9 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [2, 4, 6, 3],
    comments: 2,
  },
  {
    id: uuidv4(),
    title: "Design new homepage",
    description: "Create a new design for the homepage.",
    status: "todo",
    tags: [
      { tag: "bug", color: 1 },
      { tag: "priority", color: 2 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [1, 7, 6],
    comments: 5,
  },
  {
    id: uuidv4(),
    title: "Update user profile page",
    description: "Enhance the user profile page with new features.",
    status: "todo",
    tags: [
      { tag: "bug", color: 0 },
      { tag: "priority", color: 7 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [1],
    comments: 3,
  },
];

export const initialInProgressItems: itemType[] = [
  {
    id: uuidv4(),
    title: "Fix login bug",
    description: "Resolve the issue where users cannot log in.",
    status: "in-progress",
    tags: [
      { tag: "bug", color: 7 },
      { tag: "priority", color: 2 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [8, 4],
    comments: 2,
  },
  {
    id: uuidv4(),
    title: "Design new homepage",
    description: "Create a new design for the homepage.",
    status: "in-progress",
    tags: [
      { tag: "bug", color: 3 },
      { tag: "priority", color: 8 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [0, 3, 2],
    comments: 5,
  },
  {
    id: uuidv4(),
    title: "Update user profile page",
    description: "Enhance the user profile page with new features.",
    status: "in-progress",
    tags: [
      { tag: "bug", color: 8 },
      { tag: "priority", color: 1 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [6, 8, 3],
    comments: 3,
  },
];

export const initialUnderReviewItems: itemType[] = [
  {
    id: uuidv4(),
    title: "Write documentation for API",
    description: "Document the new API endpoints.",
    status: "under-review",
    tags: [
      { tag: "bug", color: 4 },
      { tag: "priority", color: 7 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [4, 6, 9],
    comments: 4,
  },
];
export const initialReadyItems: itemType[] = [
  {
    id: uuidv4(),
    title: "Write documentation for API",
    description: "Document the new API endpoints.",
    status: "ready",
    tags: [
      { tag: "bug", color: 6 },
      { tag: "priority", color: 5 },
    ],
    date: "2024-08-14T12:00:00Z",
    members: [0, 9],
    comments: 4,
  },
];
