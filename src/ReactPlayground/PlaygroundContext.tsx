import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {compress, fileName2Language, uncompress} from './utils'
import { initFiles } from "./files";

export interface File{
    name:string
    value:string
    language:string
}

export interface Files{
    [key:string]:File
}
export type Theme = 'light'|'dark'
export interface PlaygroundContext{
    files: Files,
    theme:Theme,
    setTheme:(theme:Theme)=>void
    selectedFileName:string,
    setSelectedFileName:(fileName:string)=>void
    setFiles:(files:Files)=>void
    addFile:(fileName:string)=>void
    removeFile:(fileName:string)=>void
    updateFileName:(oldFiedlName:string,newFieldName:string)=>void
}
export const PlaygroundContext = createContext<PlaygroundContext>({selectedFileName:'App.tsx'
    } as PlaygroundContext)

const getFilesFromUrl = () =>{
    let files:Files|undefined
    try{
        const hash = uncompress(window.location.hash.slice(1))
        files = JSON.parse(hash)
    }catch(error){
        console.log(error);
        
    }
    return files
}

export const PlaygroundProvider = (props:PropsWithChildren)=>{
    const {children} = props
    const [files,setFiles] = useState<Files>(getFilesFromUrl() ||initFiles)
    const [selectedFileName,setSelectedFileName] = useState('App.tsx')
    const [theme,setTheme] = useState<Theme>('light')

    const addFile = (name:string)=>{
        files[name] = {
            name,
            value:'',
            language:fileName2Language(name)
        }
        setFiles({...files})
    }
    const removeFile = (name:string)=>{
        delete files[name]
        setFiles({...files})
    }
    const updateFileName = (oldFieldName:string,newFieldName:string)=>{
        if(!files[oldFieldName]||newFieldName===undefined||newFieldName===null)return
        const {[oldFieldName]:value,...rest} = files
        const newFile = {[newFieldName]:{
            ...value,
            language:fileName2Language(newFieldName),
            name:newFieldName
        },
    }
    setFiles({
        ...rest,
        ...newFile
    })
    }
    useEffect(()=>{
        const hash = compress(JSON.stringify(files))
    window.location.hash  = encodeURIComponent(hash)
    },[files])
    return (
        <PlaygroundContext.Provider
        value = {{
            files,
            theme,
            setTheme,
            selectedFileName,
            setSelectedFileName,
            setFiles,
            addFile,
            removeFile,
            updateFileName,
        }}
        >{children}
        </PlaygroundContext.Provider>
    )
}
