import React, { useState } from "react";

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
}

const CircularImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
}) => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div
        className={`relative w-40 h-40 rounded-full border-4 border-slate-300 bg-slate-200 flex items-center justify-center transition-all duration-300 ${
          dragging ? "border-slate-500 bg-slate-300 shadow-lg" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="text-slate-600">
            Drag & Drop Image Here
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularImageUploader;
