import styles from "../styles/components/FormCreate.module.scss"

export default function FormCreate({ urlValue, handleSubmit, handleChangeURL, handleChangeURLshort}: any) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="url">URL:</label>
      <input
        className={styles.inputUrl}
        type="text"
        id="url"
        value={urlValue.url}
        placeholder="add url. Ex: https://www.google.com/"
        onChange={handleChangeURL}
      />
      <label htmlFor="urlShort">URL short:</label>
      <input
        className={styles.inputUrl}
        type="text"
        id="urlShort"
        value={urlValue.shortUrl}
        placeholder="add short url. Ex: goog"
        onChange={handleChangeURLshort}
      />
      <input className={styles.button} type="submit" value="Create" />
    </form>
  )
}