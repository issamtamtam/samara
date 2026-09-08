"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      setMessage({ type: "error", text: "Only .txt files are allowed" });
      return;
    }
    
    setFile(file);
    setFileName(file.name);
    setMessage(null);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: "success", 
          text: "Knowledge base updated successfully!" 
        });
        
        // Clear after 3 seconds
        setTimeout(() => {
          setMessage(null);
          setFile(null);
          setFileName("");
          setFileContent("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }, 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Upload failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setFileName("");
    setFileContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setMessage(null);
  };

  const handleBackToChat = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white text-sm font-bold">
              CS
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Customer Service Admin
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Knowledge Base Manager
              </p>
            </div>
          </div>
          <button
            onClick={handleBackToChat}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Chat
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-8 pt-12">
        <div className="w-full max-w-2xl">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Upload Knowledge Base
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Upload a .txt file to update the customer service knowledge base. 
              The chatbot will use this information to answer customer queries.
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,text/plain"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {file ? (
              <div className="text-left">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {fileName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="ml-auto text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg max-h-40 overflow-auto">
                  <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {fileContent.slice(0, 500)}
                    {fileContent.length > 500 && "..."}
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                </div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Drag and drop your file here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  or click to browse
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Only .txt files are accepted
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition-all ${
                isUploading || !file
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Knowledge Base"
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={!file || isUploading}
              className={`px-6 py-3 rounded-lg font-medium border transition-all ${
                !file || isUploading
                  ? "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-400"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Clear
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              How It Works
            </h3>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Upload a .txt file containing your company's customer service information</li>
              <li>• The chatbot will read this file on every request</li>
              <li>• All customer queries will be answered based on this knowledge base</li>
              <li>• Upload a new file anytime to update the knowledge base</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
