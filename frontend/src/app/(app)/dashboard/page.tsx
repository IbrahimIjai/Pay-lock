import { PageConnectChecker } from "@/ui/checkers/page-connect";
import Dashboard from "@/ui/dashboard/dashboard";
import React from "react";

function DashboardPage() {
	return (
		<div>
			<PageConnectChecker>
				<Dashboard />
			</PageConnectChecker>
		</div>
	);
}

export default DashboardPage;
