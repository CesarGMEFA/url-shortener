import Link from "next/link"
export default function custom404() {
  return (
    <section>
      <h1>404</h1>
      <p>This page does not exits. Please return to <Link href={"/"}><a>Home</a></Link></p>
    </section>
  )
}