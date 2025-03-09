import { useState } from "react";
import Button from "../components/ui/Button";
import TextareaField from "../components/ui/TextareaField";
import backgroundImage from "../assets/images/background.jpg";

function Detection({ isHome = false }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      setResult({
        isReal: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        details: {
          spectralAnalysis: Math.random() * 100,
          patternRecognition: Math.random() * 100,
          frequencyDistribution: Math.random() * 100,
        },
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetForm = () => {
    setFile(null);
    setDescription("");
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section
          className="text-white py-16"
          style={
            isHome
              ? {}
              : {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
          }
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`${
                isHome ? "inline-block bg-blue-600 rounded-lg px-6 py-4" : ""
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">Audio Detection</h1>
              <p className="text-lg max-w-3xl mx-auto">
                Upload your audio file to analyze and determine if it contains
                synthetic voice elements.
              </p>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Upload Audio File</h2>
                  <p className="text-gray-600 mb-4">
                    Supported formats: MP3, WAV, M4A (Max size: 10MB)
                  </p>

                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
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
                      <i className="fas fa-upload text-gray-400 text-4xl mb-2"></i>
                      <span className="text-gray-500">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </span>
                    </label>
                  </div>

                  {file && (
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <TextareaField
                  label="Description (Optional)"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any details about this audio file..."
                  rows={4}
                />

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={!file || isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Audio"}
                  </Button>
                </div>
              </form>

              {/* Results Section */}
              {result && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Analysis Results</h3>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Detection Result:</span>
                      <span
                        className={`font-bold ${
                          result.isReal ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.isReal ? "Real Voice" : "Synthetic Voice"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence Score:</span>
                      <span className="font-bold">{result.confidence}%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Detailed Analysis</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Spectral Analysis</span>
                          <span>
                            {result.details.spectralAnalysis.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${result.details.spectralAnalysis}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Pattern Recognition</span>
                          <span>
                            {result.details.patternRecognition.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${result.details.patternRecognition}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Frequency Distribution</span>
                          <span>
                            {result.details.frequencyDistribution.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${result.details.frequencyDistribution}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={resetForm}
                    >
                      Analyze Another File
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Upload Audio</h3>
                <p>
                  Submit the audio file you wish to analyze through our secure
                  platform.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-bold text-xl mb-2">AI Analysis</h3>
                <p>
                  Our advanced algorithms process the file to detect any
                  synthetic elements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-bold text-xl mb-2">View Results</h3>
                <p>
                  Receive a detailed report on the audio's authenticity with
                  confidence scores.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Detection;
