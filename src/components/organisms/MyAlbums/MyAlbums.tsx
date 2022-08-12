import styles from './MyAlbums.module.scss'
import { FC, useState, useEffect } from 'react'
import { Container } from '../../atoms'
import { Heading, CardSlide } from '../../molecules'
import { getSavedAlbums } from '../../../services/spotify'
import { useSession } from 'next-auth/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const MyAlbums: FC = () => {
  const [albums, setAlbums] = useState<any>([])
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const isSlider = albums?.length !== 1

  useEffect(() => {
    setIsLoading(true)

    try {
      const getAlbums = async () => {
        const resp = await getSavedAlbums(session?.user.accessToken)
        setAlbums(resp.items)
      }
      getAlbums()
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user.accessToken])

  return (
    <section className={styles['my-albums']}>
      <Container className={styles.container}>
        <Heading
          title={{ __html: 'Mis albumes <span>guardados</span>' }}
          copy="Disfruta de tu música a un solo click y descube que discos has guardado dentro de  “mis  álbumes”"
        />
      </Container>

      <div
        className={`${styles.slider} ${!isSlider && styles['without-slider']}`}
      >
        {isLoading
          ? 'Loading...'
          : albums && (
              <Swiper
                spaceBetween={isSlider ? 40 : 0}
                slidesPerView={2}
                centeredSlides={isSlider}
                roundLengths={true}
                loop={isSlider}
                watchOverflow={true}
                loopAdditionalSlides={30}
                className="mySwiper"
              >
                {albums.map(({ album }) => {
                  return (
                    <SwiperSlide key={album.id}>
                      <CardSlide
                        id={album.id}
                        albumName={album.name}
                        publishedDate={album.release_date}
                        image={album.images}
                        setAlbums={setAlbums}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}
      </div>
    </section>
  )
}

export default MyAlbums
