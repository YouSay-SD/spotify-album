import { NextPage } from 'next'
import { MyAlbums } from '../../../components/organisms'
import { HeadSeo, Layout } from '../../../components/templates'
import { getSession } from 'next-auth/react'

const AlbumsPage: NextPage = () => {
  return (
    <>
      <HeadSeo title="Spotify - Albums" />
      <Layout>
        <MyAlbums />
      </Layout>
    </>
  )
}

export default AlbumsPage

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })

  if (!session?.user.accessToken) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      pepe: 'pepe',
    },
  }
}
