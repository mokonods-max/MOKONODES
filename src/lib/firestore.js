import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ══════════════════════════════════════════════
//  خرائط العُقد (Maps)
// ══════════════════════════════════════════════

export async function createMap(userId, title) {
  const ref = await addDoc(collection(db, 'maps'), {
    userId,
    title,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteMap(mapId) {
  await deleteDoc(doc(db, 'maps', mapId));
}

export function subscribeMaps(userId, callback) {
  const q = query(
    collection(db, 'maps'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const maps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(maps);
  });
}

// ─── العُقد (Nodes) ───
export async function createNode(mapId, nodeData) {
  const ref = await addDoc(collection(db, 'maps', mapId, 'nodes'), {
    title: nodeData.title || 'عقدة جديدة',
    description: nodeData.description || '',
    position: nodeData.position || { x: 0, y: 0 },
    status: nodeData.status || 'todo',
    progress: nodeData.progress || 0,
    dueDate: nodeData.dueDate || null,
    pomodoro: nodeData.pomodoro || { enabled: false, duration: 25 },
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateNode(mapId, nodeId, updates) {
  await updateDoc(doc(db, 'maps', mapId, 'nodes', nodeId), updates);
}

export async function deleteNode(mapId, nodeId) {
  await deleteDoc(doc(db, 'maps', mapId, 'nodes', nodeId));
}

export function subscribeNodes(mapId, callback) {
  return onSnapshot(collection(db, 'maps', mapId, 'nodes'), (snapshot) => {
    const nodes = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(nodes);
  });
}

// ─── الروابط (Edges) ───
export async function createEdge(mapId, edgeData) {
  const ref = await addDoc(collection(db, 'maps', mapId, 'edges'), {
    sourceNodeId: edgeData.source,
    targetNodeId: edgeData.target,
    sourceHandle: edgeData.sourceHandle || null,
    targetHandle: edgeData.targetHandle || null,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteEdge(mapId, edgeId) {
  await deleteDoc(doc(db, 'maps', mapId, 'edges', edgeId));
}

export function subscribeEdges(mapId, callback) {
  return onSnapshot(collection(db, 'maps', mapId, 'edges'), (snapshot) => {
    const edges = snapshot.docs.map((d) => ({
      id: d.id,
      source: d.data().sourceNodeId,
      target: d.data().targetNodeId,
      sourceHandle: d.data().sourceHandle || null,
      targetHandle: d.data().targetHandle || null,
    }));
    callback(edges);
  });
}

// ══════════════════════════════════════════════
//  الملاحظات (Notes)
// ══════════════════════════════════════════════

export async function createNote(userId, title, content = '') {
  const ref = await addDoc(collection(db, 'notes'), {
    userId,
    title,
    content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateNote(noteId, updates) {
  await updateDoc(doc(db, 'notes', noteId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNote(noteId) {
  await deleteDoc(doc(db, 'notes', noteId));
}

export function subscribeNotes(userId, callback) {
  const q = query(
    collection(db, 'notes'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(notes);
  });
}

export function subscribeNote(noteId, callback) {
  return onSnapshot(doc(db, 'notes', noteId), (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() });
    } else {
      callback(null);
    }
  });
}

// ══════════════════════════════════════════════
//  قوائم المهام (Task Lists)
// ══════════════════════════════════════════════

export async function createTaskList(userId, title) {
  const ref = await addDoc(collection(db, 'task_lists'), {
    userId,
    title,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteTaskList(listId) {
  await deleteDoc(doc(db, 'task_lists', listId));
}

export function subscribeTaskLists(userId, callback) {
  const q = query(
    collection(db, 'task_lists'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const lists = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(lists);
  });
}

export function subscribeTaskList(listId, callback) {
  return onSnapshot(doc(db, 'task_lists', listId), (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() });
    } else {
      callback(null);
    }
  });
}

// ─── المهام الفرعية (Tasks) ───
export async function createTask(listId, text) {
  const ref = await addDoc(collection(db, 'task_lists', listId, 'tasks'), {
    text,
    isCompleted: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTask(listId, taskId, updates) {
  await updateDoc(doc(db, 'task_lists', listId, 'tasks', taskId), updates);
}

export async function deleteTask(listId, taskId) {
  await deleteDoc(doc(db, 'task_lists', listId, 'tasks', taskId));
}

export function subscribeTasks(listId, callback) {
  const q = query(
    collection(db, 'task_lists', listId, 'tasks'),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(tasks);
  });
}
