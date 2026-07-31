"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Ward = {
  id: number;
  ward_number: number;
  ward_name: string;
};

export default function EditOfficerPage() {
  const router = useRouter();
  const params = useParams();

  const officerId = params.id as string;

  const [loading, setLoading] = useState(true);

  const [wards, setWards] = useState<Ward[]>([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [wardId, setWardId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [officerRes, wardsRes] = await Promise.all([
        fetch(`/api/admin/officers/${officerId}`, {
          credentials: "include",
        }),
        fetch("/api/wards"),
      ]);

      const officerData = await officerRes.json();
      const wardsData = await wardsRes.json();

      if (!officerData.success) {
        alert(officerData.message);
        return;
      }

      if (wardsData.success) {
        setWards(wardsData.wards);
      }

      const officer = officerData.officer;

      setName(officer.name);
      setEmail(officer.email);
      setWardId(String(officer.ward_id));
    } catch (error) {
      console.error(error);
      alert("Failed to load officer.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const response = await fetch(
      `/api/admin/officers/${officerId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          wardId: Number(wardId),
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Officer updated successfully.");

    router.push("/admin/officers");
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Officer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          className="w-full rounded border p-3"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          className="w-full rounded border p-3"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <select
          className="w-full rounded border p-3"
          value={wardId}
          onChange={(e) =>
            setWardId(e.target.value)
          }
          required
        >
          <option value="">
            Select Ward
          </option>

          {wards.map((ward) => (
            <option
              key={ward.id}
              value={ward.id}
            >
              Ward {ward.ward_number} -{" "}
              {ward.ward_name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/officers")
            }
            className="rounded border px-5 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}