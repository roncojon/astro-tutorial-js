import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
// import allCss from '@/styles/global.css';
// import  '../../public/styles/global.css';
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
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'quickbars, preview'
          ],
          toolbar: 'undo redo | preview | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          quickbars_selection_toolbar: 'bold italic | quicklink h1 h2 h3 blockquote quickimage quicktable',
          quickbars_insert_toolbar: 'bold italic | quicklink h1 h2 h3 blockquote quickimage quicktable',
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } p { background-color: red; }',
          content_css: '../../public/styles/editor.css',
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
