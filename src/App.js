import './App.css';
import docker_logo from '/src/public/docker_logo'
function App() {
  return (
    <div className='page-container dark:bg-slate-800'>
      <div className='header text-2xl shadow-xl border-solid border-4 border-indigo-200 border-x-indigo-500'>
        Sentiment Analysis API
        <br></br>
        <br></br>
        <div className='text-sm'>created using
          <img src={docker_logo} alt="docker"></img>
        </div>
      </div>
      <div className='result-container'>
          <textarea className='user-textarea rounded-md shadow-xl border-solid border-4 border-indigo-500/100'></textarea>
          <div className='api-response rounded-full shadow-xl border-solid border-4 border-indigo-500/100'>the response</div>
      </div>
    </div>

    );
}

export default App;
