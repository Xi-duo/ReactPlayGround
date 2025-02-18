import styles from './index.module.scss'
import logoSvg from './icons/logo.svg';
import { useContext } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { DownloadOutlined, MoonOutlined, ShareAltOutlined, SunOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { downloadFiles } from '../../utils';
import copy from 'copy-to-clipboard';
export default function Header() {
  const { files,theme, setTheme} = useContext(PlaygroundContext)
  message.config({
    top: 100, // 设定 message 显示位置
    duration: 2, // 设定 message 显示时间（默认 3 秒）
  });
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt='logo' src={logoSvg}/>
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === 'light' && (
          <MoonOutlined
            title='切换暗色主题'
            className={styles.theme}
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title='切换亮色主题'
            className={styles.theme}
            onClick={() => setTheme('light')}
          />
        )}
        <ShareAltOutlined
        style={{
            marginLeft:'10px'  
        }}
        onClick={()=>{
            copy(window.location.href)
            message.success('分享链接已复制')
        }}
        />
        <DownloadOutlined
            style={{marginLeft:'10px'}}
            onClick={ async()=>{
                await downloadFiles(files);
                message.success('下载完成')
            }}
        />
      </div>
    </div>
  )
}
