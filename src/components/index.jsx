import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useCallback } from "react"
import {BiBold, BiItalic, BiListUl, BiListOl, BiRedo, BiUndo, BiTable} from "react-icons/bi"
import {BsImage, BsYoutube} from "react-icons/bs"
import {MdFormatAlignRight, MdFormatAlignLeft, MdKeyboardArrowDown} from "react-icons/md"
import {RiLinkM} from "react-icons/ri"
import {GrTableAdd} from "react-icons/gr"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import TableCell from "@tiptap/extension-table-cell"
import Youtube from "@tiptap/extension-youtube"
import {Plugin} from "prosemirror-state"
import {Decoration, DecorationSet} from "prosemirror-view"
import { upload } from "@testing-library/user-event/dist/upload"

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
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Youtube.configure({
                controls: false,
            }),
          ],
        content: `
            <div className="content ">
                <div>afihuir</div>
                <div>zcrhnnsgygf76eR</div>
                <h3>
                    Have you seen our tables? They are amazing!
                </h3>
                <ul>
                    <li>tables with rows, cells and headers (optional)</li>
                    <li>support for <code>colgroup</code> and <code>rowspan</code></li>
                    <li>and even resizable columns (optional)</li>
                </ul>
                <p>
                    Here is an example:
                </p>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th colspan="3">Description</th>
                    </tr>
                    <tr>
                        <td>Cyndi Lauper</td>
                        <td>singer</td>
                        <td>songwriter</td>
                        <td>actress</td>
                    </tr>
                    <tr>
                        <td>Marie Curie</td>
                        <td>scientist</td>
                        <td>chemist</td>
                        <td>physicist</td>
                    </tr>
                    <tr>
                        <td>Indira Gandhi</td>
                        <td>prime minister</td>
                        <td colspan="2">politician</td>
                    </tr>
                    </tbody>
                </table>
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

      const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')
    
        editor.commands.setYoutubeVideo({
          src: url,
          width: 640,
          height: 480,
        })
      }

    const addImageFromComputer = (url) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
    }   
    
    const handleChange = (e) => {
       addImageFromComputer(URL.createObjectURL(e.target.files[0]))
      }
    

    if(!editor){
        return null
    }
    return (
        <div>
            <button className="dropdown">
                <span className="dropbtn">Heading... <MdKeyboardArrowDown/></span>
                <div className="dropdown-content">
                    <div onClick={()=>editor.chain().focus().toggleHeading({level: 1}).run()}>Heading 1</div>
                    <div onClick={()=>editor.chain().focus().toggleHeading({level: 2}).run()}>Heading 2</div>
                    <div onClick={()=>editor.chain().focus().toggleHeading({level: 3}).run()}>Heading 3</div>
                    <div onClick={()=>editor.chain().focus().toggleHeading({level: 4}).run()}>Heading 4</div>
                    <div onClick={()=>editor.chain().focus().toggleHeading({level: 5}).run()}>Heading 5</div>
                    <div onClick={()=>editor.chain().focus().toggleHeading({level: 6}).run()}>Heading 6</div>
                </div>
                
            </button>
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
            <button className="dropdown dropbtn">
                <BiTable className=""/>
                <MdKeyboardArrowDown/>
                <div className="dropdown-content">
                    <div onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }>
                        <GrTableAdd/>
                    </div>
                    <div 
                        onClick={() => editor.chain().focus().deleteTable().run()}
                        disabled={!editor.can().deleteTable()}
                    >
                        DeleteTable
                        
                    </div>
                    <div 
                        onClick={() => editor.chain().focus().addColumnBefore().run()} 
                        disabled={!editor.can().addColumnBefore()}
                    >
                        AddColumnBefore
                    </div>
                    <div 
                        onClick={() => editor.chain().focus().addRowBefore().run()} 
                        disabled={!editor.can().addRowBefore()}
                    >
                        AddRowBefore
                    </div>
                    <div 
                        onClick={() => editor.chain().focus().deleteColumn().run()} 
                        disabled={!editor.can().deleteColumn()}
                    >
                        DeleteColumn
                    </div>
                    <div 
                        onClick={() => editor.chain().focus().deleteRow().run()} 
                        disabled={!editor.can().deleteRow()}
                    >
                        DeleteRow
                    </div>
                </div>
            </button>
            <button
                onClick={addImage}
            >
                <BsImage/>
            </button>
            <button className="dropdown dropbtn" >
                <BsYoutube/>
                <MdKeyboardArrowDown/>
                <div onClick={addYoutubeVideo} className="dropdown-content">
                    <div>AddYoutube</div>
                </div>
                
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
           
           <input type={'file'} onChange={(e)=>{handleChange(e)}}/>
           
        </div>
    )
}

export default TipTap