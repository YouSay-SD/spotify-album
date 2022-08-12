import styles from './Login.module.scss'
import { FC } from 'react'
import Image from 'next/image'
import { Container, Title, P, Button } from '../../atoms'
import { signIn } from 'next-auth/react'

const Login: FC = () => {
  return (
    <section className={styles.login}>
      <Container className={styles.container} size="sm">
        <div className={styles['img-container']}>
          <Image src="/img/login.svg" alt="Login" width={464} height={464} />
        </div>

        <div className={styles['title-container']}>
          <Title size="lg" as="h1" className={styles.title}>
            Disfruta de la <span>mejor música</span>
          </Title>

          <P size="sm" className={styles.copy}>
            Accede a tu cuenta para guardar tus albumes favoritos.
          </P>

          <Button type="arrow" onClick={() => signIn()}>
            Log in con Spotify
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default Login
