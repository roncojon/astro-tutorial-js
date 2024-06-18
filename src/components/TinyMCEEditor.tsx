import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export const prerender = false;

interface TinyMCEEditorProps {
  onContentChange: (content: string) => void;
}

const TinyMCEEditor = ({ onContentChange }: TinyMCEEditorProps) => {
  const editorRef = useRef<any>(null);

  return (
    <>
      <Editor
        apiKey='vsjb36bpwc9tukvutqh2wwhje0dfnurjvblcfcfi361mtd1k'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'quickbars'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          setup: (editor) => {
            editor.on('Change', () => {
              onContentChange(editor.getContent(/* { format: 'html' } */));
            });
          }
        }}
      />
    </>
  );
}

export default TinyMCEEditor;
