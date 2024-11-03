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
	// TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
// import { formatDistanceToNow } from "date-fns";
import { ButtonConnectChecker } from "../checkers/btn-connect";
import { PayLockProtocol } from "@/config";
import { PAYLOCK_ABI } from "@/config/abi";
import { Address, formatEther, parseEther } from "viem";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceIDMain() {
	const params = useParams();
	console.log({ params });
	const { address } = useAccount();
	console.log({ address });
	const [showPaymentDialog, setShowPaymentDialog] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const { data: serviceData, isLoading: isServiceLoading } = useReadContract({
		address: PayLockProtocol,
		abi: PAYLOCK_ABI,
		functionName: "services",
		args: [BigInt(params.service as string)],
	});

	const { data: pyusdRate, isLoading: isRateLoading } = useReadContract({
		address: PayLockProtocol,
		abi: PAYLOCK_ABI,
		functionName: "currentPYUSDRate",
	});

	const service = serviceData
		? {
				id: params.serviceId,
				name: serviceData[1] as string,
				description: serviceData[2] as string,
				priceUSD: serviceData[3] as bigint,
				isEscrow: serviceData[4] as boolean,
				isActive: serviceData[5] as boolean,
				vendor: serviceData[0] as Address,
		  }
		: null;

	console.log({ service });
	
	const handlePayment = async () => {
		setIsProcessing(true);
		// Implement payment logic here
		setTimeout(() => {
			setIsProcessing(false);
			setShowPaymentDialog(false);
		}, 2000);
	};

	if (isServiceLoading || isRateLoading) {
		return (
			<div className="container py-8">
				<Skeleton className="w-full h-[600px]" />
			</div>
		);
	}

	if (!service) {
		return <div className="container py-8">Service not found</div>;
	}

	const pyusdAmount = pyusdRate
		? (parseEther(formatEther(service.priceUSD)) * BigInt(1e18)) / pyusdRate
		: 0n;

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
										{service.name}
									</CardTitle>
									<CardDescription>Offered by {service.vendor}</CardDescription>
								</div>
								<Badge variant={service.isEscrow ? "default" : "secondary"}>
									{service.isEscrow ? "Escrow Protected" : "Direct Payment"}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-6">
								{service.description}
							</p>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-primary" />
									{/* <span>{transactions.length} purchases</span> */}
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-primary" />
									<span>Varies</span>
								</div>
								<div className="flex items-center gap-2">
									<DollarSign className="h-4 w-4 text-primary" />
									<span>${formatEther(service.priceUSD)} USD</span>
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
									{/* {transactions.map((tx) => (
										<TableRow key={tx.id.toString()}>
											<TableCell>{tx.client}</TableCell>
											<TableCell>${formatEther(tx.amount)}</TableCell>
											<TableCell>
												<Badge
													variant={
														tx.status === "COMPLETED" ? "default" : "secondary"
													}>
													{tx.status}
												</Badge>
											</TableCell>
											<TableCell>
												{formatDistanceToNow(tx.timestamp, { addSuffix: true })}
											</TableCell>
										</TableRow>
									))} */}
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
										${formatEther(service.priceUSD)}
									</span>
								</div>
								<div className="flex justify-between items-center text-sm text-muted-foreground">
									<span>PYUSD Rate</span>
									<span>1 PYUSD = ${formatEther(pyusdRate ?? 0n)}</span>
								</div>
								<div className="flex justify-between items-center font-medium">
									<span>Required PYUSD</span>
									<span>{formatEther(pyusdAmount)} PYUSD</span>
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
								{/* <span className="font-bold">
									$
									{formatEther(
										transactions.reduce((sum, tx) => sum + tx.amount, 0n),
									)}
								</span> */}
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">
									Avg. Completion Time
								</span>
								<span className="font-bold">Varies</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Success Rate</span>
								{/* <span className="font-bold">
									{(
										(transactions.filter((tx) => tx.status === "COMPLETED")
											.length /
											transactions.length) *
										100
									).toFixed(2)}
									%
								</span> */}
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
							You are about to purchase {service.name} for $
							{formatEther(service.priceUSD)}
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
								<span>${formatEther(service.priceUSD)}</span>
							</div>
							<div className="flex justify-between">
								<span>Amount in PYUSD</span>
								<span>{formatEther(pyusdAmount)} PYUSD</span>
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
