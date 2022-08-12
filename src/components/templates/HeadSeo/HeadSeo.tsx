import Head from 'next/head'
import { FC } from 'react'
import { HeadSeoProps } from './interface'

const HeadSeo: FC<HeadSeoProps> = ({
  title = 'Spotify App',
  content = '...',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <meta httpEquiv="Content-Security-Policy" />
    </Head>
  )
}

export default HeadSeo
