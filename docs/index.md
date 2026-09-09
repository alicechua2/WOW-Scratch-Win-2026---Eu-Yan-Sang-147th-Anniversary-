---
layout: none
title: Eu Yan Sang 147th Anniversary · Scratch & Win
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Eu Yan Sang 147th Anniversary · Scratch &amp; Win</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ '/assets/css/scratch.css' | relative_url }}" />
</head>
<body>
  <div class="wrap">
    <header>
      <div class="brand">Eu Yan Sang Malaysia</div>
      <h1>147th Anniversary</h1>
      <p class="sub">Answer one question, scratch to reveal your e-store voucher.<br />Valid until 31 October 2026.</p>
    </header>

    <section id="step-form" class="card">
      <p class="sub" style="margin-top:0">Fill in your details first. We use this to record who redeemed which code.</p>
      <form id="detailsForm">
        <label for="fullName">Full name</label>
        <input id="fullName" type="text" autocomplete="name" required />
        <label for="email">Email</label>
        <input id="email" type="email" autocomplete="email" required />
        <label for="ic">IC number</label>
        <input id="ic" type="text" inputmode="numeric" placeholder="e.g. 900101-14-1234" required />
        <p class="hint">Malaysian MyKad: 12 digits, with or without dashes.</p>
        <p id="formError" class="error hidden"></p>
        <button class="btn-primary" type="submit">Continue</button>
      </form>
    </section>

    <section id="step-quiz" class="card hidden">
      <p class="q">Is this year Eu Yan Sang's 147th anniversary?</p>
      <div class="choices">
        <button type="button" class="choice" data-answer="yes">Yes</button>
        <button type="button" class="choice" data-answer="no">No</button>
      </div>
    </section>

    <section id="step-wrong" class="card hidden">
      <div class="badbox">
        <p class="q">That's not quite right.</p>
        <p class="sub">This year is Eu Yan Sang's 147th anniversary. You can try the question again.</p>
        <button type="button" class="btn-primary" id="retryQuiz">Try again</button>
      </div>
    </section>

    <section id="step-scratch" class="card hidden">
      <p class="q">Scratch to reveal your voucher</p>
      <p class="sub" style="text-align:center">Use your finger or mouse. Keep scratching until the code appears.</p>
      <div class="scratch-wrap" id="scratchWrap">
        <div class="prize">
          <p style="margin:0; letter-spacing:0.2em; font-size:11px; font-weight:700; color:var(--maroon)">YOU WON</p>
          <p class="amt" id="prizeAmt">RM 0</p>
          <div class="code" id="prizeCode">CODE</div>
        </div>
        <canvas id="scratchCanvas"></canvas>
      </div>
      <p class="meta">Voucher can be used on the <a href="https://www.euyansang.com.my/en_MY/home" target="_blank" rel="noopener">Eu Yan Sang e-store</a>. Valid till 31/10/2026.</p>
    </section>

    <section id="step-done" class="card hidden">
      <p class="ok">Your voucher is ready.</p>
      <p class="amt" id="doneAmt" style="text-align:center; font-family:'Cormorant Garamond',Georgia,serif; font-size:40px; margin:8px 0">RM 0</p>
      <div class="code" id="doneCode" style="text-align:center">CODE</div>
      <p class="meta">
        Use this code at checkout on<br />
        <a href="https://www.euyansang.com.my/en_MY/home" target="_blank" rel="noopener">https://www.euyansang.com.my/en_MY/home</a><br />
        Valid till <strong>31/10/2026</strong>.
      </p>
      <a class="btn btn-primary" href="https://www.euyansang.com.my/en_MY/home" target="_blank" rel="noopener">Shop on e-store</a>
      <p class="hint" style="text-align:center">Save this code. Dummy codes are in use until the real series is added.</p>
    </section>

    <section id="step-admin" class="card hidden">
      <p class="q">Redemption report</p>
      <p class="sub">Everyone who completed a scratch on <em>this browser / this file</em> is listed here. Export CSV to keep a copy.</p>
      <div id="adminLock">
        <label for="pin">Staff PIN</label>
        <input id="pin" type="password" />
        <p class="hint">Default PIN: <code>eys147</code> (change it in the code).</p>
        <p id="pinError" class="error hidden">Wrong PIN.</p>
        <button type="button" class="btn-primary" id="unlockAdmin">View report</button>
      </div>
      <div id="adminData" class="hidden">
        <div class="stats" id="adminStats"></div>
        <div class="admin-bar">
          <button type="button" class="btn btn-gold" id="exportCsv">Download CSV</button>
          <button type="button" class="btn btn-ghost" id="exportJson">Download JSON</button>
          <button type="button" class="btn btn-ghost" id="printReport">Print</button>
        </div>
        <div style="overflow-x:auto">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>When</th>
                <th>Name</th>
                <th>Email</th>
                <th>IC</th>
                <th>Amount</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody id="reportBody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <footer>
      Dummy voucher codes for now. Replace the list in this file when you have the real series.
      <br /><button type="button" class="staff" id="openAdmin">Staff: view who redeemed</button>
    </footer>
  </div>

  <script src="{{ '/assets/js/scratch.js' | relative_url }}"></script>
</body>
</html>
