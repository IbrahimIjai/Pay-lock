"use client";

import ServiceTable from "./service-table";
import TransactionsPageMain from "../user-analytics/transactions-lists";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Dashboard() {
	const [currTab, setCurrTab] = useState<"Dashboard" | "Your Transactions">(
		"Dashboard",
	);
	return (
		<div className="container py-10">
			<div className="mb-10">
				<Button
					variant="ghost"
					onClick={() => setCurrTab("Dashboard")}
					className={`${
						currTab === "Dashboard"
							? "text-foreground"
							: "text-muted-foreground"
					} text-2xl font-bold `}>
					Dashboard
				</Button>
				<span className="mx-3 font-bold text-3xl">|</span>
				<Button
					variant="ghost"
					onClick={() => setCurrTab("Your Transactions")}
					className={`${
						currTab === "Your Transactions"
							? "text-foreground"
							: "text-muted-foreground"
					} text-2xl font-bold `}>
					Your Transactions
				</Button>
			</div>

			{currTab === "Dashboard" ? <ServiceTable /> : <TransactionsPageMain />}
		</div>
	);
}

export default Dashboard;
