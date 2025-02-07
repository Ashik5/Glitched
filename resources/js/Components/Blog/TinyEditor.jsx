import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({ value, onChange }) {
    return (
        <Editor
            apiKey="ia05nedq41h3iasj4hkx391flqcwl1h52uv4se26zxoeoby7"
            value={value}
            onEditorChange={(content) => onChange(content)}
            init={{
                collect_telemetry: false,
                height: 500,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                    'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                // Image upload settings
                images_upload_url: '/api/upload-image',
                automatic_uploads: true,
                file_picker_types: 'image',
                // Add custom handler for image uploads
                images_upload_handler: async (blobInfo, progress) => {
                    const formData = new FormData();
                    formData.append('file', blobInfo.blob(), blobInfo.filename());

                    try {
                        const response = await fetch('/api/upload-image', {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                            },
                            body: formData
                        });
                        
                        const data = await response.json();
                        return data.location;
                    } catch (error) {
                        console.error('Upload failed:', error);
                        throw new Error('Image upload failed');
                    }
                }
            }}
        />
    );
}