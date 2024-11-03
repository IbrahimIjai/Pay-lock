"use client";

import { useMemo, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { CreateServiceModal } from "../transaction/create-service";
import { PAYLOCK_ABI } from "@/config/abi";
import { PayLockProtocol } from "@/config";
import { Address } from "viem";

export interface Service {
	id: bigint;
	name: string;
	description: string;
	priceUSD: bigint;
	isEscrow: boolean;
	isActive: boolean;
}

function ServiceTable() {
	const { address } = useAccount();
	const { toast } = useToast();
	const [copiedId, setCopiedId] = useState<number | null>(null);

	const { data: serviceIds } = useReadContract({
		address: PayLockProtocol,
		abi: PAYLOCK_ABI,
		functionName: "getVendorServices",
		args: [address!],
	});
	const { data: servicesData } = useReadContracts({
		contracts:
			serviceIds?.map((id) => ({
				address: PayLockProtocol as Address,
				abi: PAYLOCK_ABI,
				functionName: "services",
				args: [id],
			})) ?? [],
	});

	//Quick buid fix

	const services: Service[] = useMemo(() => {
		if (!servicesData) return [];
		return servicesData.map((data, index) => ({
			id: serviceIds![index],
			//@ts-expect-error: unknown types
			name: data.result?.[1] as string,
			//@ts-expect-error: unknown types
			description: data.result?.[2] as string,
			//@ts-expect-error: unknown types
			priceUSD: data.result?.[3] as bigint,
			//@ts-expect-error: unknown types
			isEscrow: data.result?.[4] as boolean,
			//@ts-expect-error: unknown types
			isActive: data.result?.[5] as boolean,
		}));
	}, [servicesData, serviceIds]);
	console.log({ serviceIds, servicesData, services });
	const copyPaymentLink = async (serviceId: number) => {
		const link = `${window.location.origin}/${address}/${serviceId}`;
		await navigator.clipboard.writeText(link);
		setCopiedId(serviceId);
		toast({
			title: "Link copied!",
			description: "Payment link has been copied to clipboard.",
		});
		setTimeout(() => setCopiedId(null), 2000);
	};
	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$2,300</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Services
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12</div>
						<p className="text-xs text-muted-foreground">+2 new this week</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Clients</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">28</div>
						<p className="text-xs text-muted-foreground">+4 this month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Payments
						</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$890</div>
						<p className="text-xs text-muted-foreground">3 payments pending</p>
					</CardContent>
				</Card>
			</div>

			<div className="w-full flex lg:items-end justify-end my-8">
				{/* <Button className="px-7">Create Service</Button> */}
				<CreateServiceModal />
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Price (USD)</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Payment Link</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{services.map((service) => (
						<TableRow key={service.id}>
							<TableCell>{service.name}</TableCell>
							<TableCell>${Number(service.priceUSD) / 1e18}</TableCell>
							<TableCell>
								<span
									className={`px-2 py-1 rounded-full text-xs ${
										service.isActive
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}>
									{service.isActive ? "Active" : "Inactive"}
								</span>
							</TableCell>
							<TableCell>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => copyPaymentLink(Number(service.id))}
									className="space-x-2">
									{copiedId === Number(service.id) ? (
										<Check className="h-4 w-4 text-green-500" />
									) : (
										<Copy className="h-4 w-4" />
									)}
									<span>Copy Link</span>
								</Button>
							</TableCell>
							<TableCell>
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										window.open(`/${address}/${service.id}`, "_blank")
									}>
									<ExternalLink className="h-4 w-4 mr-2" />
									View
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default ServiceTable;
