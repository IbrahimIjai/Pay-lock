"use client";

import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePayLockWriteContract } from "@/hooks/wagmi/usePayLockWriteContract";
import { PAYLOCK_ABI } from "@/config/abi";
import { PayLockProtocol } from "@/config";
import { parseEther } from "ethers/lib/utils";

export function CreateServiceModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState({
		name: "",
		description: "",
		priceUSD: "",
		isEscrow: false,
	});
	const {
		write: createService,
		isPending,
		isConfirming,
		isConfirmed,
		isWriteContractError,
		reset: resetWagmi,
	} = usePayLockWriteContract({
		fn: "createService",
		trxTitle: "Creating new service",
		args: [
			// name,
			// description,
			// priceUSD ? parseEther(priceUSD) : 0n,
			// // BigInt(parseFloat(priceUSD ?? "0") * 1e18),
			// isEscrow,
			formState.name,
			formState.description,
			formState.priceUSD ? parseEther(formState.priceUSD) : 0n,
			formState.isEscrow,
		],
		abi: PAYLOCK_ABI,
		contractAddress: PayLockProtocol,
	});

	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	createService();
	// };

	// const handleClose = () => {
	// 	setIsOpen(false);
	// 	reset();
	// 	setName("");
	// 	setDescription("");
	// 	setPriceUSD("");
	// 	setIsEscrow(false);
	// };

	// Reset form state
	const resetForm = () => {
		setFormState({
			name: "",
			description: "",
			priceUSD: "",
			isEscrow: false,
		});
	};

	// Handle dialog open
	const handleOpenChange = (open: boolean) => {
		if (open) {
			// Reset everything when opening
			resetForm();
			resetWagmi();
		} else {
			// If there's a pending or confirming transaction, don't close
			if (isPending || isConfirming) return;

			// Otherwise, handle closing
			handleClose();
		}
		setIsOpen(open);
	};

	// Handle dialog close
	const handleClose = () => {
		resetForm();
		resetWagmi();
		setIsOpen(false);
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createService();
	};

	// Auto-close and reset on successful creation
	useEffect(() => {
		if (isConfirmed) {
			// Add a small delay before closing to show success message
			const timer = setTimeout(() => {
				handleClose();
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [isConfirmed, handleClose]);

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button className="px-7">Create Service</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Service</DialogTitle>
					<DialogDescription>
						Fill in the details to create a new service.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="name">Service Name</Label>
						<Input
							id="name"
							value={formState.name}
							onChange={(e) =>
								setFormState((prev) => ({
									...prev,
									name: e.target.value,
								}))
							}
							required
						/>
					</div>
					<div>
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							value={formState.description}
							onChange={(e) =>
								setFormState((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							required
						/>
					</div>
					<div>
						<Label htmlFor="price">Price (USD)</Label>
						<Input
							id="price"
							type="number"
							step="0.01"
							value={formState.priceUSD}
							onChange={(e) =>
								setFormState((prev) => ({
									...prev,
									priceUSD: e.target.value,
								}))
							}
							required
						/>
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id="escrow"
							checked={formState.isEscrow}
							onCheckedChange={(checked) =>
								setFormState((prev) => ({
									...prev,
									isEscrow: checked,
								}))
							}
						/>
						<Label htmlFor="escrow">Use Escrow</Label>
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={isPending || isConfirming}>
						{isPending
							? "Confirming..."
							: isConfirming
							? "Creating..."
							: "Create Service"}
					</Button>
				</form>
				{isConfirmed && (
					<p className="text-green-500 mt-2">Service created successfully!</p>
				)}
				{isWriteContractError && (
					<p className="text-red-500 mt-2">
						Error creating service. Please try again.
					</p>
				)}
			</DialogContent>
		</Dialog>
	);
}
