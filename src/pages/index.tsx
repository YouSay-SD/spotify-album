import { NextPage } from 'next'
import { Layout } from '../components/templates'
import HeadSeo from '../components/templates/HeadSeo/HeadSeo'
import { Login } from '../components/organisms'
import { getSession } from 'next-auth/react'

const IndexPage: NextPage = () => {
  return (
    <>
      <HeadSeo title="Spotify - App" />
      <Layout>
        <Login />
      </Layout>
    </>
  )
}

export default IndexPage

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })

  if (session?.user.accessToken) {
    return {
      redirect: {
        destination: `/me/search`,
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
