import './Home.css';

const Home = ()=> {
    return (
        <main>
            <div className="home-topnav">
                <div className="home-league-name-section" style={{marginLeft: 32}}>
                    <h1 className='home-logo'>Saint Mark Leagues</h1>
                </div>
                <div className="home-tabs">
                    <a href='/dashboard' style={{color: 'black', textDecoration: 'none'}}><div className="home-tab">Dashboard</div></a>
                    <div className="home-tab">2025</div>
                    <div className="home-tab">History</div>
                </div>
            </div>

            <div className="home-section1">
                <div className="home-section1-left">
                    <h1 className='home-welcome' style={{color:'white'}}>Yalla Nel3ab <br /> <span>KOOOOOORA!!</span></h1>
                    <p>
                        Welcome to Saint Mark Leagues, your hub for football excitement! Explore the latest league, check out the history, and get ready for the 2025 Summer season.
                    </p>
                    <button className='home-button'>Yalla Nel3ab</button>

                </div>
            </div>
        </main>
    )
}

export default Home;