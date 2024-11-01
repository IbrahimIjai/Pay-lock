"use client";

import { useState } from "react";
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
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";

export interface Service {
	id: number;
	name: string;
	price: number;
	active: boolean;
}
function ServiceTable({ services }: { services: Service[] }) {
	const { address } = useAccount();
	const { toast } = useToast();
	const [copiedId, setCopiedId] = useState<number | null>(null);

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
				<Button className="px-7">Create Service</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Payment Link</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{services.map((service) => (
						<TableRow key={service.id}>
							<TableCell>{service.name}</TableCell>
							<TableCell>${service.price}</TableCell>
							<TableCell>
								<span
									className={`px-2 py-1 rounded-full text-xs ${
										service.active
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}>
									{service.active ? "Active" : "Inactive"}
								</span>
							</TableCell>
							<TableCell>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => copyPaymentLink(service.id)}
									className="space-x-2">
									{copiedId === service.id ? (
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
