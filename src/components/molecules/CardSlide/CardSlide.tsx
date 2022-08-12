import styles from './CardSlide.module.scss'
import { FC, useEffect, useState } from 'react'
import { Button, P } from '../../atoms'
import Image from 'next/image'
import { CardSlideProps } from './interace'
import { deleteAlbum, getSavedAlbums } from '../../../services/spotify'
import { useSession } from 'next-auth/react'
import { useSwiperSlide } from 'swiper/react'
import { Spin } from 'antd'

const CardSlide: FC<CardSlideProps> = ({
  id,
  albumName,
  publishedDate,
  setAlbums,
  image,
}) => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const swiperSlide = useSwiperSlide()

  const handleRemoveAlbum = async () => {
    setIsLoading(true)
    const resp = await deleteAlbum(id, session?.user.accessToken)
    setIsLoading(false)
  }

  useEffect(() => {
    try {
      const getAlbums = async () => {
        const resp = await getSavedAlbums(session?.user.accessToken)
        setAlbums(resp.items)
      }
      getAlbums()
    } catch (error) {
      console.log('error', error)
    }
  }, [session?.user.accessToken, setAlbums])

  return (
    <article
      className={`${styles['card-slide']} ${
        swiperSlide.isActive && styles.active
      }`}
    >
      <div className={styles.img}>
        {image ? (
          <Image
            src={image[0].url}
            alt={image[0].name}
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </div>

      {swiperSlide.isActive ? (
        <div className={styles.content}>
          <div className={styles['text-container']}>
            <P className={styles['album-name']} size="lg">
              {albumName}
            </P>
            <P className={styles['published-date']} size="sm">
              Publicado: {publishedDate}
            </P>
          </div>

          <div className={styles['btn-container']}>
            <Button
              type="solid"
              color="secondary"
              onClick={handleRemoveAlbum}
              disabled={isLoading}
            >
              {isLoading ? <Spin /> : '-'} Remove album
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default CardSlide
