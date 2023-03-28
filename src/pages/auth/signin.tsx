import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import styles from '@/styles/Signin.module.css'


export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardContent}>
            {providers &&
              Object.values(providers).map(provider => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button onClick={() => signIn(provider.id)} >
                    <img src='/Google__G__Logo.svg' width="20px" height="20px" alt='Google Logo' style={{marginBottom: '-4px', marginRight: '5px'}}/>
                    Sign in with{' '} {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src='/login_pattern.svg' alt='Pattern Background' layout='fill' className={styles.styledPattern} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  }
}