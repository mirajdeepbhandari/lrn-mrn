import styles from './MiddleComponentTitle.module.css'
import { memo } from 'react'

const MiddleComponentTitle = () => {
  return (
    <div className={styles.blogHeader}>
      <h1 className={styles.blogTitle}>Latest Articles</h1>
      <p className={styles.blogSubtitle}>Insights, stories, and perspectives</p>  
    </div>
  )
}

export default memo(MiddleComponentTitle);
