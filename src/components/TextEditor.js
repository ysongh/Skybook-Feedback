import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ body, setBody }) {
  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['image'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }]
    ],
  }
  
  return <ReactQuill className="text-editor" theme="snow" value={body} onChange={setBody} modules={modules}/>
}

export default TextEditor;
