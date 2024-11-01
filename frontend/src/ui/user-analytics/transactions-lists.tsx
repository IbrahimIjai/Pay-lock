"use client";

import { useState } from "react";
// import { useAccount } from "wagmi";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { DollarSign, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { PageConnectChecker } from "../checkers/page-connect";

// Mock data - replace with actual data fetching
const mockTransactions = [
	{
		id: 1,
		type: "Payment",
		service: "Web Development",
		amount: 1500,
		status: "Completed",
		date: new Date("2023-11-01"),
	},
	{
		id: 2,
		type: "Refund",
		service: "Logo Design",
		amount: 300,
		status: "Processed",
		date: new Date("2023-11-03"),
	},
	{
		id: 3,
		type: "Payment",
		service: "SEO Consultation",
		amount: 500,
		status: "Pending",
		date: new Date("2023-11-05"),
	},
	{
		id: 4,
		type: "Payment",
		service: "Mobile App Development",
		amount: 3000,
		status: "Completed",
		date: new Date("2023-11-07"),
	},
	{
		id: 5,
		type: "Payment",
		service: "Content Writing",
		amount: 200,
		status: "Completed",
		date: new Date("2023-11-10"),
	},
];

const itemsPerPage = 10;

export default function TransactionsPageMain() {
	// const { address } = useAccount();
	const [currentPage, setCurrentPage] = useState(1);
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState("");

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const filteredAndSortedTransactions = mockTransactions
		.filter(
			(transaction) =>
				(filterStatus === "all" ||
					transaction.status.toLowerCase() === filterStatus) &&
				(transaction.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
					transaction.type.toLowerCase().includes(searchTerm.toLowerCase())),
		)
		.sort((a, b) => {
			if (!sortColumn) return 0;
			if (a[sortColumn] < b[sortColumn])
				return sortDirection === "asc" ? -1 : 1;
			if (a[sortColumn] > b[sortColumn])
				return sortDirection === "asc" ? 1 : -1;
			return 0;
		});

	const totalPages = Math.ceil(
		filteredAndSortedTransactions.length / itemsPerPage,
	);
	const paginatedTransactions = filteredAndSortedTransactions.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const totalAmount = mockTransactions.reduce(
		(sum, transaction) => sum + transaction.amount,
		0,
	);
	const completedTransactions = mockTransactions.filter(
		(t) => t.status === "Completed",
	).length;

	return (
		<PageConnectChecker>
			<div className="container py-8">
				<div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Spent</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								${totalAmount.toFixed(2)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Completed Transactions
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{completedTransactions}</div>
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Transaction History</CardTitle>
						<CardDescription>
							A list of your recent transactions
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between items-center mb-4">
							<div className="flex items-center space-x-2">
								<Input
									placeholder="Search transactions..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-[300px]"
								/>
								<Select value={filterStatus} onValueChange={setFilterStatus}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Filter by status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Statuses</SelectItem>
										<SelectItem value="completed">Completed</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="processed">Processed</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">
										<Button variant="ghost" onClick={() => handleSort("id")}>
											ID <ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button variant="ghost" onClick={() => handleSort("type")}>
											Type <ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											onClick={() => handleSort("service")}>
											Service <ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											onClick={() => handleSort("amount")}>
											Amount <ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											onClick={() => handleSort("status")}>
											Status <ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button variant="ghost" onClick={() => handleSort("date")}>
											Date <ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedTransactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell className="font-medium">
											{transaction.id}
										</TableCell>
										<TableCell>{transaction.type}</TableCell>
										<TableCell>{transaction.service}</TableCell>
										<TableCell>${transaction.amount.toFixed(2)}</TableCell>
										<TableCell>
											<Badge
												variant={
													transaction.status === "Completed"
														? "default"
														: "secondary"
												}>
												{transaction.status}
											</Badge>
										</TableCell>
										<TableCell>
											{format(transaction.date, "MMM dd, yyyy")}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<div className="flex items-center justify-end space-x-2 py-4">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</PageConnectChecker>
	);
}
