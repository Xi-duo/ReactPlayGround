import { setupTypeAcquisition } from "@typescript/ata";
import typescript from 'typescript'
export function createATA(onDownlodeFile:(code:string,path:string)=>void){
    const ata = setupTypeAcquisition({
        projectName:'my-ata',
        typescript:typescript,
        logger:console,
        delegate:{
            receivedFile:(code,path)=>{
                // console.log('自动下载的包',path);
                onDownlodeFile(code,path);
            }
        }
    })
    return ata;
}