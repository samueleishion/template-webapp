import { cloneElement, useState } from 'react'
import './styles.css'

const Avatar = ({ tag=<img />, src, alt, size = 'medium', onClick=() => {}, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (tag.type === 'img') {
      setImgSrc('/path/to/default/avatar.png'); // Fallback image path
    } else {
      console.warn('Avatar component requires a valid image source.');
    }
  }

  return (
    cloneElement(tag, {
      ...props,
      src: tag.type === "img" ? src : undefined,
      alt: tag.type === "img" ? alt : undefined,
      style: tag.type !== "img" ? { backgroundImage: `url(${src})` } : undefined,
      className: [
        "cs-avatar",
        `cs-avatar-${size}`,
        props.className || ''
      ].join(' ').trim(),
      onClick: onClick,
      onError: handleError
    })
  )
}

export default Avatar;