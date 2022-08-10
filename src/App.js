import React  from "react";

const App = () => <div>Hello from React </div>;
/*
const App = () => {

  const [news , setNews] = useState([])
  const [searchQuery , setSearchQuery] = useState('react')
  const [url , setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading , setLoading ] = useState(false);



  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange= (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  return (
    <div>
      <h2>News </h2>
      {loading ? <h2>loading ...</h2> : ""}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
      {news.map((n,i) =>(
        <p key={i}>{n.title}</p>
      ) )}
    </div>
  )

}
*/
/*
const App = () => {

  const [count , setCount] = useState(0)

  useEffect(() => {
    document.title = `Clicked ${count} times `
  })
  const increment = () => {
    setCount(count +1)
  }
  return (
    <div className="App">
    <h2>Counter App </h2>
    <button onClick={increment}> Clicked {count} times </button>
    </div>
  )
}
*/
/*
function App() {
  return (
    <div className="App">
    <h1>hello Houssem</h1>
    </div>
  );
}
*/
export default App;
