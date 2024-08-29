import { useState } from 'react'
import { copy, linkIcon, tick, loader } from '../assets'

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })

  const handleSubmit = async (e) => {
    alert('submitted')
  }
  return (
    <section className="max-w-xl mt-16 w-full">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex justify-center items-center "
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
      </div>
      {/* results */}
    </section>
  )
}

export default Demo
