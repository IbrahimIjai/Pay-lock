"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { useAccount } from "wagmi";
import { formatDistanceToNow } from "date-fns";
import { ButtonConnectChecker } from "../checkers/btn-connect";

// Mock data - replace with actual data fetching
const mockService = {
	id: 1,
	name: "Advanced Web Development Course",
	description:
		"Complete web development course covering frontend and backend technologies",
	price: 299,
	vendor: "0x1234...5678",
	isEscrow: true,
	totalPurchases: 45,
	rating: 4.8,
	estimatedDelivery: "2-3 weeks",
};

const mockTransactions = [
	{
		id: 1,
		buyer: "0xabcd...efgh",
		amount: 299,
		status: "Completed",
		timestamp: new Date(Date.now() - 86400000),
	},
	{
		id: 2,
		buyer: "0xijkl...mnop",
		amount: 299,
		status: "Processing",
		timestamp: new Date(Date.now() - 172800000),
	},
];

export default function ServiceIDMain() {
	const params = useParams();
	console.log({ params });
	const { address } = useAccount();
	console.log({ address });
	const [showPaymentDialog, setShowPaymentDialog] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const handlePayment = async () => {
		setIsProcessing(true);
		// Implement payment logic here
		setTimeout(() => {
			setIsProcessing(false);
			setShowPaymentDialog(false);
		}, 2000);
	};

	return (
		<div className="container py-8">
			<div className="grid gap-6 lg:grid-cols-3">
				{/* Main Service Information */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-2xl mb-2">
										{mockService.name}
									</CardTitle>
									<CardDescription>
										Offered by {mockService.vendor}
									</CardDescription>
								</div>
								<Badge variant={mockService.isEscrow ? "default" : "secondary"}>
									{mockService.isEscrow ? "Escrow Protected" : "Direct Payment"}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-6">
								{mockService.description}
							</p>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-primary" />
									<span>{mockService.totalPurchases} purchases</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-primary" />
									<span>{mockService.estimatedDelivery}</span>
								</div>
								<div className="flex items-center gap-2">
									<DollarSign className="h-4 w-4 text-primary" />
									<span>${mockService.price} USD</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Recent Transactions */}
					<Card>
						<CardHeader>
							<CardTitle>Recent Transactions</CardTitle>
							<CardDescription>
								Latest purchases of this service
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Buyer</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Time</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{mockTransactions.map((tx) => (
										<TableRow key={tx.id}>
											<TableCell>{tx.buyer}</TableCell>
											<TableCell>${tx.amount}</TableCell>
											<TableCell>
												<Badge
													variant={
														tx.status === "Completed" ? "default" : "secondary"
													}>
													{tx.status}
												</Badge>
											</TableCell>
											<TableCell>
												{formatDistanceToNow(tx.timestamp, { addSuffix: true })}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* Payment Card */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Purchase Service</CardTitle>
							<CardDescription>Pay with PYUSD</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span>Price</span>
									<span className="text-xl font-bold">
										${mockService.price}
									</span>
								</div>
								<div className="flex justify-between items-center text-sm text-muted-foreground">
									<span>PYUSD Rate</span>
									<span>1 PYUSD = $0.93</span>
								</div>
								<div className="flex justify-between items-center font-medium">
									<span>Required PYUSD</span>
									<span>{(mockService.price / 0.93).toFixed(2)} PYUSD</span>
								</div>
								<ButtonConnectChecker>
									<Button
										className="w-full"
										size="lg"
										onClick={() => setShowPaymentDialog(true)}>
										Pay Now
									</Button>
								</ButtonConnectChecker>
							</div>
						</CardContent>
					</Card>

					{/* Service Stats */}
					<Card>
						<CardHeader>
							<CardTitle>Service Statistics</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Total Revenue</span>
								<span className="font-bold">
									${mockService.totalPurchases * mockService.price}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">
									Avg. Completion Time
								</span>
								<span className="font-bold">2.5 days</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Success Rate</span>
								<span className="font-bold">98%</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Payment Dialog */}
			<Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Payment</DialogTitle>
						<DialogDescription>
							You are about to purchase {mockService.name} for $
							{mockService.price}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<Alert>
							<AlertTriangle className="h-4 w-4" />
							<AlertDescription>
								This payment will be processed in PYUSD. Make sure you have
								sufficient balance.
							</AlertDescription>
						</Alert>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Amount in USD</span>
								<span>${mockService.price}</span>
							</div>
							<div className="flex justify-between">
								<span>Amount in PYUSD</span>
								<span>{(mockService.price / 0.93).toFixed(2)} PYUSD</span>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowPaymentDialog(false)}>
							Cancel
						</Button>
						<Button onClick={handlePayment} disabled={isProcessing}>
							{isProcessing ? "Processing..." : "Confirm Payment"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
