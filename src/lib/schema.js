/*
 * ══════════════════════════════════════════════════════════════════
 *  MokoNodes — Firestore NoSQL Database Schema
 *  هيكل قاعدة البيانات في Firebase Firestore
 * ══════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    هيكل البيانات                                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                 │
 * │  users/{uid}                                                    │
 * │  ├── uid: string          ← معرف المستخدم                       │
 * │  ├── email: string        ← البريد الإلكتروني                   │
 * │  ├── subscriptionTier: string  ← "free" | "pro"                │
 * │  └── createdAt: timestamp ← تاريخ الإنشاء                      │
 * │                                                                 │
 * │  maps/{mapId}             (قسم العقد)                           │
 * │  ├── userId: string                                             │
 * │  ├── title: string                                              │
 * │  ├── createdAt: timestamp                                       │
 * │  │                                                              │
 * │  ├── nodes/{nodeId}       ← (مجموعة فرعية)                     │
 * │  │   ├── title: string                                          │
 * │  │   ├── description: string                                    │
 * │  │   ├── position: {x, y}                                       │
 * │  │   ├── status: string                                         │
 * │  │   ├── progress: number                                       │
 * │  │   ├── dueDate: timestamp                                     │
 * │  │   └── createdAt: timestamp                                   │
 * │  │                                                              │
 * │  └── edges/{edgeId}       ← (مجموعة فرعية)                     │
 * │      ├── sourceNodeId: string                                   │
 * │      └── targetNodeId: string                                   │
 * │                                                                 │
 * │  notes/{noteId}           (قسم الملاحظات)                       │
 * │  ├── userId: string                                             │
 * │  ├── title: string                                              │
 * │  ├── content: string      ← نص الملاحظة                         │
 * │  ├── createdAt: timestamp                                       │
 * │  └── updatedAt: timestamp                                       │
 * │                                                                 │
 * │  task_lists/{listId}      (قسم قوائم المهام)                    │
 * │  ├── userId: string                                             │
 * │  ├── title: string                                              │
 * │  ├── createdAt: timestamp                                       │
 * │  │                                                              │
 * │  └── tasks/{taskId}       ← (مجموعة فرعية للمهام)               │
 * │      ├── text: string     ← نص المهمة                           │
 * │      ├── isCompleted: boolean ← حالة الإنجاز                    │
 * │      └── createdAt: timestamp                                   │
 * │                                                                 │
 * └─────────────────────────────────────────────────────────────────┘
 *
 *  ══════════════════════════════════════════════════════════════════
 *  Firestore Security Rules (الحد الأدنى الموصى به):
 *  ══════════════════════════════════════════════════════════════════
 *
 *  rules_version = '2';
 *  service cloud.firestore {
 *    match /databases/{database}/documents {
 *
 *      // المستخدمون
 *      match /users/{userId} {
 *        allow read, write: if request.auth != null && request.auth.uid == userId;
 *      }
 *
 *      // الخرائط
 *      match /maps/{mapId} {
 *        allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
 *        allow create: if request.auth != null;
 *        match /nodes/{nodeId} { allow read, write: if request.auth != null; }
 *        match /edges/{edgeId} { allow read, write: if request.auth != null; }
 *      }
 *
 *      // الملاحظات
 *      match /notes/{noteId} {
 *        allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
 *        allow create: if request.auth != null;
 *      }
 *
 *      // قوائم المهام
 *      match /task_lists/{listId} {
 *        allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
 *        allow create: if request.auth != null;
 *        match /tasks/{taskId} { allow read, write: if request.auth != null; }
 *      }
 *    }
 *  }
 *
 */
