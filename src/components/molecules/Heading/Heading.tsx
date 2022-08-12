import styles from './Heading.module.scss'
import { FC } from 'react'
import { P, Title } from '../../atoms'
import { HeadingProps } from './interface'

const Heading: FC<HeadingProps> = ({ title, copy }) => {
  return (
    <div className={styles.heading}>
      <Title as="h2" size="lg" className={styles.title}>
        <div dangerouslySetInnerHTML={title} />
        {/* {title} */}
      </Title>

      <P className={styles.copy} size="sm">
        {copy}
      </P>
    </div>
  )
}

export default Heading
