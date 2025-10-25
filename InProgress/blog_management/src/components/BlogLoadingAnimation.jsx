import './BlogLoadingAnimation.css'

const BlogLoadingAnimation = () => {
  return (
    <section className="animation-wrapper">
      <div className="loader-con">
        <div style={{ '--i': 0 }} className="pfile"></div>
        <div style={{ '--i': 1 }} className="pfile"></div>
        <div style={{ '--i': 2 }} className="pfile"></div>
        <div style={{ '--i': 3 }} className="pfile"></div>
        <div style={{ '--i': 4 }} className="pfile"></div>
        <div style={{ '--i': 5 }} className="pfile"></div>
      </div>
    </section>
  )
}

export default BlogLoadingAnimation
