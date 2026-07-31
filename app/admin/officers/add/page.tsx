"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ward } from "@/types/ward";

export default function AddOfficerPage() {
  const router = useRouter();

  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingWards, setLoadingWards] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wardId, setWardId] = useState("");

  useEffect(() => {
    async function loadWards() {
      try {
        const response = await fetch("/api/wards");

        const data = await response.json();

        console.log("API Response:", data);

        if (data.success) {
          setWards(data.wards);
          console.log(data);
        } else {
          console.error("Failed to load wards:", data.message);
        }
      } catch (error) {
        console.error("Error fetching wards:", error);
      } finally {
        setLoadingWards(false);
      }
    }

    loadWards();
  }, []);

  useEffect(() => {
    console.log("Wards State:", wards);
  }, [wards]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!wardId) {
      alert("Please select a ward");
      return;
    }

    const response = await fetch("/api/admin/officers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        wardId: Number(wardId),
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Officer Added");
    router.push("/admin/officers");
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 text-3xl font-bold">
        Add Officer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          placeholder="Name"
          className="w-full rounded border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full rounded border p-3"
          value={wardId}
          disabled={loadingWards}
          onChange={(e) => setWardId(e.target.value)}
          required
        >
          <option value="">
            {loadingWards ? "Loading wards..." : "Select Ward"}
          </option>

          {wards.map((ward) => (
            <option
              key={ward.id}
              value={ward.id}
            >
              Ward {ward.ward_number} - {ward.ward_name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-2 text-white"
        >
          Create Officer
        </button>
      </form>
    </div>
  );
}