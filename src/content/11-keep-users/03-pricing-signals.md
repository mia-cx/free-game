---
title: Read your pricing from your numbers
summary: Spot underpricing from your close rate, margin per client and hours over contract.
---

> [!TLDR]
> - If you close more than about 40% of sales calls, you're probably too cheap.
> - Count margin per client, with your own hours at what it would cost to replace you.
> - Compare hours delivered with hours contracted, then reprice, rescope or drop the worst clients.

## A high close rate is a price signal

Closing most of your sales calls feels like success. Past a point, **it means your price is too low**. @huntkyle's rule of thumb: above about 40%, you're probably losing 20% margin on every sale.

That number is his, unverified, and he sells consulting to agencies. But the check is free: keep a sheet with calls, closes and close rate, and flag it when the rate stays above 40%.

## Count margin per client, not revenue

A billing report shows revenue. It hides which clients cost you money. In Hunt's audits, 10% to 20% of an agency's clients sit at close to or below zero gross margin once the owner's hours are counted.

Three numbers fix that view: gross margin per client, with your hours priced at what it would cost to replace you; churn graded against a benchmark; and a 13-week forecast instead of a flat line.

> [!TRICK] Month-end bot prompt
> Give it exported files, not logins (see *Keep bots from doing damage*).
>
> ```
> Role: you are my Month-End bot.
> Read first: [revenue export from your billing tool], [costs sheet], [Sheets list of clients or members], [hours per client].
> When you run: the 1st of every month at 8am.
> Done looks like: one sheet tab with revenue, profit margin, new and churned [clients / members], each number set beside last month's. Flag any number that moved more than [15]%.
> Then add:
> - Gross margin per client, counting my hours at [what it would cost to replace me]. Flag anyone under 50%. My target is 60%.
> - Monthly churn, graded: 15% bleeding out, 10% treading water, 5% solid, 2.5% best in class.
> - The next 13 weeks: recurring revenue, minus churn at [X]%, plus signed deals. Never just repeat this month's revenue as a flat line.
> Ask me first before you: send an invoice, chase a payment, or move money.
> ```
>
> The churn grades and the 50% / 60% margin lines are Hunt's benchmarks.

## Find the clients you're subsidising

Scope creep is a pricing problem you can't see without a time log. Across three agencies, Hunt found $18K to $20K of work being delivered on $8K to $10K retainers (his anecdote).

> [!TRICK] Run a 90-day scope check
> ```
> Read [time tracking export] and [client contracts] for the last 90 days.
> For each client: hours delivered, hours in the contract, what those hours cost at [rate], and gross margin.
> Sort worst first, then mark each one reprice, rescope or sunset, with one line on why.
> Ask me first before you contact anyone.
> ```

The bot sorts and suggests. Talking to the client stays your job.

> [!DO] Work out your close rate
> Make a sheet with three columns: date, call, closed (yes or no). Fill in your last 10 sales calls and calculate the close rate. If it's above 40%, write a higher price for your next proposal.

> [!CHECK] What close rate on sales calls suggests your price is too low?
> Above about 40%.

> [!CHECK] A client's 90-day time log shows far more hours than their contract covers. What are your options?
> Reprice, rescope or sunset that client. A bot can sort and suggest, but talking to the client stays your job.

> [!CHECK] Why count gross margin per client, with your own hours priced at what it would cost to replace you?
> Revenue reports hide which clients cost you money. Counting your hours reveals the ones near or below zero margin.

## Sources

- [@huntkyle: running business operations with bots, including close rate, month-end and scope checks](https://x.com/huntkyle/status/2118086670918750341)
