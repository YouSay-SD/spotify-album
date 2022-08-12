import { NextPage } from 'next'
import { HeadSeo, Layout } from '../../../components/templates'
import { Search } from '../../../components/organisms'
import { getSession } from 'next-auth/react'

const SearchPage: NextPage = () => {
  return (
    <>
      <HeadSeo title="Spotify - Search" />
      <Layout>
        <Search />
      </Layout>
    </>
  )
}

export default SearchPage

export async function getServerSideProps({ req }) {
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
