import { logo } from '../assets'

const Hero = () => {
  return (
    <header className="flex flex-col justify-center items-center w-full">
      <nav className="flex w-full justify-between items-center pt-3 mb-10">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() =>
            window.open('https://github.com/dev-ransom/aI_article_summarizer')
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI Gpt-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summise, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
