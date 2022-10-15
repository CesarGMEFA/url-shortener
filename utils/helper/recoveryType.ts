import { useEffect } from "react"
import { useRouter } from "next/router"


function RequireRecoveryType() {
  const router = useRouter()
  useEffect(() => {
    const path = router.asPath

    if (!path.includes('type=recovery')) {
      router.push("/")
    }
  }, [])
}

export { RequireRecoveryType }