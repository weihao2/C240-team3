import { useEffect } from "react"
import "./Login.css"

function LoginPage({ ToHome, ToSignup }) {

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

    async function Login(e) {
        e.preventDefault()

        const UsernameText = document.getElementById("Username")?.value
        const PasswordText = document.getElementById("Password")?.value

        if (UsernameText.length == 0 || PasswordText.length == 0) {
            alert("username or password cannot be empty")
            return
        }

        const response = await fetch("/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: UsernameText, password: PasswordText })
        })

        const data = await response.json()

        alert(data.message)

        if (data.message == "success") {
            localStorage.setItem("Token", data.token)
            ToHome()
        }
    }

    useEffect(() => {
        if (location.port != 3000) return
        VerifyToken()
    }, [])

    return (
        <div className="Login-Page">

            <div className="Path-Panel">
                <div className="Path-Content">
                    <span className="Path-Kicker">PolyPath</span>
                    <h2 className="Path-Headline">Every path starts<br />with a step forward.</h2>
                    <p>We make your path visible!</p>
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
                        <h1>Welcome back</h1>
                        <p className="Login-Subtitle">Sign in to your career plan</p>
                    </div>

                    <form className="Login-Form" onSubmit={Login}>
                        <label className="Field-Label" htmlFor="Username">Username</label>
                        <input className="textarea" id="Username" type="text" placeholder="your username" autoComplete="username" />

                        <label className="Field-Label" htmlFor="Password">Password</label>
                        <input className="textarea" id="Password" type="password" placeholder="your password" autoComplete="current-password" />

                        <label className="Remember-Row">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <button type="submit" className="Login-Button">Sign in</button>
                    </form>

                    <p className="Signup-Line">
                        New here? <a onClick={ToSignup} className="signup-link">Create an account</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage