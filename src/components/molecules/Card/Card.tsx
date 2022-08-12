import styles from './Card.module.scss'
import { FC, useState } from 'react'
import { Button, P } from '../../atoms'
import Image from 'next/image'
import { CardProps } from './interace'
import { saveAlbum } from '../../../services/spotify'
import { useSession } from 'next-auth/react'
import { Spin } from 'antd'

const Card: FC<CardProps> = ({ id, albumName, publishedDate, image }) => {
  const { data: session } = useSession()
  const [resp, setResp] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveAlbum = async () => {
    setIsLoading(true)
    const resp = await saveAlbum(id, session?.user.accessToken)
    setIsLoading(false)
    setResp(resp)
  }

  return (
    <article className={styles.card}>
      <div className={styles.img}>
        {image ? (
          <Image
            src={image[0].url}
            alt={image[0].name}
            width={272}
            height={241}
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </div>

      <P className={styles['album-name']} size="lg">
        {albumName}
      </P>

      <P className={styles['published-date']} size="sm">
        {publishedDate}
      </P>

      {resp !== 200 && (
        <div className={styles['btn-container']}>
          <Button type="solid" onClick={handleSaveAlbum} disabled={isLoading}>
            {isLoading ? <Spin /> : '+'} Add album
          </Button>
        </div>
      )}
    </article>
  )
}

export default Card
