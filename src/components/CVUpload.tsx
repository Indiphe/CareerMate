import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { auth, db } from '../firebase-config'; // ✅ adjust if needed
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CVUploadProps {
  onUploaded?: (fileUrl: string) => void;
}

const CVUpload: React.FC<CVUploadProps> = ({ onUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const roleInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await uploadFile(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) await uploadFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const uploadFile = async (file: File) => {
    const roleTag = roleInputRef.current?.value.trim() || 'General';

    if (file.type !== 'application/pdf') {
      setStatus('❌ Only PDF files are supported.');
      return;
    }

    setIsUploading(true);
    setStatus('⏳ Uploading CV to Cloudinary...');

    try {
      const cloudName = 'drpqytgbz';
      const uploadPreset = 'Resumes';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Cloudinary upload failed');

      const fileUrl = data.secure_url;

      if (!auth.currentUser) {
        setStatus('❌ You must be logged in to upload.');
        return;
      }

      await addDoc(collection(db, 'users', auth.currentUser.uid, 'cvs'), {
        url: fileUrl,
        filename: file.name,
        roleTag,
        uploadedAt: serverTimestamp(),
      });

      setStatus(`✅ CV uploaded for "${roleTag}".`);
      onUploaded?.(fileUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setStatus(`❌ Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your CV</h3>
      <input
        ref={roleInputRef}
        type="text"
        placeholder="Target role (e.g., Frontend Developer)"
        className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
        disabled={isUploading}
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
          isUploading ? 'border-gray-300 bg-gray-100 cursor-not-allowed' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        }`}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Drag and drop your CV here, or click to select</p>
        <p className="text-sm text-gray-500">PDF only · Max 10MB</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
          title="Upload your CV (PDF only)"
          placeholder="Select your CV file"
        />
      </div>
      {status && (
        <p className={`mt-3 text-sm ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default CVUpload;
