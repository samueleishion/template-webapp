import { cloneElement } from 'react'
import './styles.css'

const Avatar = ({ tag=<img />, src, alt, size = 'medium', ...props }) => {
  return (
    cloneElement(tag, {
      ...props,
      src,
      alt,
      className: [
        "cs-avatar",
        `cs-avatar-${size}`,
        props.className || ''
      ].join(' ').trim(),
      style: { backgroundImage: `url(${src})` }
    })
  )
}

export default Avatar;