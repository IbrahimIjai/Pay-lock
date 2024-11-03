"use client";

import { useState, useEffect } from "react";
// import { useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PAYLOCK_ABI } from "@/config/abi";
import { PayLockProtocol } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { usePayLockWriteContract } from "@/hooks/wagmi/usePayLockWriteContract";

interface PaymentDialogProps {
	isOpen: boolean;
	onClose: () => void;
	serviceId: bigint;
	serviceName: string;
	priceUSD: bigint;
	pyusdRate: bigint;
}

export function PaymentDialog({
	isOpen,
	onClose,
	serviceId,
	serviceName,
	priceUSD,
	pyusdRate,
}: PaymentDialogProps) {
	const { toast } = useToast();
	const [pyusdAmount, setPyusdAmount] = useState<string>("");

	useEffect(() => {
		if (priceUSD && pyusdRate) {
			const amount =
				(parseEther(formatEther(priceUSD)) * BigInt(1e18)) / pyusdRate;
			setPyusdAmount(formatEther(amount));
		}
	}, [priceUSD, pyusdRate]);

	const {
		write: processPayment,
		isPending,
		isConfirming,
		isConfirmed,
		isWriteContractError,
		reset,
	} = usePayLockWriteContract({
		fn: "processPayment",
		trxTitle: "Processing payment",
		args: [serviceId, parseEther(pyusdAmount), pyusdRate, "0x"], // '0x' is a placeholder for encryptedAccessId
		abi: PAYLOCK_ABI,
		contractAddress: PayLockProtocol,
	});

	const handlePayment = () => {
		processPayment();
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	useEffect(() => {
		if (isConfirmed) {
			toast({
				title: "Payment Successful",
				description: `You have successfully purchased ${serviceName}`,
				duration: 5000,
			});
			setTimeout(handleClose, 2000);
		}
	}, [isConfirmed, serviceName, toast]);

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Confirm Payment</DialogTitle>
					<DialogDescription>
						You are about to purchase {serviceName} for ${formatEther(priceUSD)}{" "}
						USD
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Alert>
						<AlertTriangle className="h-4 w-4" />
						<AlertDescription>
							This payment will be processed in PYUSD. Make sure you have
							sufficient balance.
						</AlertDescription>
					</Alert>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="usd-amount" className="text-right">
							USD Amount
						</Label>
						<Input
							id="usd-amount"
							value={formatEther(priceUSD)}
							className="col-span-3"
							disabled
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="pyusd-amount" className="text-right">
							PYUSD Amount
						</Label>
						<Input
							id="pyusd-amount"
							value={pyusdAmount}
							className="col-span-3"
							disabled
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="pyusd-rate" className="text-right">
							PYUSD Rate
						</Label>
						<Input
							id="pyusd-rate"
							value={`1 PYUSD = $${formatEther(pyusdRate)} USD`}
							className="col-span-3"
							disabled
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handlePayment} disabled={isPending || isConfirming}>
						{isPending || isConfirming ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Processing...
							</>
						) : isConfirmed ? (
							<>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Confirmed
							</>
						) : (
							"Confirm Payment"
						)}
					</Button>
				</DialogFooter>
				{isWriteContractError && (
					<Alert variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertDescription>
							Error processing payment. Please try again.
						</AlertDescription>
					</Alert>
				)}
			</DialogContent>
		</Dialog>
	);
}
