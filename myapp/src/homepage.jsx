import "./Home.css"


import PolyPathLogo from "./assets/PolyPath.png"



function HomePage({ ToLogin , ToExplore ,ToResource ,ToMindMap}) {

    function Logout() {
        localStorage.removeItem("Token")
        ToLogin()
    }

    return (
        <div className="Home-Page">

            <nav className="Nav-Bar">

                <img  className="Logo-Icon"  src={PolyPathLogo} ></img>




                <div className="Nav-Links">
                    <a onClick={ToExplore}>Explore</a>
                    <a onClick={ToResource}>Resources</a>
                    <a href="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/07/06/06/20260706065408-FTD2ETSQ.json">Poly Path Bot</a>
                    <a onClick={ToMindMap}>Mind map</a>
                </div>
                <button className="Nav-Logout" onClick={Logout}>Log out</button>
            </nav>

            <header className="Hero">
                <div className="Hero-Text">
                    <span className="Path-Kicker">Career Guidance</span>
                    <h1 className="Hero-Headline">Find the work<br />that fits who you are.</h1>
                    <p className="Hero-Sub">
                        Take a short assessment, see career paths matched to your strengths,
                        and get a plan for the next step.
                    </p>
                    <div className="Hero-Actions">
                        <button className="Login-Button">Start assessment</button>
                        <button className="Hero-Secondary">Browse careers</button>
                    </div>
                </div>

                <svg className="Path-Svg Hero-Svg" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path
                        className="Path-Line"
                        d="M 20 260 C 100 260, 100 180, 160 180 S 240 100, 300 100 S 360 40, 380 30"
                        fill="none"
                    />
                    <circle className="Path-Point p1" cx="20" cy="260" r="5" />
                    <circle className="Path-Point p2" cx="160" cy="180" r="5" />
                    <circle className="Path-Point p3" cx="300" cy="100" r="5" />
                    <circle className="Path-Point p4 final" cx="380" cy="30" r="7" />
                </svg>
            </header>

            <section className="Section">
                <div className="Section-Head">
                    <h2>Three ways to move forward</h2>
                    <p className="Text-Dim">Start wherever makes sense for you today.</p>
                </div>

                <div className="Card-Grid">
                    <div className="Feature-Card">
                        <span className="Feature-Mark">01</span>
                        <h3>Take the assessment</h3>
                        <p className="Text-Dim">Answer a few questions about your interests and strengths to get matched career paths.</p>
                    </div>
                    <div className="Feature-Card">
                        <span className="Feature-Mark">02</span>
                        <h3>Explore career paths</h3>
                        <p className="Text-Dim">Browse roles by industry, see day-to-day responsibilities, and required qualifications.</p>
                    </div>
                    <div className="Feature-Card">
                        <span className="Feature-Mark">03</span>
                        <h3>Build your plan</h3>
                        <p className="Text-Dim">Save the paths you're considering and track the skills or courses you still need.</p>
                    </div>
                </div>
            </section>

            <section className="Section Section-Alt">
                <div className="Section-Head">
                    <h2>Recommended for you</h2>
                    <p className="Text-Dim">Based on your saved interests</p>
                </div>

                <div className="Card-Grid">
                    <div className="Career-Card">
                        <h3>UX Designer</h3>
                        <p className="Text-Dim">Shape how people experience products, from research through interface design.</p>
                        <span className="Career-Tag">Design</span>
                    </div>
                    <div className="Career-Card">
                        <h3>Data Analyst</h3>
                        <p className="Text-Dim">Turn raw data into decisions that guide product and business strategy.</p>
                        <span className="Career-Tag">Data</span>
                    </div>
                    <div className="Career-Card">
                        <h3>Software Engineer</h3>
                        <p className="Text-Dim">Build and maintain the systems that power everyday digital products.</p>
                        <span className="Career-Tag">Engineering</span>
                    </div>
                </div>
            </section>

            <footer className="Footer">
                <span>Pathway Career Guidance</span>
                <span className="Text-Dim">Built to help you decide, not just browse.</span>
            </footer>


                            <script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"></script>
<script src="https://files.bpcontent.cloud/2026/07/06/06/20260706065408-41AFMGOP.js" defer></script>
        </div>
    )
}

export default HomePage