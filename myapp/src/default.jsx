import { useEffect } from "react"

import PolyPathLogo from "./assets/PolyPath.png"

import "./Default.css"

function DefaultPage({ToLogin,ToSignup,ToHome}) {

    async function VerifyToken() {
        const Token = localStorage.getItem("Token")
        if (!Token) return

        const response = await fetch("/GetToken", {
            headers: {
                "authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (data.status == "success") {
            console.log("TOKEN VALID!")
            ToHome()
        }
    }


    useEffect(()=> {
        if (location.port != 3000) {return}
        VerifyToken()
    },[])



    return (
        <div className="Default-Page">

            <nav className="Nav-Bar">
                <img  className="Logo-Icon"  src={PolyPathLogo} ></img>

                <div className="Nav-Actions">
                    <a onClick={ToLogin} className="Nav-Login">Log in</a>
                    <button className="Nav-Signup" onClick={ToSignup}>Get started</button>
                </div>
            </nav>

            <header className="Hero">
                <div className="Hero-Glow"></div>

                <div className="Hero-Text">
                    <span className="Path-Kicker">Career Guidance</span>
                    <h1 className="Hero-Headline">Find the work<br/>that fits who you are.</h1>
                    <p className="Hero-Sub">
                        Take a short assessment, see career paths matched to your strengths,
                        and get a plan for the next step.
                    </p>

                    <div className="Hero-Actions">
                        <button className="Hero-Primary" onClick={ToSignup}>Create an account</button>
                        <button onClick={ToLogin} className="Hero-Secondary">I already have an account</button>
                    </div>

                    <div className="Hero-Stats">
                        <div className="Stat">
                            <span className="Stat-Number">40+</span>
                            <span className="Stat-Label">career paths mapped</span>
                        </div>
                        <div className="Stat-Divider"></div>
                        <div className="Stat">
                            <span className="Stat-Number">5 min</span>
                            <span className="Stat-Label">to complete assessment</span>
                        </div>
                    </div>
                </div>

                <svg className="Path-Svg" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path
                        className="Path-Line"
                        d="M 20 260 C 100 260, 100 180, 160 180 S 240 100, 300 100 S 360 40, 380 30"
                        fill="none"
                    />
                    <circle className="Path-Point p1" cx="20" cy="260" r="5"/>
                    <circle className="Path-Point p2" cx="160" cy="180" r="5"/>
                    <circle className="Path-Point p3" cx="300" cy="100" r="5"/>
                    <circle className="Path-Point p4 final" cx="380" cy="30" r="7"/>
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

            <section className="Quote-Section">
                <p className="Quote-Text">"I didn't know what I wanted to do until I saw it mapped out in front of me."</p>
                <span className="Quote-Attribution">— a student, three weeks into their plan</span>
            </section>

            <section className="Cta-Section">
                <h2>Ready to find your path?</h2>
                <p className="Text-Dim-Light">It only takes a few minutes to get started.</p>
                <button className="Hero-Primary" onClick={ToSignup}>Create your account</button>
            </section>

            <footer className="Footer">
                <span>PolyPath Career Guidance</span>
                <span className="Text-Dim">Built to help you decide, not just browse.</span>
            </footer>

        </div>
    )
}


export default DefaultPage