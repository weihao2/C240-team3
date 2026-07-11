import { useState } from "react"
import "./Explore.css"


import PolyPathLogo from "./assets/PolyPath.png"

function ExplorePage({ToHome}) {

    const AllCareers = [
        {name : "UX Designer", category : "Design", blurb : "Shape how people experience products, from research through interface design."},
        {name : "Data Analyst", category : "Data", blurb : "Turn raw data into decisions that guide product and business strategy."},
        {name : "Software Engineer", category : "Engineering", blurb : "Build and maintain the systems that power everyday digital products."},
        {name : "Product Manager", category : "Business", blurb : "Decide what gets built and why, working across design, engineering, and users."},
        {name : "Machine Learning Engineer", category : "Data", blurb : "Design and train models that power recommendation, prediction, and automation."},
        {name : "Marketing Executive", category : "Business", blurb : "Plan campaigns that connect a product with the people who need it."},
        {name : "Graphic Designer", category : "Design", blurb : "Create visual work that communicates a brand's identity across every touchpoint."},
        {name : "Backend Developer", category : "Engineering", blurb : "Build the servers, databases, and APIs that applications run on."}
    ]

    const Categories = ["All","Design","Engineering","Data","Business"]

    const [ActiveCategory,SetActiveCategory] = useState("All")
    const [SearchText,SetSearchText] = useState("")

    function FilterCareers() {
        return AllCareers.filter((Career) => {

            const MatchesCategory = ActiveCategory == "All" || Career.category == ActiveCategory
            const MatchesSearch = Career.name.toLowerCase().includes(SearchText.toLowerCase())

            return MatchesCategory && MatchesSearch
        })
    }

    const FilteredCareers = FilterCareers()

    return (
        <div className="Explore-Page">

            <nav className="Nav-Bar">
                                <img  className="Logo-Icon"  src={PolyPathLogo} ></img>

                <div className="Nav-Actions">
                    <a onClick={ToHome} className="Nav-Login">Back to home</a>
                </div>
            </nav>

            <header className="Explore-Header">
                <span className="Path-Kicker">Explore</span>
                <h1 className="Explore-Headline">Browse career paths</h1>
                <p className="Explore-Sub">See what different roles actually involve before you commit to one.</p>

                <input
                    className="Search-Input"
                    type="text"
                    placeholder="Search a career, e.g. Designer"
                    value={SearchText}
                    onChange={(e) => SetSearchText(e.target.value)}
                />
            </header>

            <section className="Filter-Row">
                {Categories.map((Category) => (
                    <button
                        key={Category}
                        className={ActiveCategory == Category ? "Filter-Pill active" : "Filter-Pill"}
                        onClick={() => SetActiveCategory(Category)}
                    >
                        {Category}
                    </button>
                ))}
            </section>

            <section className="Explore-Grid">

                {FilteredCareers.length == 0 &&
                    <p className="Empty-State">No careers match "{SearchText}". Try another search.</p>
                }

                {FilteredCareers.map((Career) => (
                    <div className="Career-Card" key={Career.name}>
                        <span className="Career-Tag">{Career.category}</span>
                        <h3>{Career.name}</h3>
                        <p className="Text-Dim">{Career.blurb}</p>
                        <a className="Career-Link">View details →</a>
                    </div>
                ))}

            </section>

        </div>
    )
}


export default ExplorePage