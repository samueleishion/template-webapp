import { cloneElement } from 'react'
import './styles.css'

const Avatar = ({ tag=<img />, src, alt, size = 'medium', onClick=() => {}, ...props }) => {

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
      onClick: onClick
    })
  )
}

export default Avatar;