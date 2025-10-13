export default function TailwindDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">
        Tailwind Demo Page
      </h1>
      <p className="text-lg text-gray-300 max-w-xl text-center">
        This page is styled using <span className="font-semibold">Tailwind CSS</span> inside a React + MUI project.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg">
          Primary Button
        </button>
        <button className="px-6 py-2 border border-cyan-500 rounded-lg hover:bg-cyan-800">
          Outline Button
        </button>
      </div>
    </div>
  );
}
