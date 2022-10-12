import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useCallback } from "react"
import {BiBold, BiItalic, BiListUl, BiListOl, BiRedo, BiUndo} from "react-icons/bi"
import {BsImage} from "react-icons/bs"
import {MdFormatAlignRight, MdFormatAlignLeft} from "react-icons/md"
import {RiLinkM} from "react-icons/ri"

const TipTap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
          ],
        content: `
            <div className="content">
                <div>afihuir</div>
                <div>zcrhnnsgygf76eR</div>
            </div>
        `
    })

    return(
        <div className="container">
           <MenuBar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )
}

const MenuBar = ({editor}) => {
    const change = (e) => {
        if(e.target.value){
            editor.chain().focus().toggleHeading({level:e.target.value}).run()
        }
    }

    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        if (url === null) {
          return
        }
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()
          return
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      }, [editor])

    if(!editor){
        return null
    }
    return (
        <div>
            <select onChange={(e)=>change(e)}>
                <option value={1}>Heading 1</option>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
                <option value={4}>Heading 4</option>
                <option value={5}>Heading 5</option>
                <option value={6}>Heading 6</option>
            </select>
            <button onClick={()=>editor.chain().focus().toggleHeading({ level: 1 }).run()}>h1</button>
            <button 
                onClick={()=>editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
            >
                <BiBold />
            </button>
            
            <button
                onClick={()=>editor.chain().focus().toggleItalic().run()}
            >
                <BiItalic/>
            </button>
            <button onClick={setLink}>
                <RiLinkM/>
            </button>
            <button
                onClick={()=>editor.chain().focus().toggleBulletList().run()}
            >
                <BiListUl />
            </button>
            <button
                onClick={()=>editor.chain().focus().toggleOrderedList().run()}
            >
                <BiListOl/>
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <MdFormatAlignRight/>
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}                
            >
                <MdFormatAlignLeft/>
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
            >
                <BiUndo/>
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
            >
                <BiRedo/>
            </button>
            <button
                onClick={addImage}
            >
                <BsImage/>
            </button>
           
        </div>
    )
}

export default TipTap