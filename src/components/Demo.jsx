import { useEffect, useState } from 'react'
import { copy, linkIcon, tick, loader } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })

  const [allArticles, setAllArticles] = useState([])
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles'),
    )
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await getSummary({ articleUrl: article.url })
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedArticles = [newArticle, ...allArticles]
      setArticle(newArticle)
      setAllArticles(updatedArticles)
      localStorage.setItem('articles', JSON.stringify(updatedArticles))
    }
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 3000)
  }

  const handleCopySummary = (summary) => {
    navigator.clipboard.writeText(summary)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 3000)
  }

  return (
    <section className="max-w-xl mt-16 w-full">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            className="url_input peer"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>
        {/* history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopyUrl(item.url)}>
                <img
                  src={copiedUrl ? tick : copy}
                  alt="copy_icon"
                  className="h-[40%] w-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi font-medium text-sm truncate text-blue-700">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* results */}
      <div className="my-10 flex flex-col max-w-full justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loading"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn&apos;t supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi text-xl font-bold text-gray-600 text-center">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <div className="w-full flex justify-end items-end">
                  <div
                    className="copy_btn"
                    onClick={() => handleCopySummary(article.summary)}
                  >
                    <img
                      src={copiedSummary ? tick : copy}
                      alt="copy_icon"
                      className="h-[40%] w-[40%] object-contain cursor-pointer"
                    />
                  </div>
                </div>
                <p className="font-inter font-medium text-gray-700 text-sm">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo
