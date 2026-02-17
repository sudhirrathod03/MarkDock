# MarkDock

**MarkDock** is a high-performance, real-time bookmarking engine built for the **Abstrabit Fullstack Micro-Challenge**. The application provides secure, multi-user link management with instant cross-tab synchronization.

**🚀 Live Demo:** [https://mark-dock.vercel.app/](https://mark-dock.vercel.app/)

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), Tailwind CSS, Lucide React.
* **Backend:** Supabase (Auth, PostgreSQL, Realtime).
* **State Management:** React Hooks with Custom Event Dispatching.
* **Deployment:** Vercel.

---

## 🧠 Technical Challenges & Solutions

To deliver a production-ready application within the 72-hour window, I implemented the following engineering solutions:

### 1. PostgreSQL Replication Tuning
* **Problem:** Real-time `INSERT` events initially returned empty payloads (`new: {}`), breaking the sync logic.
* **Solution:** Configured the database using `ALTER TABLE bookmarks REPLICA IDENTITY FULL;` to ensure complete row metadata is broadcasted to the client.

### 2. Multi-User Data Isolation (Security)
* **Problem:** Real-time streams can broadcast data to unauthorized users if not properly filtered at the source.
* **Solution:** Secured data at the database layer using **Row Level Security (RLS)** with `auth.uid()` checks and enforced **Client-Side Channel Filtering** (`user_id=eq.${userId}`) to ensure strict data privacy.

---

## ⚙️ Database Schema

```sql
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  url text not null,
  title text not null
);

-- Enable RLS for Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policy: Individual User Access
CREATE POLICY "Ownership Policy" ON bookmarks 
FOR ALL TO authenticated 
USING (auth.uid() = user_id);
