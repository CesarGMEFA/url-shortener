import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>url shortener</title>
        <meta name="description" content="URL shortener, which are stored in a database." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}