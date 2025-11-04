import React, { useState } from "react";

export default function NIETBuddyFrontend() {
  const [openChat, setOpenChat] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([
    { from: "bot", text: "👋 Hello! I am NIET Buddy — ask me about admissions, fees, placements, or contact details." },
  ]);

  // ✅ Send message to Flask backend
  async function send() {
    if (!msg.trim()) return;
    const userMsg = msg;
    setHistory((h) => [...h, { from: "user", text: userMsg }]);
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setHistory((h) => [...h, { from: "bot", text: "⚠️ Error: " + data.error }]);
      } else if (data.results) {
        const reply = data.results
          .map(
            (r, i) =>
              `#${i + 1} ${r.full_name || r.name || "N/A"} — ${r.company || "Company N/A"} (${r.branch?.toUpperCase() || "Branch N/A"})`
          )
          .join("\n");
        setHistory((h) => [
          ...h,
          { from: "bot", text: `📊 Found ${data.count} record(s):\n${reply}` },
        ]);
      } else if (data.message) {
        setHistory((h) => [...h, { from: "bot", text: data.message }]);
      } else {
        setHistory((h) => [...h, { from: "bot", text: "🤖 No response from server." }]);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setHistory((h) => [...h, { from: "bot", text: "⚠️ Unable to connect to backend!" }]);
    }
  }

  return (
    <>
      <div className="nb-root">
        <style>{`
          :root{
            --primary:#0b3d91;
            --accent:#8b0000;
            --muted:#f5f7fb;
            --card:#ffffff;
            --glass: rgba(255,255,255,0.6);
            font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          }
          *{box-sizing:border-box}
          // .nb-root{background:linear-gradient(180deg,var(--muted),#ffffff);min-height:100vh;color:#222}
          .chat-toggle{position:fixed;right:20px;bottom:20px;z-index:60}
          .chat-window{position:fixed;right:20px;bottom:84px;width:360px;background:var(--card);border-radius:12px;box-shadow:0 20px 50px rgba(11,61,145,0.12);overflow:hidden;display:flex;flex-direction:column}
          .chat-header{background:linear-gradient(90deg,var(--primary),#274fa8);color:white;padding:12px 14px;display:flex;align-items:center;gap:12px}
          .chat-body{padding:12px;height:280px;overflow:auto;display:flex;flex-direction:column;gap:8px;background:linear-gradient(180deg,rgba(11,61,145,0.02),transparent)}
          .bubble{max-width:78%;padding:8px 12px;border-radius:12px;font-size:14px;white-space:pre-line}
          .bubble.user{align-self:flex-end;background:var(--primary);color:white;border-bottom-right-radius:4px}
          .bubble.bot{align-self:flex-start;background:#f1f5ff;color:#0b3d91}
          .chat-composer{display:flex;gap:8px;padding:10px;border-top:1px solid #eee}
          .chat-composer input{flex:1;padding:10px;border-radius:8px;border:1px solid #ddd}
        `}</style>

        <div className="chat-toggle">
          <button className="btn btn-primary" onClick={() => setOpenChat((s) => !s)}>
            {openChat ? "Close Chat" : "Open Chat"}
          </button>
        </div>

        {openChat && (
          <div className="chat-window" role="dialog" aria-label="NIET Buddy Chat">
            <div className="chat-header">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "white",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                N
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>NIET Buddy</div>
                <div style={{ fontSize: 12 }}>Placement & Admission Help</div>
              </div>
            </div>

            <div className="chat-body">
              {history.map((m, i) => (
                <div key={i} className={`bubble ${m.from}`}>
                  {m.text}
                </div>
              ))}
              {loading && <div className="bubble bot">⏳ Fetching details...</div>}
            </div>

            <div className="chat-composer">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your question..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
              />
              <button className="btn btn-primary" onClick={send} disabled={loading}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
