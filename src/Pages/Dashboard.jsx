import './Dashboard.css';


import { useState } from 'react';


const Dashboard = () => {
    const [leagueName, setLeagueName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState(['', '', '', '', '']);
    const [playerImages, setPlayerImages] = useState([null, null, null, null, null]);
    const [teams, setTeams] = useState([]);
    const [expanded, setExpanded] = useState({});

    const handlePlayerChange = (idx, value) => {
        setPlayers(players => players.map((p, i) => (i === idx ? value : p)));
    };

    const handlePlayerImageChange = (idx, file) => {
        setPlayerImages(imgs => imgs.map((img, i) => (i === idx ? file : img)));
    };

    const handleAddTeam = () => {
        if (!teamName.trim()) return;
        setTeams(t => [...t, { name: teamName, players: players.filter(p => p.trim()), images: playerImages }]);
        setTeamName('');
        setPlayers(['', '', '', '', '']);
        setPlayerImages([null, null, null, null, null]);
    };

    const handleExpand = idx => {
        setExpanded(e => ({ ...e, [idx]: !e[idx] }));
    };

    return (
        <main>
            <header className="d-top">
                <div className="d-logo"><h1>DashBoard</h1></div>
                <div className="d-tabs">
                    <a href="" className="d-tab">2025</a>
                    <a href="" className="d-tab">History</a>
                </div>
                {/* Hamburger menu for mobile */}
                <div className="d-hamburger-menu" tabIndex={0}>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <div className="hamburger-dropdown">
                        <a href="#create-league" id='active'>Create League</a>
                        <a href="#fixtures">Fixtures</a>
                        <a href="#groups">Groups</a>
                        <a href="#scorers">Top Scorers</a>
                        <a href="#assisters">Top Assisters</a>
                        <a href="#2025">2025</a>
                        <a href="#history">History</a>
                    </div>
                </div>
            </header>

            <div className="d-container">
                <div className="d-nav-left">
                    <a href="#create-league" className="d-nav-links">Create League</a>
                    <a href="#fixtures" className="d-nav-links">Fixtures</a>
                    <a href="#groups" className="d-nav-links">Groups</a>
                    <a href="#scorers" className="d-nav-links">Top scorers</a>
                    <a href="#assisters" className="d-nav-links">Top assisters</a>
                </div>
                {/* Default Information Section */}
                <section className="league-section default-info-section old-bw-section" style={{width: '100%', marginBottom: 32}}>
                    <h2>Default Information</h2>
                    <form className="default-info-form" style={{display:'flex', flexWrap:'wrap', gap: '18px 32px', alignItems:'center'}}>
                        <div style={{display:'flex', flexDirection:'column', minWidth:180, width: 200}}>
                            <label htmlFor="matchMinutes"><b>Match Time (minutes):</b></label>
                            <input type="number" id="matchMinutes" name="matchMinutes" min="1" max="180" placeholder="e.g. 90" className="default-info-input" />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', minWidth:180, width: 200}}>
                            <label htmlFor="maxTeams"><b>Max Teams in a Group:</b></label>
                            <input type="number" id="maxTeams" name="maxTeams" min="2" max="32" placeholder="e.g. 6" className="default-info-input" />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', minWidth:180, width: 200}}>
                            <label htmlFor="maxPlayers"><b>Max player in a Team:</b></label>
                            <input type="number" id="maxPlayers" name="matchMinutes" min="1" max="180" placeholder="e.g. 5" className="default-info-input" />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', minWidth:180, width: 200}}>
                            <label htmlFor="pointsWin"><b>Points per Win</b></label>
                            <input type="number" id="pointsWin" name="maxTeams" min="0" max="32" placeholder="default" className="default-info-input" value={3} />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', minWidth:180, width: 200}}>
                            <label htmlFor="pointsDraw"><b>Points per Draw</b></label>
                            <input type="number" id="pointsDraw" name="maxTeams" min="0" max="32" placeholder="default" className="default-info-input" value={1} />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', minWidth:180, width: 200}}>
                            <label htmlFor="pointsLose"><b>Points per Lose</b></label>
                            <input type="number" id="pointsLose" name="maxTeams" min="0" max="32" placeholder="default" className="default-info-input" value={0} />
                        </div>
                    </form>
                </section>
                <div className="d-section-main old-bw-layout">
                    {/* ===================== Section 1: League Name (fills width) ===================== */}
                    <section className="league-section league-section-name old-bw-section" style={{width: '100%', marginBottom: 32}}>
                        <h2>League Name</h2>
                        <input type="text" id="leagueName" name="leagueName" placeholder="Enter league name" value={leagueName} onChange={e => setLeagueName(e.target.value)} required className="league-name-input" />
                    </section> <br />
                    {/* ===================== Section 2 & 3: Add Team and Teams Assigned (side by side) ===================== */}
                    <div className="old-bw-row" style={{display: 'flex', width: '100%', gap: 32}}>
                        {/* -------- Section 2: Add Team and Players -------- */}
                        <section className="league-section league-section-add-team old-bw-section" style={{flex: 1}}>
                            <h2>Add Team</h2>
                            <input type="text" placeholder="Team Name" className="team-name-input" value={teamName} onChange={e => setTeamName(e.target.value)} required />
                            <div className="players-list">
                                {players.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <input type="text" placeholder={`Player ${i + 1}`} className="player-input" value={p} onChange={e => handlePlayerChange(i, e.target.value)} id='players-input' required />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id={`player-image-input-${i}`}
                                            style={{ display: 'none' }}
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) handlePlayerImageChange(i, e.target.files[0]);
                                            }}
                                        />
                                        {playerImages[i] ? (
                                            <img
                                                src={URL.createObjectURL(playerImages[i])}
                                                alt={`Player ${i + 1} Preview`}
                                                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid #222', cursor: 'pointer', filter: 'grayscale(1)' }}
                                                title="Change Player Image"
                                                onClick={() => document.getElementById(`player-image-input-${i}`).click()}
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                className="add-image-btn"
                                                title="Add Player Image"
                                                style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #222', background: '#fff', color: '#111', cursor: 'pointer', fontSize: 13 }}
                                                onClick={() => document.getElementById(`player-image-input-${i}`).click()}
                                            >
                                                📷
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="add-team-btn" onClick={handleAddTeam}>Add Team</button>
                        </section>
                        {/* -------- Section 3: Teams Assigned -------- */}
                        <section className="league-section league-section-teams old-bw-section" style={{flex: 1}}>
                            <h2>Teams Assigned</h2>
                            {teams.length === 0 && <div style={{ color: '#888', fontStyle: 'italic' }}>No teams added yet.</div>}
                            {teams.map((team, idx) => (
                                <div className="team-card" key={idx} style={{background:'#fff', border:'1.2px solid #222', color:'#111', paddingBottom: 16}}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <span style={{ fontWeight: 700, fontSize: '1.08rem', marginBottom: 6 }}>{team.name}</span>
                                            {expanded[idx] && team.players.length > 0 && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                                                    {team.players.map((player, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            {team.images && team.images[i] ? (
                                                                <img
                                                                    src={URL.createObjectURL(team.images[i])}
                                                                    alt={player}
                                                                    style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1px solid #222', marginRight: 6 }}
                                                                />
                                                            ) : (
                                                                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#eee', display: 'inline-block', marginRight: 6 }}></span>
                                                            )}
                                                            <span>{player}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button type="button" className="expand-btn" style={{color:'#111', alignSelf: 'flex-start'}} onClick={() => handleExpand(idx)}>
                                            {expanded[idx] ? '▼' : '▶'}
                                        </button>
                                    </div>
                                    {expanded[idx] && team.players.length === 0 && (
                                        <div style={{ color: '#888', marginTop: 8 }}>No players</div>
                                    )}
                                </div>
                            ))}
                        </section>
                    </div>
                    <button type="submit" className="submit-league-btn" style={{marginTop: 16, alignSelf: 'flex-start'}} id='submit-league-btn'>Assign League</button>
                </div>
            </div>
            
        </main>
    );
}


export default Dashboard;