import styles from './Container.module.scss'
import { FC } from 'react'
import { ContainerProps } from './interface'

const Container: FC<ContainerProps> = ({
  children,
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      {children}
    </div>
  )
}

export default Container
