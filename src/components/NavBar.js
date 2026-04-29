export default function NavBar () {
    return (
        <>
            <div className="top-bar">
                <div style={{ display:"flex", alignItems: "center", gap:"14px" }}>
                    <button className="hamburger-btn" id="hamburger">☰</button>
                    <h1></h1>
                </div>
                <div style={{ fontSize: "11px", color:"var(--text-muted)", fontFamily:"var(--font-head)" }}>
                    <span className="dot-indicator"></span>Connected
                </div>
            </div>
        </>
    )
}