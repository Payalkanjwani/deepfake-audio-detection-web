import { useState } from "react";
import Button from "./ui/Button";

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle file upload and analysis
    setResult({ isReal: true, confidence: 95 });
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Audio Detection
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="mt-2 text-sm text-gray-500">
                  {file ? file.name : "Upload audio file"}
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for your audio file..."
                className="w-full min-h-[100px] rounded-md border border-gray-300 p-2"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!file}
            >
              Analyze Audio
            </Button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
              <p className="text-lg">
                Detection Result:{" "}
                <span
                  className={result.isReal ? "text-green-600" : "text-red-600"}
                >
                  {result.isReal ? "Real" : "Synthetic"}
                </span>
              </p>
              <p className="text-lg">Confidence Score: {result.confidence}%</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AudioUpload;
