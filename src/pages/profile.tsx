import { useSession } from "next-auth/react"
import Image from "next/image"
import styles from '@/styles/Profile.module.css'

const Profile = () => {
  const { data: session } = useSession()
  return (
    <div>
      <h1>Profile</h1>
      {session && session.user ?
        <div>
          <p>You are signed in as <b>{session.user.name}</b> </p>
          <p>Email: {session.user.email} </p>
          {session.user.image && <Image className={styles.profilePic} src={session.user.image} alt="Profile Picture" width={100} height={100} />}
        </div>
        :
        <div>
          <p>You are not signed in.</p>
        </div>}
    </div>
  )
}
export default Profile