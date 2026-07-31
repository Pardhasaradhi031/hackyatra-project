export default function DeathRegistration() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center py-10">

      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold">
          Death Registration
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the death registration details.
        </p>

        <form className="grid md:grid-cols-2 gap-6 mt-8">

          <div>
            <label>Deceased Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Date of Death</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Place of Death</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Cause of Death</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label>Address</label>
            <textarea
              rows={3}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">

            <button
              type="reset"
              className="border rounded-lg px-6 py-2"
            >
              Cancel
            </button>

            <button
              className="bg-green-600 text-white rounded-lg px-6 py-2"
            >
              Submit
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}