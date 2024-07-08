import { Link } from "react-router-dom";
import Button from "../components/ui/Button"
import styles from './Intro.module.css'
import ReportCode from "../components/ReportCode";
import { useState } from "react";

function Intro() {
    const [isReportCodeVisible, setIsReportCodeVisible] = useState(false);
    
    return <div className={styles.intro}>
        {isReportCodeVisible ? <>
            <Button style={{marginBottom: "8px"}} variant="fill" size="small" onClick={() => setIsReportCodeVisible(!isReportCodeVisible)}>Close</Button>
            <ReportCode /> 
        </> : <>
            <h1>Introduction</h1>
            <p>
                I went with the Trip Expense Calculator sample project because it seemed like it
                would have enough opportunities to show the various layers of a web app. Especially since
                the project mentioned a Web API and how it should be formed, and also the need for a front end.
            </p>
            <p>
                After I started in on it though I realized that without the ability to manage trips,
                their travelers, and expenses, the entire project could pretty much just be done with <span onClick={() => setIsReportCodeVisible(!isReportCodeVisible)}>a simple
                javascript function.</span>
            </p>

            <p>
                So that's how we ended up here. The actual app is still pretty simple, but it allows you to
                add trips, add travelers to those trips, and add expenses to those travelers.
                It then does the required logic <a href="../public/Sample Code Project - Trip Calculator.pdf" target="_blank">specified in the pdf. </a>
            </p>

            <p>
                p.s. Once you start you can't get back to this page unless you use the back button or navigate to the url directly.
            </p>

            <Link to="trips">
                <Button variant="fill" size="large">
                    Click here to start!
                </Button>
            </Link>
        </>}
    </div>
}

export default Intro
