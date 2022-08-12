import styles from './Search.module.scss'
import { FC, useState } from 'react'
import { Container, P, Button } from '../../atoms'
import { Heading, Card } from '../../molecules'
import { useSession } from 'next-auth/react'
import { getAlbumsByArtist } from '../../../services/spotify'
import { Pagination, Spin } from 'antd'

const Search: FC = () => {
  const { data: session } = useSession()
  const [albums, setAlbums] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [key, setKey] = useState('')

  const handleChange: any = async ({ target }) => {
    setKey(target.value)
    setIsLoading(true)
    try {
      const filteredAlbums = await getAlbumsByArtist(
        target.value,
        session?.user.accessToken
      )
      setAlbums(filteredAlbums)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaginationChange = async (page) => {
    const currentPage = page - 1
    try {
      const filteredAlbums = await getAlbumsByArtist(
        key,
        session?.user.accessToken,
        4 * currentPage
      )
      setAlbums(filteredAlbums)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={styles.search}>
      <Container className={styles.container}>
        <Heading
          title={{ __html: 'Busca tus <span>albunes</span>' }}
          copy="Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos"
        />

        <div className={styles['search-container']}>
          <input
            autoComplete="false"
            onChange={handleChange}
            className={styles.searcher}
            type="text"
            placeholder="Busca tu album favorito..."
          />

          <Button className={styles['search-btn']} type="solid">
            Search
          </Button>
        </div>

        <div className={styles.content}>
          <P className={styles['sub-title']} size="sm">
            Guarda tus álbumes favoritos de {key}
          </P>

          {isLoading ? (
            <Spin />
          ) : (
            <div className={styles.grid}>
              {albums?.items?.map(({ id, name, release_date, images }) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    albumName={name}
                    publishedDate={release_date}
                    image={images}
                  />
                )
              })}
            </div>
          )}
        </div>

        {albums?.items ? (
          <div className={styles.pagination}>
            <Pagination
              size="small"
              total={albums.total}
              defaultPageSize={4}
              onChange={handlePaginationChange}
              showSizeChanger={false}
              showQuickJumper={false}
            />
          </div>
        ) : null}
      </Container>
    </section>
  )
}

export default Search
