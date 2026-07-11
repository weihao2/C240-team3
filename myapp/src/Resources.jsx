import "./Resources.css"

import PolyPathLogo from "./assets/PolyPath.png"



function ResourcesPage({ToHome}) {

    const TechStack = [
        {name : "React", role : "Frontend framework", detail : "Powers the Login, Signup, Home, and Explore pages."},
        {name : "Node.js & Express", role : "Backend server", detail : "Handles authentication routes like /Login, /GetToken, and /CreateAccount."},
        {name : "MySQL", role : "Database", detail : "Stores user accounts and account credentials."},
        {name : "JWT (jsonwebtoken)", role : "Authentication", detail : "Issues and verifies the token stored in localStorage after login."},
        {name : "bcrypt", role : "Password hashing", detail : "Hashes passwords before they're stored in the database."},
        {name : "validator.js", role : "Input validation", detail : "Checks that the email entered on Signup is a valid format."}
    ]

    const DesignCredits = [
        {name : "Space Grotesk", role : "Display typeface", detail : "Used for headlines across every page."},
        {name : "Inter", role : "Body typeface", detail : "Used for body text, labels, and form inputs."},
        {name : "Google Fonts", role : "Font hosting", detail : "Serves both typefaces via a CSS import."}
    ]

    const InfoLinks = [
        {url : "https://www.youtube.com/"}
    ]




    const LoadLinks = InfoLinks.map((link)=> {
        return (
                    <a href={link.url}>{link.url}</a>
        )
    })

    return (
        <div className="Resources-Page">

            <nav className="Nav-Bar">
                <img  className="Logo-Icon"  src={PolyPathLogo} ></img>

                <div className="Nav-Actions">
                    <a onClick={ToHome} className="Nav-Login">Back to home</a>
                </div>
            </nav>

            <header className="Resources-Header">
                <span className="Path-Kicker">Resources</span>
                <h1 className="Resources-Headline">What PolyPath is built with</h1>
                <p className="Resources-Sub">A list of the tools, libraries, and services this site runs on.</p>
            </header>

            <section className="Section">
                <div className="Section-Head">
                    <h2>Tech stack</h2>
                    <p className="Text-Dim">The frameworks and libraries behind the app.</p>
                </div>

                <div className="Resource-List">
                    {TechStack.map((Item) => (
                        <div className="Resource-Row" key={Item.name}>
                            <div className="Resource-Info">
                                <h3>{Item.name}</h3>
                                <p className="Text-Dim">{Item.detail}</p>
                            </div>
                            <span className="Resource-Tag">{Item.role}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="Section Section-Alt">
                <div className="Section-Head">
                    <h2>Design credits</h2>
                    <p className="Text-Dim">Fonts and design resources used across the site.</p>
                </div>

                <div className="Resource-List">
                    {DesignCredits.map((Item) => (
                        <div className="Resource-Row" key={Item.name}>
                            <div className="Resource-Info">
                                <h3>{Item.name}</h3>
                                <p className="Text-Dim">{Item.detail}</p>
                            </div>
                            <span className="Resource-Tag">{Item.role}</span>
                        </div>
                    ))}
                </div>
            </section>


             <section className="Section Section-Alt">
                <div className="Section-Head">
                    <h2>Information Sources</h2>
                </div>

                <div className="Resource-List">
                    {LoadLinks}
                </div>
            </section>

            <footer className="Footer">
                <span>Pathway Career Guidance</span>
                <span className="Text-Dim">Built to help you decide, not just browse.</span>
            </footer>

        </div>
    )
}


export default ResourcesPage