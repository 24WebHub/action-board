import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <body>
      <div id="project-backdrop"></div>
      <div id="task-backdrop"></div>
      <div id="home-backdrop"></div>
      <div id="new-project-overlay"></div>
      <div id="new-task-overlay"></div>
      <div id="home-overlay"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
