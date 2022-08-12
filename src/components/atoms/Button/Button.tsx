import styles from './Button.module.scss'
import { ButtonProps } from './Interface'
import { FC } from 'react'

const Button: FC<ButtonProps> = ({
  children,
  className,
  type,
  color,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[color]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}

      {type === 'arrow' ? (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1L17 8L10 15M1 8H17H1Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  )
}

export default Button
