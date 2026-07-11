import "./Login.css"
import validator from "validator"

function SignUpPage({ ToLogin }) {

    async function CreateAccount(e) {
        e.preventDefault()

        const EmailText = document.getElementById("Email")?.value
        const UsernameText = document.getElementById("Username")?.value
        const PasswordText = document.getElementById("Password")?.value
        const ConfrimPasswordText = document.getElementById("ConfrimPassword")?.value

        const isvalid = validator.isEmail(EmailText)

        if (!isvalid) {
            alert("Email not found!")
            return
        }

        if (UsernameText.length == 0 || PasswordText.length == 0) {
            alert("username or password cannot be empty")
            return
        }

        if (PasswordText.length < 8) {
            alert("Password must have at least 8 characters and above")
            return
        }

        if (PasswordText != ConfrimPasswordText) {
            alert("Password and confrim password fields do not match!")
            return
        }

        const response = await fetch("/CreateAccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: EmailText, username: UsernameText, password: PasswordText })
        })

        const data = await response.json()

        alert(data.message)

        if (data.message == "success") {
            ToLogin()
        }
    }

    return (
        <div className="Login-Page">

            <div className="Path-Panel">
                <div className="Path-Content">
                    <span className="Path-Kicker">Career Guidance</span>
                    <h2 className="Path-Headline">Your next step<br />starts here.</h2>
                </div>

                <svg className="Path-Svg" viewBox="0 0 400 300" preserveAspectRatio="none">
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
            </div>

            <div className="Form-Panel">
                <div className="Login-Container">

                    <div className="Login-Header">
                        <h1>Create your account</h1>
                        <p className="Login-Subtitle">Start building your career plan</p>
                    </div>

                    <form className="Login-Form" onSubmit={CreateAccount}>
                        <label className="Field-Label" htmlFor="Email">Email</label>
                        <input className="textarea" id="Email" type="email" placeholder="you@example.com" autoComplete="email" />

                        <label className="Field-Label" htmlFor="Username">Username</label>
                        <input className="textarea" id="Username" type="text" placeholder="your username" autoComplete="username" />

                        <label className="Field-Label" htmlFor="Password">Password</label>
                        <input className="textarea" id="Password" type="password" placeholder="at least 8 characters" autoComplete="new-password" />

                        <label className="Field-Label" htmlFor="ConfrimPassword">Confirm password</label>
                        <input className="textarea" id="ConfrimPassword" type="password" placeholder="re-enter your password" autoComplete="new-password" />

                        <button type="submit" className="Login-Button">Create account</button>
                    </form>

                    <p className="Signup-Line">
                        Already have an account? <a onClick={ToLogin} className="signup-link">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage